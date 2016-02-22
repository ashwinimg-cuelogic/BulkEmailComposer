var assert, apiRequestModule, http;
assert = require('assert');
apiRequestModule = require("./../../src/api/apiRequest.js");
http = require('http');

describe('#getUserData', function() {
    it('should return error if error is produced in api request', function() {
        var response = apiRequestModule.getUserData("en", 1, {}, { 'receiver_email':'arthur@imbull.com' }, function() {});
    });

    it('should call next function on success of  api request', function() {
        var response = apiRequestModule.getUserData("en", 1, {}, { 'receiver_email':'arthur@imbull.com' }, function() {});
    });
});

describe('#getUsersData', function() {
    it('should return error if error is produced in api request', function() {
        var response = apiRequestModule.getUsersData("en", "skip", {}, { 'receiver_email':'arthur@imbull.com' }, function() {});
    });

    it('should call next function on success of  api request', function() {
        var response = apiRequestModule.getUsersData("en", null, {}, { 'receiver_email':'arthur@imbull.com' }, function() {});
    });
});

describe('#updateNewsletterStatus', function() {
    it('should return error if error is produced in api request', function() {
        var response = apiRequestModule.updateNewsletterStatus("en", 1, 3, {}, function() {});
    });

    it('should call next function on success of  api request', function() {
        var response = apiRequestModule.updateNewsletterStatus("en", 1, 3, {}, function() {});
    });
});

