var assert = require('assert'), initApi = require("./../../src/api/initApi.js");
console.log(initApi);

describe('initApi', function() {

    describe('#getAPIURL', function() {
        it('should return proper API URL when the local is en', function() {
            var APIURL = initApi.getAPIURL("en");
            assert.equal(APIURL, process.env.KORTINGSCODE_API_URL);
        });

        it('should return proper API URL when the local is other than en', function() {
            var APIURL = initApi.getAPIURL("be");
            assert.equal(APIURL, process.env.FLIPIT_API_URL + "be" + "/");
        });
    });

    describe('#getAPIKey', function() {
        it('should return proper API key when its set', function() {
            var APIKEY = initApi.getAPIKey();
            assert.equal(APIKEY, process.env.API_KEY);
        });
    });

});

