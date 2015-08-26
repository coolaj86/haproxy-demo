'use strict';

var PromiseA = require('bluebird');

module.exports.create = function (deps) {
  var bodyParser = require('body-parser');
  var Mustache = require('mustache');
  var app = require('express')();
  var devstore = deps.devstore;
  var restartHaproxyPath = '/usr/local/bin/restart-haproxy';

  app.use('/', bodyParser.json({ limit: 1024 * 1024 }));
  app.use('/', function (req, res) {
    var fs = require('fs');
    var ip = req.connection.remoteAddress;

    // TODO needs validation
    var device = req.body.device||'none';
    // TODO needs validation
    var domains = req.body.domains||[];

    var promises = domains.map(function (domain) {
      return devstore.Domains.upsert(domain, { device: device });
    });

    promises.push(devstore.Devices.upsert(device, { name: device, ip: ip }));
    console.log('[remote client]', device, ip, domains);

    PromiseA.all(promises).then(function () {
      devstore.sql.all('SELECT * FROM devices JOIN domains ON devices.name = domains.device', function (err, rows) {
        if (err) {
          console.error('[ERROR] sql.get');
          res.send({ error: { message: "bad query" } });
          return;
        }

        //var tplPath = '/etc/haproxy/tpl.cfg';
        var tplPath = '/etc/haproxy/haproxy.demo.tpl.cfg';
        //var outPath = '/tmp/haproxy.demo.cfg';
        var outPath = '/etc/haproxy/haproxy.demo.cfg';
        var tpl = fs.readFileSync(tplPath, 'utf8');
        var view = { domains: [], domainsMap: {}, devices: [], devicesMap: {} };

        rows.forEach(function (row) {
          var dev = view.devicesMap[row.device];
          var domain = view.domainsMap[row.domain];

          if (!dev) {
            dev = view.devicesMap[row.device] = row;
            view.devices.push({ device: row.name || row.device, ip: row.ip });
          }
          if (!domain) {
            domain = view.domainsMap[row.domain] = row;
            view.domains.push({ domain: row.domain, device: row.device });
          }
        });

        var output = Mustache.render(tpl, view);

        // TODO clusterize the write + haproxy restart
        fs.writeFileSync(outPath, output, 'utf8');

        require('child_process').exec(restartHaproxyPath, function (err, stdout, stderr) {
          console.log('haproxy started');

          if (err) {
            console.error(err);
          }
          if (stdout) {
            console.error(stdout);
          }
          if (stderr) {
            console.error(stderr);
          }

          res.send({ message: '[fake / test] complete' });
        });
      });
    });
  });

  return app;
};
