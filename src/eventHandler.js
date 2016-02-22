var handleEventType, handleEmailType, getLambdaEventData, apiRequest, handleGetUserData, handleGetUserName, getEmailQueueObject, handleSkipCall,
    encoding, handleConditionalRequestOnSkipValue, performSecurityCheck;

getLambdaEventData = require('./getLambdaEventData');
apiRequest = require('./api/apiRequest');
encoding = require('./encoding');

handleEventType = function(EventType, record, next, callback) {
    if (EventType == "INSERT") {
        next(null, record);
    } else {
        console.log("no handling for " + EventType + " type of trigger");
        callback();
    }
}

handleEmailType = function(EmailType, record, next, callback) {
    if (EmailType == "newsletter" || EmailType == "testnewsletter") {
        next(null, record, EmailType);
    } else {
        console.log("no handling for " + EmailType + " type of trigger");
        callback();
    }
}

handleGetUserData = function(record, event, next) {
    Local = getLambdaEventData.getLocal(record, next);
    ReferenceId = getLambdaEventData.getReferenceId(record, next);
    EmailType = getLambdaEventData.getEmailType(record, next);
    if (EmailType == "testnewsletter" ) {

        UserId = getLambdaEventData.getUserId(record, next);
        apiRequest.getUserData(Local, UserId, record, event, next);

    } else if (EmailType == "newsletter") {

        skip = getLambdaEventData.getSkipValue(record);
        apiRequest.getUsersData(Local, skip, record, event, next);

    }
}

handleGetUserName = function(user) {
   return (typeof user.firstName  === 'undefined') ? user.email : user.firstName
}

handleSkipCall = function(EmailQueueObjects, skip, parent_next) {
    if (typeof skip !== 'undefined') {
        parent_next(null, EmailQueueObjects, skip);
    } else {
        parent_next(null, EmailQueueObjects, null);
    }
}

getEmailQueueObject = function(record, user, next) {
    return {
        'From': getLambdaEventData.getSenderEmail(record, next),
        'SenderName': getLambdaEventData.getSenderName(record, next),
        'To': user.email,
        'ReceiverName': handleGetUserName(user),
        'Subject': getLambdaEventData.getSubject(record, next),
        "Content": getLambdaEventData.getContent(record, next),
        "ReferenceId": parseInt(getLambdaEventData.getReferenceId(record, next)),
        "EmailType": getLambdaEventData.getEmailType(record, next),
        "Local": getLambdaEventData.getLocal(record, next),
        "UserId": parseInt(user.id),
        "BulkEmailTimestamp": parseInt(getLambdaEventData.getBulkEmailTimestamp(record, next)),
        "MergeVars": {
            "loginLinkWithUnsubscribe": encoding.Base64.encode(user.email) + "/" + user.password,
            "loginLink": encoding.Base64.encode(user.email) + "/" + user.password
        }
    }
}

handleConditionalRequestOnSkipValue = function(skip, EmailContentObjects, dynamodbRequest, apiRequest, next) {
    if (skip !== null) {
        dynamodbRequest.putBulkEmailContentRecord(EmailContentObjects, skip, next);
    } else {
        //when skip is null it has done with fetching usersData, give api call to update receipient count
        if (EmailContentObjects[0].EmailType == "newsletter") {
            apiRequest.updateNewsletterStatus( EmailContentObjects[0].Local, EmailContentObjects[0].ReferenceId, 3, EmailContentObjects, next);
        } else {
            next(null, EmailContentObjects);
        }
    }
}

performSecurityCheck = function(dbRecord, record, callback, next) {
    EmailType = getLambdaEventData.getEmailType(record, next);
    if (EmailType === "newsletter") {
        if (typeof dbRecord.count  !== "undefined" && dbRecord.count  == 1 &&  dbRecord.Items[0].ScheduledStatus === "triggered") {
            next(null,record);
        } else {
            console.log("security check failed");
            callback();
        }
    }
    next(null, record);
}

module.exports = {
    handleEventType: handleEventType,
    handleEmailType: handleEmailType,
    handleGetUserData: handleGetUserData,
    getEmailQueueObject: getEmailQueueObject,
    handleSkipCall: handleSkipCall,
    handleGetUserName: handleGetUserName,
    handleConditionalRequestOnSkipValue: handleConditionalRequestOnSkipValue,
    performSecurityCheck: performSecurityCheck

};
