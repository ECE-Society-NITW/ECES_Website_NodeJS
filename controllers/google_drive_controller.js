const process = require('process')
const fs = require('fs').promises
const path = require('path')
const {google} = require('googleapis')
const authorize = require('../utils/authenticateGoogle')

///////////////////////////////////AUTHORIZATION/////////////////////////////////////////

async function getDrive() {
    try {
        const authClient = await authorize()
        return await google.drive({
            version:'v3',
            auth: authClient
        })
    } catch (error) {
        console.error('Error: ', error)
    }
}

///////////////////////////////////////////////////////////////////////////////////

const fetchFileIdList = async (folderId, pageToken, pageSize, folder=false) => {
    /*
        fetch function
    */
    const drive = await getDrive()
    const response = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: 'nextPageToken, files(id, name, mimeType)',
        pageToken: pageToken || null,
        pageSize: pageSize || 15
        });
    
    if (folder) {
        const folders = await response.data.files.filter(file => file.mimeType === 'application/vnd.google-apps.folder')
        return ({
            folders: folders,
            nextPageToken: response.data.nextPageToken || null
        })
    } else {
        return ({
            files: response.body.files,
            nextPageToken: response.body.nextPageToken
        })
    }
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
               nextPageToken: str || null
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
               nextPageToken: str || null
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
               nextPageToken: str || null
            }
        */
        try {
            const parsedReq = req.body
            const folderId = parsedReq.folderId
            const pageToken = parsedReq.pageToken
            const pageSize = parsedReq.pageSize
            
            const response = await fetchFileIdList(folderId, pageToken, pageSize, false)
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
               nextPageToken: str || null
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
                directly pipes the pdf as response!
            }
        */
       try{
            const fileId = req.body.fileId 
            const drive = await getDrive()
            const response = await drive.files.get({
                fileId: fileId,
                alt: 'media'
            }, { responseType: 'stream' })
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'inline; filename=response.pdf')
            
            response.data.pipe(res)
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to retrieve folders' })
        }
    }
}

module.exports = googleDriveController