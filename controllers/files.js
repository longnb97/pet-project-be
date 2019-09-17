const path = require('path')
const fs = require('fs')
const File = require('../models/files')

const IMG_PATH = path.resolve(__dirname, '../uploads/files')

function createFile (req, res) {
  if (!req.file) {
    res.status(403).json({ message: 'khong nhan dc anh' })
  } else {
    const file = {
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype.split('/')[1],
      filename: req.file.filename,
      size: req.file.size,
      owner: req.user.id
    }
    const newFile = new File(file)
    newFile.save()
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  }
}

function createMultipleFiles (req, res) {
  if (!req.files) {
    res.status(403).json({ message: 'khong nhan dc anh' })
  } else {
    const photos = req.files.map(item => {
      const photo = {
        originalname: item.originalname,
        encoding: item.encoding,
        mimetype: item.mimetype.split('/')[1],
        filename: item.filename,
        size: item.size,
        owner: req.user.id
      }
      return photo
    })
    File.insertMany(photos)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  }
}

function getFileByName (req, res) {
  const name = req.query.img
  File.findOne({ filename: name })
    .then(file => {
      // logic ...
      if (file) {
        const imagePath = `${IMG_PATH}/${file.filename}`
        const isExisted = fs.existsSync(imagePath)
        if (isExisted) {
          return res.status(200).sendFile(imagePath) // success
        } else {
          return res.status(204).send('file not exist') // file not found in DB
        }
      } else {
        return res.status(204).send('file not exist') // file not found in server
      }
    })
    .catch(err => {
      res.status(500).send({ err })
    }) // error
}

function getUserAllFiles (req, res) {
  const id = req.user.id
  File.find({ owner: id })
    .populate('owner', ['email'], 'User')
    .then(data => {
      if (data) res.status(200).send(data)
      else res.status(404).send('not found')
    })
    .catch(error => res.status(500).send(error))
}

module.exports = {
  createFile,
  createMultipleFiles,
  getFileByName,
  getUserAllFiles
}
