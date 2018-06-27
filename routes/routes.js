var express = require('express');
var router = express.Router();
var bo = require('./backoffice');

bo(router);
module.exports = router;
