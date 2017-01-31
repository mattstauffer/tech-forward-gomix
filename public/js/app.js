/**
 * @todo: 
 * - Figure out how to pull these if we're not gonna do a build script
 * - Update the pulls  to be from our live data instead of .json files
 */
/*
window.axios = require('axios');
window.handlebars = require('handlebars');
const _ = require('lodash');
*/

// oops
window.handlebars = Handlebars

const client = axios.create({});

var $orgsContainer = $('.container--orgs'),
    $toolsContainer = $('.container--tools'),
    $resourcesContainer = $('.container--resources'),
    orgTemplate = handlebars.compile($('#org-template').html()),
    toolTemplate = handlebars.compile($('#tool-template').html()),
    resourceTemplate = handlebars.compile($('#resource-template').html());

client.get('data/orgs.json')
    .then(response => {
        const orgs = _.sortBy(response.data, 'name');

        orgs.forEach(org => {
            $orgsContainer.append(orgTemplate(decorateOrg(org)));
        });
    });

client.get('data/tools.json')
    .then(response => {
        const tools = _.sortBy(response.data, 'name');

        tools.forEach(tool => {
            $toolsContainer.append(toolTemplate(decorateTool(tool)));
        });
    });

client.get('data/resources.json')
    .then(response => {
        const resources = _.sortBy(response.data, 'name');

        resources.forEach(resource => {
            $resourcesContainer.append(resourceTemplate(decorateResource(resource)));
        });
    });

function decorateOrg(org)
{
    org.slug = slugify(org.name);
    org.imageNum = padToTwo(getRandomInt(1, 9));
    org.styleNum = org.customImage ? 9999 : getRandomInt(1, 6);
    org.location = buildLocationString(org);

    return org;
}

function decorateTool(tool)
{
    tool.slug = slugify(tool.name);
    tool.imageNum = padToTwo(getRandomInt(1, 9));
    tool.styleNum = tool.customImage ? 9999 : getRandomInt(1, 6);

    return tool;
}

function decorateResource(resource)
{
    resource.slug = slugify(resource.name);
    resource.imageNum = padToTwo(getRandomInt(1, 9));
    resource.styleNum = resource.customImage ? 9999 : getRandomInt(1, 6);

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
