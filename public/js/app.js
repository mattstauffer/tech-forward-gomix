/**
 * @todo: 
 * - Figure out how to pull these if we're not gonna do a build script
 * - Update the pulls  to be from our live data instead of .json files
 */
/*
window.axios = require('axios');
window.handlebars = require('handlebars');
*/

const client = axios.create({});

var $orgsContainer = $('.container--orgs'),
    $toolsContainer = $('.container--tools'),
    $resourcesContainer = $('.container--resources'),
    orgTemplate = Handlebars.compile($('#org-template').html()),
    toolTemplate = Handlebars.compile($('#tool-template').html()),
    resourceTemplate = Handlebars.compile($('#resource-template').html());

client.get('data/orgs.json')
    .then(response => {
        $orgsContainer.html('')
        response.data.forEach(org => {
            $orgsContainer.append(orgTemplate(decorateOrg(org)));
        });
    });

client.get('data/tools.json')
    .then(response => {
        $toolsContainer.html('')
        response.data.forEach(tool => {
            $toolsContainer.append(toolTemplate(decorateTool(tool)));
        });
    });

client.get('data/resources.json')
    .then(response => {
        $resourcesContainer.html('')
        response.data.forEach(resource => {
            $resourcesContainer.append(resourceTemplate(decorateResource(resource)));
        });
    });

function baseDecorate(item)
{
  item.slug = slugify(item.name)
  item.imageNum = padToTwo(getRandomInt(1, 9));
  item.styleNum = item.customImage ? 9999 : getRandomInt(1, 6);
}

function decorateOrg(org)
{
  baseDecorate(org)
  org.location = buildLocationString(org);

  return org;
}

function decorateTool(tool)
{
  baseDecorate(tool)
  
  return tool;
}

function decorateResource(resource)
{
  baseDecorate(resource)

  return resource;
}

function buildLocationString(org)
{
  if (org.locationAddress && org.locationCity && org.locationState) {
    return org.locationAddress + ', ' + org.locationCity + ', ' + org.locationState;
  }

  if (org.locationCity && org.locationState) {
    return org.locationCity + ', ' + org.locationState;
  }

  if (org.locationState) {
    return org.locationState;
  }

  return null;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function padToTwo(number) {
  if (number <= 10) { number = ("0" + number).slice(-2); }
  return number;
}

function slugify(string)
{
  return string.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-')      // Replace spaces, non-word characters and dashes with a single dash (-)
}
