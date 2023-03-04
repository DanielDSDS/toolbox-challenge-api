const axios = require('axios');
const FilesServices = require('../services/files.services');
// TODO: Replace with .env variable
const bearerToken = 'Bearer aSuperSecretKey'

/**
 * @description Get list of files with formatted information 
 * @param {object} req Express req object 
 * @param  {object} req Express res object 
 * @returns {Array} Rreturns array of files and their information
 */
const getParsedFilesInformation = async (req, res) => {
  try {
    const parsedFilesInfo = [];
    const fileNames = await getfileNames();

    for (let i = 0; i < fileNames.length; i++) {
      try {
        const singleFile = await getIndividualFile(fileNames[i]);

        if (singleFile.length && singleFile.replace('file,text,number,hex', '').length) {
          //Check if file was empty and remove first line
          //Parse file 
          parsedFilesInfo.push(FilesServices.parseFileService(singleFile.replace('file,text,number,hex\n', '')));
        }
      } catch (err) {
        console.error(`Error: Found error while trying to download ${fileNames[i]}: `, err.response.data)
      }
    }

    //Return only valid files to client
    res.send(parsedFilesInfo.filter((file) => file.lines.length));

  } catch (err) {
    res.status(500).send(err);
  }
}

/**
 * @description Get list of filenames from original API 
 * @param  {string} name Name for query param filters  
 * @returns {Array} Rreturns array of file names  
 */
const getfileNames = async (name = '') => {
  const { data } = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/files`, {
    headers: { 'Authorization': bearerToken }
  })

  return data.files;
}

/**
 * @description Get information from individual file 
 * @param  {string} name Name of the file to be returned  
 * @returns {string} Rreturns file information and lines  
 */
const getIndividualFile = async (name = '') => {
  const { data } = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${name}`, {
    headers: { 'Authorization': bearerToken }
  })

  return data;
}

module.exports = {
  getParsedFilesInformation,
}