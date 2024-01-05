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
// To get the pdf directly from the fileId
// To use the response from this endpoint follow the code: (REACT)
// const [url, setURL] = useState(null)
// try {
//     const response = await fetch(`/getPDFFromFileId`, {
//          method: 'POST',
//          ...
//     })
//     const blob = await response.blob()
//     const url = URL.createObjectURL(blob)
//     setURL(url)
// } catch (error) {
//     console.error('Error fetching PDF:', error)
// }
// return (
//     <div>
//         <iframe
//         title="PDF Viewer"
//         width="100%"
//         height="500px"
//         src={pdfSrc}
//         frameBorder="0"
//       />
//     </div>
// )
googleDriveRouter.post('/getPDFFromFileId', googleDriveController.showFileFromFileId)


module.exports = { googleDriveRouter }