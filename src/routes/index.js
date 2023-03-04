const express = require('express')
const router = express.Router();
const FilesController = require('../controllers/files.controller');

router.get('/files/data', FilesController.getParsedFilesInformation);

router.get('/files/list', FilesController.getFileList);

module.exports = router
