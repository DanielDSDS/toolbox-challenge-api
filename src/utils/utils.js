/**
 * @description Check if line is empty
 * @param  {Array} line Line from a file
 * @returns {boolean} returns if the line is empty or not based on their properties
 */
const isLineEmpty = (line) => {
  return !line[1].length || !line[2].length || !line[3].length
}

/**
 * @description Format and organize each individual file information
 * @param  {string} file file information
 * @returns {Array} Rreturns array of objects with each file information
 */
const formatSingleFile = (file) => {
  // Get current file name
  const fileName = file.split(',')[0]

  // Separate each line from file
  const separatedLines = file.split('\n')
  const lines = []

  // Traverse each line from the array
  for (let i = 0; i < separatedLines.length; i++) {
    // If there is less than 2 commas stop parsing the file
    if ((separatedLines[i].split(',').length - 0) >= 3) {
      // Store content of the line if there were no errors
      if (!isLineEmpty(separatedLines[i].split(','))) {
        // Group each property from line into an array
        lines.push({
          text: separatedLines[i].split(',')[0],
          number: separatedLines[i].split(',')[1],
          hex: separatedLines[i].split(',')[2]
        })
      }
    }
  }

  return {
    file: fileName,
    lines
  }
}

module.exports = formatSingleFile
