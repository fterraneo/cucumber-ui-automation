const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function autoUIGetListElementsCaptions(searchTerm) {
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

        let base64 = await driver.takeScreenshot();
        let filename = new Date().toISOString().replace(/\-/g,'').replace(/\:/g,'').replace(/\./g,'') + '.png';
        require("fs").writeFile('logs/' + filename, base64, {encoding: 'base64'}, function(err) {
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

When('I search for {string}', {timeout: 8 * 5000}, async function (term) {
    this.actualResults = await autoUIGetListElementsCaptions(term);
    //console.log("actualResults=" + this.actualResults.length);
    //console.log("actualResults[0]=" + this.actualResults[0]);
});

Then('at least one element of the first 10 item of the list should have the caption {string}', async function(caption) {
    var found = false;
    for (var i=0; i<this.actualResults.length || i<10 ;i++) {
        //console.log("caption=" + caption);
        //console.log("item=" + this.actualResults[i]);
        if (this.actualResults[i].indexOf(caption) > -1) {
            found = true;
            break;
        }
    }
    assert.equal(found, true);
});
