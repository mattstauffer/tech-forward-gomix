const importer = require('../spreadsheet/importer')

const returnSheet = function sheet(sheetName, req, res) {
  importer.getSheet(sheetName)
    .then((data) => {
      res.send(data)
    }, (reason) => {
      console.log('error', reason)
      res.send('error')
    })
}

/**
 * returns all organizations in a JSON file
 */
const orgs = function orgs(req, res) {
  returnSheet('orgs', req, res)
}

/**
 * returns all projects in a JSON file
 */
const projects = function orgs(req, res) {
  returnSheet('projects', req, res)
}

/**
 * returns all tools in a JSON file
 */
const tools = function orgs(req, res) {
  returnSheet('tools', req, res)
}

/**
 * returns all resources in a JSON file
 */
const resources = function orgs(req, res) {
  returnSheet('resources', req, res)
}

module.exports = {
  orgs,
  projects,
  tools,
  resources
}