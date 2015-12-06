var express = require('express');
var app = express();
app.all('/collect', function(req, res) {
    console.log(req.query);
    res.send('OK');
});
module.exports = app;
