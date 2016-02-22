var handleGetUserDataResponse, handleGetUsersDataResponse, handleUpdateNewsletterStatusResponse;

handleGetUserDataResponse = function(error, userData, event) {
    if (error) {
        return { "error": error };
    }
    try{
        userData = JSON.parse(userData);
        if (typeof userData.code !== 'undefined' &&  userData.code !== 200) {
            return { "error": "API Response returns " + userData.messages };
        }
        if (userData === '' || typeof userData.email === 'undefined') {
            return { "error": "NO user found with the given data" };
        }
        return { "visitor": [ userData ] };
    } catch(error) {
        return { "error": "API error" };
    }
}

handleGetUsersDataResponse = function(error, userData, event) {
    if (error) {
        return { "error": error };
    }
    try{
        userData = JSON.parse(userData);
        if (typeof userData.code !== 'undefined' &&  userData.code !== 200) {
            return { "error": "API Response returns " + userData.messages };
        }
        if (userData === '' || typeof userData._embedded === 'undefined') {
            return { "error": "NO user found with the given data" };
        }
        if (userData._links && typeof userData._links.next !== 'undefined') {
            return { "visitor": userData._embedded.visitors , "skip": userData._links.next.href };
        }
        return { "visitor": userData._embedded.visitors };
    } catch(error) {
        return { "error": "API error" };
    }
}

handleUpdateNewsletterStatusResponse = function(error, newsletterData) {
    if (error) {
        return { "error": error };
    }
    try{
        newsletterData = JSON.parse(newsletterData);
        console.log(newsletterData.code);
        if (typeof newsletterData.code !== 'undefined' &&  newsletterData.code !== 200) {
            return { "error": "API Response returns " + newsletterData.messages };
        }
        return { "newsletter": newsletterData };
    } catch(error) {
        return { "error": "API error" };
    }
}
module.exports = {
    handleGetUserDataResponse: handleGetUserDataResponse,
    handleGetUsersDataResponse: handleGetUsersDataResponse,
    handleUpdateNewsletterStatusResponse:handleUpdateNewsletterStatusResponse
};
