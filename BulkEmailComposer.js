exports.handler = function(event, context) {
    console.log("inside the handler of bulk email composer");
    //console.log(JSON.stringify(event, null, 2))
    require('dotenv').load();
    var apiRequest, getLambdaEventData, async, dynamodbRequest, _, composeBulkEmail, records, eventHandler;

    getLambdaEventData = require('./src/getLambdaEventData');
    apiRequest = require('./src/api/apiRequest');
    dynamodbRequest = require('./src/dynamodbRequests');
    async = require('async');
    _ = require('lodash');
    eventHandler = require('./src/eventHandler');

    composeBulkEmail = function(record, callback) {
        async.waterfall([
            function getEventType(next) {

                EventType = getLambdaEventData.getEventName(record, next);
                eventHandler.handleEventType(EventType, record, next, callback);

            }, function getEmailType( record , next) {

                EmailType = getLambdaEventData.getEmailType(record, next);
                eventHandler.handleEmailType(EmailType, record, next, callback);

            }, function getDynamodbRecord(record, EmailType, next) {

               //check the record exist in the bulkemail table with the local = record.local, and timestamp = record.bulkemailtimestamp
                timestamp = getLambdaEventData.getBulkEmailTimestamp(record, next);
                local = getLambdaEventData.getLocal(record, next);
                dynamodbRequest.getRecords("BulkEmail", [ [ "Timestamp", "EQ", parseInt(timestamp) ], [ "Local", "EQ", local ] ], record, callback, next);

            },function securityCheck(dbRecord, record, next) {

                eventHandler.performSecurityCheck(dbRecord, record, callback, next);

            }, function getUserData(record, next) {

                eventHandler.handleGetUserData(record, event, next);

            }, function getEmailQueueObject(response, record, next) {

                EmailQueueObjects = [];
                _.forEach(response.visitor, function(user, key) {
                    var emailObject = eventHandler.getEmailQueueObject(record, user, next);
                    EmailQueueObjects.push(emailObject);
                });
                eventHandler.handleSkipCall(EmailQueueObjects, response.skip, next);

            }, function putRecordForSkipValueInDynamoDB(EmailContentObjects, skip, next) {

                eventHandler.handleConditionalRequestOnSkipValue(skip, EmailContentObjects, dynamodbRequest, apiRequest, next);

            }, function putRowsInDynamoDB(EmailContentObjects, next) {

                _.forEach(EmailContentObjects, function(EmailContentObject, key) {
                    dynamodbRequest.putRecord(EmailContentObject, next);
                });

            } ], function(err) {
                if (err) {
                    console.error(
                        err
                    );
                    callback(err);
                } else {
                    callback();
                }
            }
        );
    }
    records = getLambdaEventData.getEventRecords(event);
    async.forEachOfSeries(records, function(record, key, callback) {
        composeBulkEmail(record, callback);
    }, function(err) {
        if (err) {
            context.done(err);
        } else {
            context.done(null, "success");
        }
    });
}
