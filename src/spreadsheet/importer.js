const GoogleSpreadsheets = require('google-spreadsheets')
const _ = require('lodash')
const Promise = require('promise')
const mcache = require('memory-cache')

const secondsToCache = 360

const sheets = {
  'orgs': {
    'number': 0,
    'range': 'R1C1:R99C9'
  },
  'projects': {
    'number': 1,
    'range': 'R1C1:R99C9'
  },
  'tools': {
    'number': 2,
    'range': 'R1C1:R99C6'
  },
  'resources': {
    'number': 3,
    'range': 'R1C1:R99C6'
  },
  'dataSources': {
    'number': 4,
    'range': 'R1C1:R99C5'
  },
  'articles': {
    'number': 5,
    'range': 'R1C1:R99C5'
  }
}

// Get and transform the value of a given sheet
const getSheet = function getSheet(sheetName) {
  return new Promise((resolve, reject) => {
    if (!(sheetName in sheets)) return reject('Not a valid sheet')

    let cacheKey = 'sheet_' + sheetName
    let cacheResponse = mcache.get(cacheKey)

    if (cacheResponse) {
      resolve(cacheResponse)
      return
    }

    GoogleSpreadsheets({
      key: process.env.GOOGLE_SPREADSHEET_ID
    }, function(err, spreadsheet) {
      if (err) return reject('error loading spreadsheet:' + err)

      const sheet = sheets[sheetName]

      spreadsheet.worksheets[sheet.number].cells({
        range: sheet.range
      }, function(err, result) {
        let output = transformSheet(result.cells)
        mcache.put(cacheKey, output, secondsToCache * 1000)
        resolve(output)
      })
    })
  })
}

// Transform a sheet from Google into a JSON format
function transformSheet(sheetFromGoogle)
{
  let headers = _.map(sheetFromGoogle[1], 'value')
  delete sheetFromGoogle[1]

  let output = _.map(sheetFromGoogle, (row) => { return makeRow(row, headers) })
  output = _.filter(output, (row) => { return row.approved == 1 })
  output = _.sortBy(output, 'name')
  return output

  // for some reason we're getting a lodash wrapper result from this... so temp
  // overriding with the return above
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
  return decorate(mapRowFromGoogle(row, headers))
}

// Map the result from Google sheets to a usable JSON object
function mapRowFromGoogle(row, headers)
{
  return _.reduce(headers, (obj, header, index) => {
    obj[header] = cell(row, index)
    return obj
  }, {})
}

// Decorate the API result with slug and readable location string
function decorate(row)
{
  row.slug = slugify(row.name)
  row.location = buildLocationString(row)

  return row
}

// Convert a string to a slug
function slugify(string)
{
  return string.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-')      // Replace spaces, non-word characters and dashes with a single dash (-)
}

// Get the value of a 1-based cell based on its 0-based index,
// allowing for null values
function cell(row, index) {
  return row[index + 1] ? row[index + 1]['value'] : null
}

// Build a readable location string based on optional location fields
function buildLocationString(item)
{
  if (item.locationAddress && item.locationCity && item.locationState) {
    return item.locationAddress + ', ' + item.locationCity + ', ' + item.locationState
  }

  if (item.locationCity && item.locationState) {
    return item.locationCity + ', ' + item.locationState
  }

  if (item.locationState) {
    return item.locationState
  }

  return null
}

module.exports = {
  getSheet
}
