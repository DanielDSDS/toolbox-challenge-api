const axios = require('axios');
const FilesServices = require('../services/files.services');

// TODO: Replace with .env variable
const bearerToken = 'Bearer aSuperSecretKey'

/**
 * @description Get list of files with formatted information 
 * @param {object} req Express req object 
 * @param  {object} req Express res object 
 * @returns {Array} Rreturns array of files  
 */

const getParsedFilesInformation = async (req, res) => {
  try {
    const parsedFilesInfo = [];

    // Get all list names from toolbox API 
    const fileNamesResponse = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
      headers: { 'Authorization': bearerToken }
    })

    const fileNames = fileNamesResponse.data.files;

    for (let i = 0; i < fileNames.length; i++) {
      try {
        const { data } = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${fileNames[i]}`, {
          headers: { 'Authorization': bearerToken }
        })
        // Apply business logic from inside this loop
        parsedFilesInfo.push(FilesServices.parseFileService(data));
      } catch (err) {
        // console.log(err.response.data)
      }
    }

    res.send(parsedFilesInfo);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getParsedFilesInformation,
}