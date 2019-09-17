const express = require('express')
const multer = require('multer')

const FilesController = require('../controllers/files')

const router = express.Router()

// multer configs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/files')
  },
  filename: function (req, file, cb) {
    // console.log(file);
    // cb(null, file.fieldname + '-' + 'aaa' + '-' + Date.now() + '.png')
    cb(null, (Math.random().toString(36) + '00000000000000000').slice(2, 10) + Date.now() + '_' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 600000
  }
})

// Routing
router.get('/profile', FilesController.getFileByName)
router.get('/all', FilesController.getUserAllFiles)
router.post('/profile', upload.single('photo'), FilesController.createFile)
router.post('/photos', uploadMultipleFiles, FilesController.createMultipleFiles)

// middlewares
function uploadMultipleFiles (req, res, next) {
  upload.array('photos', 6)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(err)
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(err)
    }
    // Everything went fine.
    return next()
  })
}

router.use((err, req, res, next) => {
  if (err) return res.status(400).json(err)
  else return next()
})

module.exports = router
