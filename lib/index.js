const request = require('request');
const chalk = require('chalk');

module.exports = function(comboUrl) {

  const comboParts = comboUrl.split('??');
  const prefix = comboParts[0];

  const checkQueue = comboParts[1].split(',').map((urlPath) => {
    const url = prefix + urlPath;
    return checkUrl(url);
  });

  Promise
    .all(checkQueue)
    .then(() => {
      console.log('done!');
    });
}

function checkUrl(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, res, body) {

      if (res && res.statusCode === 200) {
        console.log(chalk.green('statusCode', res.statusCode), url);
      } else {
        console.error(chalk.red('error', err ? err.message : res.statusCode), url);
      }

      return resolve();

    })
  });
}