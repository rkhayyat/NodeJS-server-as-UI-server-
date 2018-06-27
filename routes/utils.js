var fs = require('fs');

function genericError (res) {
    returnFile(res, "./routes/reponses/erreurs/erreur.json", 500);
}

function returnFile (res, file, code = 200) {
    fs.readFile(file, {encoding: 'utf-8'}, function (err, data) {
        if (!err) {

            if (!!JSON.parse(data).code && !!JSON.parse(data).libelle) {
                res.writeHead(500, {'Content-Type': 'application/json', 'encoding': 'utf8'});
            }else{
                res.writeHead(code, {'Content-Type': 'application/json', 'encoding': 'utf8'});
            }
            res.write(data);
            res.end();
        } else {
            console.log("fichier 'erreur.json' inexistant");
            res.status(404);
            res.end();
        }
    });
}

module.exports = {

    genericError: genericError,
    returnFile: returnFile
}