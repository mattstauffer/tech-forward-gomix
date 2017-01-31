/**
 * @todo:
 * - format the JSON output to be like what we're expecting
 */

// init project
const express = require('express')
const app = express()
const GoogleSpreadsheets = require("google-spreadsheets")
const _ = require('lodash')

let orgCharts = []
let toolCharts = []
let resourceCharts = []

// "spreadsheet key" is the long ID in the sheet'ss URL 
GoogleSpreadsheets({
  key: "1Kv7neJBJcg_ivrft2Wgd0Qs4DtpG7KCkZlnC3b234N8"
}, function(err, spreadsheet) {
  // R1C1:R21C10, or Row 1, Column 1 to Row 21, Column 10
  spreadsheet.worksheets[0].cells({
    range: "A1:I7"
  }, function(err, result) {
    orgCharts = result.cells
  })

  spreadsheet.worksheets[1].cells({
    range: "A1:I7"
  }, function(err, result) {
    toolCharts = result.cells
  })

  spreadsheet.worksheets[2].cells({
    range: "A1:I7"
  }, function(err, result) {
    resourceCharts = result.cells
  })
})


app.use(express.static('public'))

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/data/orgs.json", function (request, response) {
  response.send(transformCharts(orgCharts))
})

app.get("/data/tools.json", function (request, response) {
  response.send(transformCharts(toolCharts))
})

app.get("/data/resources.json", function (request, response) {
  response.send(transformCharts(resourceCharts))
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})


// @todo: Someone Node-friendly can move this to a more appropriate place
// @todo: Delete approved
function transformCharts(chartsFromGoogle)
{
  let headers = _.map(chartsFromGoogle[1], 'value')
  delete chartsFromGoogle[1]
  
  return _.chain(chartsFromGoogle)
    .map((row) => { return makeRow(row, headers) })
    .filter((row) => { return row.approved == 1 })
    .sortBy('name')
    .values()
}

// @todo: There has to be a cleaner way to do this...
function makeRow(row, headers)
{
  var base = {}
  _.each(headers, (header, index) => {
    base[header] = row[index + 1] ? row[index + 1]['value'] : null
  })
  return base
}