const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// api tokens
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'utils/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'utils/credentials.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}


async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}


const getDrive = async () => {
    const authClient = await authorize()
    const drive = google.drive({version: 'v3', auth: authClient})
    return drive
}

const fetchFileIdList = async (folderId, pageToken, pageSize, folder=false) => {
    /*
        fetch function 
    */
    const drive = await getDrive()
    const response = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: 'nextPageToken, files(id, name, mimeType)',
        pageToken: pageToken || null,
        pageSize: pageSize || 100
        });
    
    const folders = await response.body.files.filter(file => file.mimeType === folder ? 'application/vnd.google-apps.folder' : null)
    return ({
        folders: folders,
        nextPageToken: response.body.nextPageToken
    })
}

const googleDriveController = {
    getAllECEFolders: async (req, res) => {
        /*
            req body type:
            {
                pageSize: int || null,
                pageToken: str (if next page exists) || null
            }
            res body type:
            {
               folders: [{
                id: str,
                name: str,
                mimeType: str
               }],
               nextPageToken: str
            }
        */
       try {
            const parsedReq = req.body
            const pageToken = parsedReq.pageToken
            const pageSize = parsedReq.pageSize
            res.json(await fetchFileIdList(process.env.ECE_FOLDER_ID, pageToken, pageSize, true))
       } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to retrieve folders' })
       }
    },
    getAllVLSIFolders: async (req, res) => {
        /*
            req body type:
            {
                pageSize: int || null,
                pageToken: str (if next page exists) || null,
                folderId: str (required),
            }
            res body type:
            {
               folders: [{
                id: str,
                name: str,
                mimeType: str
               }],
               nextPageToken: str
            }
        */
        try {
            const parsedReq = req.body
            const folderId = parsedReq.folderId
            const pageToken = parsedReq.pageToken
            const pageSize = parsedReq.pageSize
            
            const response = await fetchFileIdList(folderId, pageToken, pageSize, true)
            res.json(response)
            
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to retrieve folders' })
        }
    },
    getAllFilesFromFolderId: async (req, res) => {
        /*
            req body type:
            {
                pageSize: int || null,
                pageToken: str (if next page exists) || null,
                folderId: str (required),
            }
            res body type:
            {
               files: [{
                id: str,
                name: str,
                mimeType: str
               }],
               nextPageToken: str
            }
        */
        try {
            const parsedReq = req.body
            const folderId = parsedReq.folderId
            const pageToken = parsedReq.pageToken
            const pageSize = parsedReq.pageSize
            
            const response = await fetchFileIdList(folderId, pageToken, pageSize, false)
            response.files = response.folders
            delete response.folders
            res.json(response)
            
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to retrieve files' })
        }
    },
    getAllFoldersFromFolderId: async (req, res) => {
        /*
            req body type:
            {
                pageSize: int || null,
                pageToken: str (if next page exists) || null,
                folderId: str (required),
            }
            res body type:
            {
               files: [{
                id: str,
                name: str,
                mimeType: str
               }],
               nextPageToken: str
            }
        */
        try {
            const parsedReq = req.body
            const folderId = parsedReq.folderId
            const pageToken = parsedReq.pageToken
            const pageSize = parsedReq.pageSize
            
            const response = await fetchFileIdList(folderId, pageToken, pageSize, true)
            res.json(response)
            
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to retrieve folders' })
        }
    },
    showFileFromFileId: async (req, res) => {
        /*
            req body type:
            {
                fileId: str (required)
            }
            res body type:
            {
                webContentLink: str (url)
            }
        */
       try{
            const fileId = req.body.fileId 
            const drive = await getDrive()
            const response = await drive.files.get({
                fileId: fileId,
                alt: 'media'
            })
            res.json({
                webContentLink: response.body.webContentLink
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to retrieve folders' })
        }
    }
}

module.exports = googleDriveController