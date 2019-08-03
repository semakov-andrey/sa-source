const project                   = '../../';
const fs                        = require('fs');
const path                      = require('path');
const ncp                       = require('ncp');

if (path.basename(path.resolve(__dirname, '../')) !== 'node_modules') return;

const templateJSON              = require('./package.json');
const packageJSON               = require(`${project}package.json`);
const DEV                       = packageJSON && (packageJSON.name === 'sa-template-1' || packageJSON.name === 'sa-template-2');

/* update source */
if (!fs.existsSync(path.resolve(__dirname, project, 'src'))) {
  ncp.ncp(path.resolve(__dirname, 'src'), path.resolve(__dirname, project, 'src'), error => {
    if (!error) {
      if (packageJSON.devDependencies && (packageJSON.devDependencies['sa-template-2'] || packageJSON.name === 'sa-template-2')) {
        fs.unlinkSync(path.resolve(__dirname, project, 'src/scripts/main.js'));
        fs.unlinkSync(path.resolve(__dirname, project, 'src/modules/layout/layout.pug'));
        fs.unlinkSync(path.resolve(__dirname, project, 'src/modules/images/images.pug'));
        fs.renameSync(path.resolve(__dirname, project, 'src/scripts/main.wp.js'), path.resolve(__dirname, project, 'src/scripts/main.js'));
        fs.renameSync(path.resolve(__dirname, project, 'src/modules/layout/layout.wp.pug'), path.resolve(__dirname, project, 'src/modules/layout/layout.pug'));
        fs.renameSync(path.resolve(__dirname, project, 'src/modules/images/images.wp.pug'), path.resolve(__dirname, project, 'src/modules/images/images.pug'));
      } else {
        fs.unlinkSync(path.resolve(__dirname, project, 'src/scripts/main.wp.js'));
        fs.unlinkSync(path.resolve(__dirname, project, 'src/modules/layout/layout.wp.pug'));
        fs.unlinkSync(path.resolve(__dirname, project, 'src/modules/images/images.wp.pug'));
      }
      console.info('Success: source updated');
    } else {
      console.error('\x1b[31m%s\x1b[0m', `Error: ${error}`);
    }
  });
}

if (DEV) return;

/* update configuration */
delete templateJSON.dependencies['ncp'];
const json = {
  ...packageJSON,
  dependencies: {
    ...packageJSON.dependencies,
    ...templateJSON.dependencies
  }
};
fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', `Error: ${error}`) : console.info('Success: configuration updated'));
