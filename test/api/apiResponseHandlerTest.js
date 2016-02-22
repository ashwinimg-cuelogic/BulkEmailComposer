var assert = require('assert'), apiResponseHandler = require("./../../src/api/apiResponseHandler.js");

describe('apiResponseHandler', function() {
    describe('#handleGetUserDataResponse', function() {
        it('should return error if error is produced in api request', function() {
            var response = apiResponseHandler.handleGetUserDataResponse("error");
            assert.deepEqual(response, { 'error':"error" });
        });

        it('should return error if invalid json object is passed by api request', function() {
            var response = apiResponseHandler.handleGetUserDataResponse(null, "{'':}");
            assert.deepEqual(response, { "error":"API error" });
        });

        it('should return error if 200 response is not returned by api request', function() {
            var response = apiResponseHandler.handleGetUserDataResponse(null, '{"code": 400, "messages": "pages not found"}');
            assert.deepEqual(response, { "error":"API Response returns pages not found" });
        });

        it('should return error if response is not valid', function() {
            var response = apiResponseHandler.handleGetUserDataResponse(null, '{}', { 'receiver_email':'test@test.com' });
            assert.deepEqual(response, { "error":"NO user found with the given data" });
        });

        it('should return response with newsletter if valid data is passed by api request', function() {
            var response = apiResponseHandler.handleGetUserDataResponse(null, '{"email":"test"}');
            assert.deepEqual(response, { "visitor": [ { "email":"test" } ] });
        });

    });

    describe('#handleGetUsersDataResponse', function() {
        it('should return error if error is produced in api request', function() {
            var response = apiResponseHandler.handleGetUsersDataResponse("error");
            assert.deepEqual(response, { 'error':"error" });
        });

        it('should return error if invalid json object is passed by api request', function() {
            var response = apiResponseHandler.handleGetUsersDataResponse(null, "{'':}");
            assert.deepEqual(response, { "error":"API error" });
        });

        it('should return error if 200 response is not returned by api request', function() {
            var response = apiResponseHandler.handleGetUsersDataResponse(null, '{"code": 400, "messages": "pages not found"}');
            assert.deepEqual(response, { "error":"API Response returns pages not found" });
        });

        it('should return error if response is not valid', function() {
            var response = apiResponseHandler.handleGetUsersDataResponse(null, '{}', { 'receiver_email':'test@test.com' });
            assert.deepEqual(response, { "error":"NO user found with the given data" });
        });

        it('should return response with newsletter if valid data is passed by api request', function() {
            var response = apiResponseHandler.handleGetUsersDataResponse(null, '{"_embedded":{"visitors":[{"id":4591}]}}');
            assert.deepEqual(response, { "visitor": [{ "id":4591 }]});
        });
    });

    describe('#handleUpdateNewsletterStatusResponse', function() {
        it('should return error if error is produced in api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse("error");
            assert.deepEqual(response, { 'error':"error" });
        });

        it('should return error if invalid json object is passed by api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse(null, "{'':}");
            assert.deepEqual(response, { "error":"API error" });
        });

        it('should return error if 200 response is not returned by api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse(null, '{"code": 400, "messages": "pages not found"}');
            assert.deepEqual(response, { "error":"API Response returns pages not found" });
        });

        it('should return response with newsletter if valid data is passed by api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse(null, '{"id":4591}');
            assert.deepEqual(response, { "newsletter": { "id":4591 } });
        });
    });
});

