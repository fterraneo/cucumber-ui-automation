'use strict';

const webdriver = require('selenium-webdriver');

exports.takeScreenshot =  async function() {
    return new Promise(async function(resolve, reject) {
        let driver = new webdriver.Builder().forBrowser('chrome').build();

        let base64 = await driver.takeScreenshot();
        let filename = new Date().toISOString().replace(/\-/g,'').replace(/\:/g,'').replace(/\./g,'') + '.png';
        require("fs").writeFile('logs/' + filename, base64, {encoding: 'base64'}, function(err) {
            //console.log('File created');
        });

        driver.quit();
        resolve();
    });
};