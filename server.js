
"use strict";

// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    app = express(),
    http = require('http').createServer(app);

app.use(express.static(__dirname));

app.get('/',function(req,res){
  res.sendfile(__dirname + '/index.html');
});

http.listen(3000);
