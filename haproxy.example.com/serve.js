'use strict';

var http = require('http');
var server = http.createServer();

server.on('request', require('./app').create());

server.listen(5080, '10.8.0.1', function () {
  console.log(server.address());
});
