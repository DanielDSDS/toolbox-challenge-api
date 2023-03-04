const FilesServices = require('../services/files.services')

/**
 * @description Get list of files exactly as given by the external API
 * @param {object} req Express req object
 * @param  {object} req Express res object
 * @returns {object} Rreturns object containing filenames
 */

const getFileList = async (req, res) => {
  try {
    const fileList = await FilesServices.getFileNames()
    res.send(fileList)
  } catch (err) {
    res.status(500).send('Error: Found error while trying to get list of files', err.response)
  }
}

/**
 * @description Get list of files with formatted information
 * @param {object} req Express req object
 * @param  {object} req Express res object
 * @returns {Array} Rreturns array of files and their information
 */
const getParsedFilesInformation = async (req, res) => {
  try {
    let requestedFile = ''
    if (Object.keys(req.query).length) {
      if (req.query.fileName) {
        requestedFile = req.query.fileName
      }
    }

    if (!requestedFile) {
      try {
        const parsedFilesInfo = await FilesServices.parseAllFilesService()
        res.send(parsedFilesInfo)
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const parsedFile = await FilesServices.parseFileService(requestedFile)
        if (parsedFile) {
          res.send(parsedFile)
        } else {
          res.status(204).send(`Error: File has no content "${requestedFile}"`)
        }
      } catch (err) {
        res.status(404).send(`Error: File not found or failed to download "${requestedFile}"`)
      }
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getParsedFilesInformation,
  getFileList
}
