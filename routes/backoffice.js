const rf = require('./requestFunction');

const endPoint = process.env.endPoint;
const tokenType = process.env.tokenType;
const oauthPath = process.env.oauthPath;

module.exports = function init(router) {

    router.post(oauthPath, function (req, res) {

        console.log('POST ' + req.url)
        console.log(req.headers);

        var dataToBeSent;
        const path = endPoint + String(req.url);
        const headers = {
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded',
            }
        // Configure the request
        var options = {
            url: path,
            method: req.method,
            headers: headers,
            form:req.body
        }
        console.log(JSON.stringify(options));
        cb = function(dataToBeSent) {
            res.setHeader('Content-Type', 'application/json');
            res.status(dataToBeSent.statusCode);
            res.send(dataToBeSent.parsedData);
            res.end();
        }

        rf.requestFunction(cb, options);

        
    });

    router.use( function (req, res) {
        const path = endPoint + String(req.url);
        console.log(req.method);
        console.log(req.headers);
        console.log(JSON.stringify(req.body));

        var dataToBeSent;
        const token = req.headers[tokenType];
        const headers = {
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded'
            }
            headers[tokenType] = token
        // Configure the request
        var options = {
            url: path,
            method: req.method,
            headers: headers
        }

        
        cb = function(dataToBeSent) {
                res.setHeader('Content-Type', 'application/json');
                res.status(dataToBeSent.statusCode);
                res.send(dataToBeSent.parsedData);
                res.end();
        }
        

        if ((req.method === "GET" || req.method === "DELETE") ) {
            rf.requestFunction(cb, options);
        }

        else if (req.method === "POST" || req.method === "PUT") {
            options.form = req.body;
            rf.requestFunction(cb, options);
        }

    }) ;
    


}