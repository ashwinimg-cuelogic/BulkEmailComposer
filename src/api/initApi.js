var getAPIURL, getApiKey;

getAPIURL = function(locale, reply) {
    if (locale === 'en') {
        return process.env.KORTINGSCODE_API_URL;
    }
    return process.env.FLIPIT_API_URL + locale + "/";
}

getAPIKey = function() {
    return process.env.API_KEY;
}

module.exports = {
    getAPIURL: getAPIURL,
    getAPIKey: getAPIKey
};
