const fs = require('fs').promises
const path = require('path')
const process = require('process')
const {authenticate} = require('@google-cloud/local-auth')
const {google} = require('googleapis')

const SCOPES = process.env.SCOPES
const TOKEN_PATH = path.join(process.cwd(), 'utils/token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'utils/creds.json')

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}
async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: "https://www.googleapis.com/auth/drive.readonly",
    keyfilePath: CREDENTIALS_PATH
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  console.log('Server Connected to OAuth2Client Successfully!');
  return client;
}

module.exports = authorize