'use strict';

const project         = '../../';
const fs              = require('fs');
const path            = require('path');
const ncp             = require('ncp');

if(path.basename(path.resolve(__dirname, '../')) !== 'node_modules') return;

let templateJSON      = require('./package.json');
let packageJSON       = require(`${project}package.json`);

/* update readme */
if(!fs.existsSync(path.resolve(__dirname, project, 'readme.md'))) {
  ncp.ncp(path.resolve(__dirname, 'readme.md'), path.resolve(__dirname, project, 'readme.md'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: readme updated'));
}

/* update configuration */
let json = {
  ...packageJSON,
  dependencies: {
    ...packageJSON.dependencies,
    ...templateJSON.dependencies
  }
};
fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: configuration updated'));

/* update source */
if(!fs.existsSync(path.resolve(__dirname, project, 'src'))) {
  ncp.ncp(path.resolve(__dirname, 'src'), path.resolve(__dirname, project, 'src'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: source updated'));
}