const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function autoUIGetListElementsCaptions(searchTerm) {
    return new Promise(async function(resolve, reject) {
        var elementCaptions = [];

        let driver = new webdriver.Builder().forBrowser('chrome').build();
        await driver.get('https://www.unieuro.it/online/');

        let element = await driver.findElement(webdriver.By.id('algolia-desktop-search-input'));
        await element.sendKeys(searchTerm, webdriver.Key.ENTER);

        var articles;

        // driver.findElements(webdriver.By.id("#instant-results > div.listing-container > main > div.items-container > section > section:nth-child(1) > article")).then(function(elements) {
        //     articles = elements;
        //     console.log("bella lee:" + articles.length);

        //     driver.quit();
        // });
        await driver.wait(webdriver.until.elementLocated(webdriver.By.css("#instant-results > div.listing-container > main > div.items-container > section > section:nth-child(1) > article")),10000);

        articles = await driver.findElements(webdriver.By.css("#instant-results > div.listing-container > main > div.items-container > section > section > article > div.item-container > div.info > div.category"));

        //console.log('length: ' + articles.length);

        let base64 = await driver.takeScreenshot();
        require("fs").writeFile('logs/out.png', base64, {encoding: 'base64'}, function(err) {
            //console.log('File created');
        });

        var text;
        for(let i=0;i<articles.length;i++) {            // old school for loop to avoid sync issues -.-
            text = await articles[i].getText();
            elementCaptions.push(text);
        }

        driver.quit();

        resolve(elementCaptions);
    });
}

Given('I am on the search page of unieuro', function() {

})

When('I search for "PS4"', {timeout: 6 * 5000}, async function () {
    this.actualResults = await autoUIGetListElementsCaptions("PS4");
    console.log("actualResults=" + this.actualResults.length);
});

Then('at least one element of the first 10 item of the list should have the caption "Playstation 4"', async function() {
    var found = false;
    for (let i=0; i<this.actualResults.length || i<10 ;i++) {
        if (this.actualResults[i] === "Playstation 4") {
            found = true;
            break;
        }
    }
    assert.equal(found, true);
});
