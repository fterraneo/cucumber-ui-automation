const assert = require('assert');
const { Given, When, Then } = require('cucumber');
var seleniumScripts = require('../../selenium_scripts/selenium_scripts.js');


Given('I am on the search page of unieuro', function() {

})

When('I search for {string}', {timeout: 8 * 5000}, async function (term) {
    this.actualResults = await seleniumScripts.performSearch(term);
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
