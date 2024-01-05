# NodeJS Repository - ECES Website
<br />

## master branch is hosted on railway. Changes pushed to master branch will be reflected here directly.
```
https://eceswebsitenodejs-production.up.railway.app
```

<br />

## Get started

Run this command on your local machine

```bash
npm install
```

## Paste this into .env file 

```env
PORT = 5000
MONGO_DB = <Your_MongoDB_URI>
```

## Run this script to start the Server!

```bash
npm run start
```
---
## To use googleAPIs:

- Add creds.json in utils folder that was provided to you
- Login with the eces email id in your browser
- (Only Once!) Run `nodemon index.js` and wait for the authentication page to pop up.
    - If successful, the auth will redirect you to http://localhost:3000/oauth2callback (yes, it will be port 3000)
    - Once completed, a new file `token.json` will be added in he utils folder
- Done!
---
