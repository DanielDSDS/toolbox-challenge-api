/**
 * @description Check if line is empty 
 * @param  {Array} line Line from a file  
 * @returns {boolean} returns if the line is empty or not based on their properties   
 */
const isLineEmpty = (line) => {
  return !line[1].length || !line[2].length || !line[3].length
}

module.exports = isLineEmpty; 
