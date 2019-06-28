'use strict';

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const seleniumHelpers = require('./selenium_helpers.js');

exports.performSearch = async function(searchTerm) {
    return new Promise(async function(resolve, reject) {
        var elementCaptions = [];

        let driver = new webdriver.Builder().forBrowser('chrome').build();
        await driver.get('https://onlinestore.eurospin.it');

        //let element = await driver.findElement(webdriver.By.id('algolia-desktop-search-input'));
        let element = await driver.findElement(webdriver.By.css('#search'));
        await element.sendKeys(searchTerm, webdriver.Key.ENTER);

        var articles;

        // driver.findElements(webdriver.By.id("#instant-results > div.listing-container > main > div.items-container > section > section:nth-child(1) > article")).then(function(elements) {
        //     articles = elements;
        //     console.log("bella lee:" + articles.length);

        //     driver.quit();
        // });
        //await driver.wait(webdriver.until.elementLocated(webdriver.By.css("#instant-results > div.listing-container > main > div.items-container > section > section:nth-child(1) > article")),10000);
        await driver.wait(webdriver.until.elementLocated(webdriver.By.css("#maincontent > div.columns > div > div.search.results > div.products.wrapper.grid.products-grid > ol > li:nth-child(1)")),10000);
        //articles = await driver.findElements(webdriver.By.css("#instant-results > div.listing-container > main > div.items-container > section > section > article > div.item-container > div.info > div.category"));
        articles = await driver.findElements(webdriver.By.css("#maincontent > div.columns > div > div.search.results > div.products.wrapper.grid.products-grid > ol > li:nth-child(1) > div > div.product.details.product-item-details > strong > a"));
        //console.log('length: ' + articles.length);

        // let base64 = await driver.takeScreenshot();
        // let filename = new Date().toISOString().replace(/\-/g,'').replace(/\:/g,'').replace(/\./g,'') + '.png';
        // require("fs").writeFile('logs/' + filename, base64, {encoding: 'base64'}, function(err) {
        //     //console.log('File created');
        // });

        await seleniumHelpers.takeScreenshot();

        var text;
        for(let i=0;i<articles.length;i++) {            // old school for loop to avoid sync issues -.-
            text = await articles[i].getText();
            elementCaptions.push(text);
        }

        driver.quit();

        resolve(elementCaptions);
    });
};
