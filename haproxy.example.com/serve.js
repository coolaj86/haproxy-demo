'use strict';
var config = require('./config');
//var path = require('path');
var cluster = require('cluster');
// Always use at least 1 master and 2 workers
var numCores = Math.max(2, require('os').cpus().length);
var numWorkers = 0;
var sqlClient;

function spawnWorkers() {
  // Fork workers
  while (numWorkers < numCores) {
    cluster.fork();
    numWorkers += 1;
  }
}

function createClient() {
  var sqlite3 = require('sqlite3-cluster');
  var wrap = require('./lib/dbwrap');
  var dir = [
    { tablename: 'devices'
    , idname: 'name'
    , indices: ['ip']
    }
  , { tablename: 'domains'
    , idname: 'domain'
    //, relations: [{ tablename: 'devices', id: 'hashid', fk: 'devices.device' }]
    , indices: ['device']
    //, immutable: false
    }
  ];

  var promise = sqlite3.create({
      filename: config.sqlcipher.filename
    , verbose: true

    , standalone: (1 === numCores)
    , serve: cluster.isMaster
    //, serve: (numCores > 1) && cluster.isMaster
    , connect: cluster.isWorker
    //, connect: (numCores > 1) && cluster.isWorker

    , bits: config.sqlcipher.bits
  });

  return promise.then(function (db) {
    return db.init({
      key: config.sqlcipher.key
    , bits: config.sqlcipher.bits
    });
  }).then(function (db) {
    return wrap.wrap(db, dir);
  });
}

function serve(devdb) {
  var http = require('http');
  // TODO
  //var https = require('https');
  var server = http.createServer();

  server.on('request', require('./app').create({ devstore: devdb }));

  server.listen(5080, '10.8.0.1', function () {
    console.log(server.address());
  });
}

if (cluster.isMaster) {
  console.log('[MASTER]', require('os').cpus(), 'cpus');

  spawnWorkers();

  cluster.on('exit', function(worker, code, signal) {
    numWorkers -= 1;
    console.log('worker ' + worker.process.pid + ' died with ' + code + ':' + signal);
    spawnWorkers();
  });

  var restartHaproxyPath = '/usr/local/bin/restart-haproxy';
  require('child_process').exec(restartHaproxyPath, function (err, stdout, stderr) {
    console.log('[Log] haproxy restarted');
    console.error('[Error]', err, stdout, stderr);
  });
}

sqlClient = createClient();

if (cluster.isWorker) {
  console.log('cluster.worker.id', cluster.worker.id);

  sqlClient.then(function (devdb) {
    serve(devdb);
  });
}

// The native Promise implementation ignores errors because... dumbness???
process.on('unhandledPromiseRejection', function (err) {
  console.error('Unhandled Promise Rejection');
  console.error(err);
  console.error(err.stack);

  process.exit(1);
});
