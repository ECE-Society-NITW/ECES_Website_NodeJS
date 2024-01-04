const googleDriveController = require('../controllers/google_drive_controller')
const googleDriveRouter = require('express').Router()
// For request and response body details, check the google_drive_controller.js
// !Important Files are only present in the Files Section, rest all Folders only contain Folders
// Structure for the Notes Directory:
// | Course | Semester | Subjects | Files  |
// |--ECE---+          |          |        |  
// |        |--1st Sem-+          |        |
// |        |          |--Physics-+        |
// |        |          |          |--Notes1|
// |        |          |          |--Papers|
//                   (...)
// |--VLSI--+          |          |        |
//                   (...)

// To get to the root of ECE course
googleDriveRouter.post('/getAllECEFolders', googleDriveController.getAllECEFolders)
// To get to the root of VLSI course
googleDriveRouter.post('/getAllVLSIFolders', googleDriveController.getAllVLSIFolders)
// To List all Files inside a Folder by FileId
googleDriveRouter.post('/getAllFilesFromFolderId', googleDriveController.getAllFilesFromFolderId)
// To List all Folders inside a Folder by FileId
googleDriveRouter.post('/getAllFoldersFromFolderId', googleDriveController.getAllFoldersFromFolderId)
// To get the webContentLink for the file
// To display the File in an iframe set: iframe.src = response.body.webContentLink
googleDriveRouter.post('/showFileFromFileId', googleDriveController.showFileFromFileId)

module.exports = { googleDriveRouter }