var  assert = require('assert'), eventHandler = require('./../src/eventHandler');

describe('#handleEventData', function() {
    describe('#handleEventType', function() {
        it('should call to next function when event type is the insert', function() {
            var response = eventHandler.handleEventType('INSERT', {}, function() { });
        });

        it('should call callback function when event type is the other than insert', function() {
            var response = eventHandler.handleEventType('REMOVE', {}, function() { }, function() {});
        });
    });

    describe('#handleEmailType', function() {
        it('should call to next function when event type is the insert', function() {
            var response = eventHandler.handleEmailType('newsletter', {}, function() { });
        });

        it('should call callback function when event type is the insert', function() {
            var response = eventHandler.handleEmailType('codealert', {}, function() { }, function() {});
        });
    });

    describe('#handleGetUserData', function() {
        it('should call to next function when email type is the testnewsletter', function() {
            var response = eventHandler.handleGetUserData( { 'dynamodb': { 'NewImage': { 'ReferenceId': { 'N': '123' } , 'Local': { 'S': "S" }, 'Email': { 'M': { 'UserId': { 'N': '1' } } }, 'EmailType': { 'S': "testnewsletter" } } } }, {}, function() { });
        });

        it('should call callback function when email type is the newsletter', function() {
            var response = eventHandler.handleGetUserData({ 'dynamodb': { 'NewImage': { 'ReferenceId': { 'N': '123' } , 'Local': { 'S': "S" }, 'EmailType': { 'S': "newsletter" } } } }, {}, function() {});
        });
    });

    describe('#handleGetUserName', function() {
        it('should return user email when first name is not defined', function() {
            var response = eventHandler.handleGetUserName({ 'email': "test" });
            assert.equal(response, 'test');
        });

        it('should return user firstname when first name is defined', function() {
            var response = eventHandler.handleGetUserName({ 'firstName': "test" });
            assert.equal(response, 'test');
        });
    });

    describe('#handleSkipCall', function() {
        it('should call next function when skip is not defined', function() {
            var response = eventHandler.handleSkipCall({}, null, function() {});
        });

        it('should call next function when skip is not defined', function() {
            var response = eventHandler.handleSkipCall({}, undefined, function() {});
        });
    });

    describe('#handleConditionalRequestOnSkipValue', function() {
        it('should call dynamodb function when skip is not defined', function() {
            var response = eventHandler.handleConditionalRequestOnSkipValue("test", [], { "putBulkEmailContentRecord": function() {} }, { "updateNewsletterStatus": function() {} }, function() { });
        });

        it('should give api call when skip is not defined', function() {
            var response = eventHandler.handleConditionalRequestOnSkipValue(null, [ { 'ReferenceId': 1 , "Local": "en", "EmailType": "newsletter" } ], null, { "updateNewsletterStatus": function() {} }, function() {});
        });

        it('should call next function when skip is not defined', function() {
            var response = eventHandler.handleConditionalRequestOnSkipValue(null, [ { 'ReferenceId': 1 , "Local": "en", "EmailType": "testnewsletter" } ], null, { "updateNewsletterStatus": function() {} }, function() {});
        });
    });

});
