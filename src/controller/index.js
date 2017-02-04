const importer = require('../spreadsheet/importer')

const index = function index (req, res) {
  const orgs = importer.getSheet('orgs')
  const projects = importer.getSheet('projects')
  const tools = importer.getSheet('tools')
  const resources = importer.getSheet('resources')
  const dataSources = importer.getSheet('dataSources')

  Promise.all([orgs, projects, tools, resources, dataSources]).then((output) => {
    res.render('index', {
      title: 'Index',
      // @todo destructuring
      orgs: output[0],
      projects: output[1],
      tools: output[2],
      resources: output[3],
      dataSources: output[4]
    });
  }, (reason) => {
    res.send('fail: ' + reason)
  })
}

module.exports = {
  index
}
