const request = require('request');

function requestFunction(callback, options) {
    // Start the request
    return request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            callback({parsedData:body, statusCode:response.statusCode});
        }

        else {
            callback({parsedData:body, statusCode:response.statusCode});
        }
    })
}


module.exports = {
    requestFunction: requestFunction,
}