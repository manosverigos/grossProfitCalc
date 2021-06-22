const excelToJson = require('convert-excel-to-json')

exports.prepareExcel = (path) => {
  const excelFile = excelToJson({sourceFile: path})
  const sheet = Object.keys(excelFile)[0]
  return excelFile[sheet].slice(5)
}

