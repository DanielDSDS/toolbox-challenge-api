const formatSingleFile = require('../utils/utils')
const axios = require('axios')
const bearerToken = 'Bearer aSuperSecretKey'

/**
 * @description Parse each file's information and group them together
 * @returns {string} Rreturns all files information and lines
 */
const parseAllFilesService = async () => {
  const parsedFilesInfo = []
  const { files } = await getFileNames()

  for (let i = 0; i < files.length; i++) {
    try {
      const singleFile = await parseFileService(files[i])
      if (singleFile) {
        parsedFilesInfo.push(singleFile)
      }
    } catch (err) {
      console.error(`Error: Found error while trying to download ${files[i]}`)
    }
  }

  return parsedFilesInfo.filter((file) => file.lines.length)
}

/**
 * @description Get information of individual file from external API and format their data
 * @param  {string} name Name of the file to be returned
 * @returns {string} Rreturns file information and lines
 */
const parseFileService = async (name) => {
  const { data } = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${name}`, {
    headers: { Authorization: bearerToken }
  })

  if (data.length && data.replace('file,text,number,hex', '').length) { return formatSingleFile(data.replace('file,text,number,hex\n', '')) }
  return false
}

/**
 * @description Get list of filenames from original API
 * @returns {Array} Rreturns array of file names
 */
const getFileNames = async () => {
  const { data } = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
    headers: { Authorization: bearerToken }
  })

  return data
}

module.exports = {
  parseAllFilesService,
  parseFileService,
  getFileNames
}
