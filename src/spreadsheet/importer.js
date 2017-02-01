const GoogleSpreadsheets = require('google-spreadsheets')
const _ = require('lodash')
const Promise = require('promise')

const sheets = {
  'orgs': {
    'number': 0,
    'range': 'R1C1:R99C9'
  },
  'tools': {
    'number': 1,
    'range': 'R1C1:R99C9'
  },
  'resources': {
    'number': 2,
    'range': 'R1C1:R99C5'
  }
}

// Get and transform the value of a given sheet
const getSheet = function getSheet(sheetName) {
  return new Promise((resolve, reject) => {
    if (!(sheetName in sheets)) {
      return reject('Not a valid sheet')
    }

    // "spreadsheet key" is the long ID in the sheet's URL 
    GoogleSpreadsheets({
      key: process.env.GOOGLE_SPREADSHEET_ID
    }, function(err, spreadsheet) {
      const sheet = sheets[sheetName]
      
      spreadsheet.worksheets[sheet.number].cells({
        range: sheet.range
      }, function(err, result) {
        resolve(transformSheet(result.cells))
      })
    })
  })
}

// Transform a sheet from Google into a JSON format
// @todo: Delete approved
function transformSheet(sheetFromGoogle)
{
  let headers = _.map(sheetFromGoogle[1], 'value')
  delete sheetFromGoogle[1]
  
  return _.chain(sheetFromGoogle)
    .map((row) => { return makeRow(row, headers) })
    .filter((row) => { return row.approved == 1 })
    .sortBy('name')
    .values()
}

// Use the headers row to map the values from each row
// to the appropriate JSON object property
function makeRow(row, headers)
{
  return _.reduce(headers, (obj, header, index) => {
    obj[header] = cell(row, index)
    return obj
  }, {})
}

// Get the value of a 1-based cell based on its 0-based index,
// allowing for null values
function cell(row, index) {
  return row[index + 1] ? row[index + 1]['value'] : null
}

module.exports = {
  getSheet
}