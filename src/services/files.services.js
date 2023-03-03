const isLineEmpty = require('../utils/utils');

/**
 * @description Parse and organize each individual file information 
 * @param  {string} file file information 
 * @returns {Array} Rreturns array of objects with each file information 
 */
const parseFileService = (file) => {
  //Get current file name
  const fileName = file.split(',')[0];

  //Separate each line from file 
  const separatedLines = file.split('\n');
  const lines = [];

  //Traverse each line from the array
  for (let i = 0; i < separatedLines.length; i++) {
    //If there is less than 3 commas stop parsing the file 
    if ((separatedLines[i].split(',').length - 1) >= 3) {
      //Store content of the line if there were no errors 
      if (!isLineEmpty(separatedLines[i].split(','))) {
        //Group each property from line into an array
        lines.push({
          text: separatedLines[i].split(',')[1],
          number: separatedLines[i].split(',')[2],
          hex: separatedLines[i].split(',')[3],
        });
      }
    }
  }

  return {
    file: fileName,
    lines: lines
  };
}

module.exports = {
  parseFileService,
}