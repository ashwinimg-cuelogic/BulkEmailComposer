var  assert = require('assert'), getLambdaEventData = require('./../src/getLambdaEventData');

describe('#getLambdaEventData', function() {
    describe('#getEventRecords', function() {
        it('should call to next function when event Record is not present', function() {
            var response = getLambdaEventData.getEventRecords({}, function() {
            });
        });

        it('should return records if specified in event object', function() {
            var response = getLambdaEventData.getEventRecords({ 'Records': 'test' });
            assert.equal(response, 'test');
        });
    });

    describe('#getEventName', function() {
        it('should call to next function when Event Name is not specified', function() {
            var response = getLambdaEventData.getEventName({}, function() {
            });
        });

        it('should return Event Name if specified in event object', function() {
            var response = getLambdaEventData.getEventName({ 'eventName': 'test' });
            assert.equal(response, 'test');
        });
    });

    describe('#getEmailType', function() {
        it('should call to next function when Email Type is not specified', function() {
            var response = getLambdaEventData.getEmailType({ 'dynamodb': { 'NewImage': { 'EmailType': {} } } }, function() {
            });
        });

        it('should return Email Typee if specified in event object', function() {
            var response = getLambdaEventData.getEmailType({ 'dynamodb': { 'NewImage': { 'EmailType': { 'S': 'test' } } } });
            assert.equal(response, 'test');
        });
    });

    describe('#getLocal', function() {
        it('should call to next function when Local is not specified', function() {
            var response = getLambdaEventData.getLocal({ 'dynamodb': { 'NewImage': { 'Local': { } } } }, function() {
            });
        });

        it('should return Local if specified in event object', function() {
            var response = getLambdaEventData.getLocal({ 'dynamodb': { 'NewImage': { 'Local': { 'S': 'test' } } } });
            assert.equal(response, 'test');
        });
    });

    describe('#getReferenceId', function() {
        it('should call to next function when ReferenceId is not specified', function() {
            var response = getLambdaEventData.getReferenceId({ 'dynamodb': { 'NewImage': { 'ReferenceId': {  } } } }, function() {
            });
        });

        it('should return ReferenceId if specified in event object', function() {
            var response = getLambdaEventData.getReferenceId({ 'dynamodb': { 'NewImage': { 'ReferenceId': { 'N': '123' } } } });
            assert.equal(response, '123');
        });
    });

    describe('#getUserId', function() {
        it('should call to next function when UserId is not specified', function() {
            var response = getLambdaEventData.getUserId({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'UserId': { } } } } } }, function() {
            });
        });

        it('should return UserId if specified in event object', function() {
            var response = getLambdaEventData.getUserId({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'UserId': { 'N': '1' } } } } } });
            assert.equal(response, '1');
        });
    });

    describe('#getSenderEmail', function() {
        it('should call to next function when SenderEmail is not specified', function() {
            var response = getLambdaEventData.getSenderEmail({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'From': { } } } } } }, function() {
            });
        });

        it('should return SenderEmail if specified in event object', function() {
            var response = getLambdaEventData.getSenderEmail({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'From': { 'S': 'test@test.com' } } } } } });
            assert.equal(response, 'test@test.com');
        });
    });

    describe('#getSubject', function() {
        it('should call to next function when Subject is not specified', function() {
            var response = getLambdaEventData.getSubject({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'Subject': { } } } } } }, function() {
            });
        });

        it('should return UserId if specified in event object', function() {
            var response = getLambdaEventData.getSubject({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'Subject': { 'S': 'test' } } } } } });
            assert.equal(response, 'test');
        });
    });

    describe('#getContent', function() {
        it('should call to next function when Content is not specified', function() {
            var response = getLambdaEventData.getContent({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'Content': { } } } } } }, function() {
            });
        });

        it('should return Content if specified in event object', function() {
            var response = getLambdaEventData.getContent({ 'dynamodb': { 'NewImage': { 'Email': { 'M': { 'Content': { 'S': 'test' } } } } } });
            assert.equal(response, 'test');
        });
    });

    describe('#getSkipValue', function() {
        it('should call to next function when skip is not specified', function() {
            var response = getLambdaEventData.getSkipValue({ 'dynamodb': { 'NewImage': { 'skip': { } } } }, function() {
            });
        });

        it('should return skip if specified in event object', function() {
            var response = getLambdaEventData.getSkipValue({ 'dynamodb': { 'NewImage': { 'Skip': { 'S': 'test' } } } });
            assert.equal(response, 'test');
        });
    });
});
