/**
 * @description Parse and organize each individual file information 
 * @param  {object} files res object 
 * @returns {Array} Rreturns array of objects with each file information 
 */

const parseFilesService = async (files) => {
  //Check if file is empty
  //Check if current line has any missing info (check for missing comma. 3 commas in total)
  console.log(files);

  return files;
}

module.exports = {
  parseFilesService,
}