'use strict';

module.exports.create = function () {
  var app = require('express')();

  require('child_process').exec("/usr/local/bin/restart-haproxy", function (err, stdout, stderr) {

    console.log('haproxy restarted');
  });

  app.use(function (req, res) {
    var fs = require('fs');
    var ip = req.connection.remoteAddress;
    console.log(ip);

    var conf = fs.readFileSync('/etc/haproxy/tpl.cfg', 'utf8');
    fs.writeFileSync('/etc/haproxy/haproxy.demo.cfg', conf.replace(/{{IP}}/g, ip), 'utf8');

    require('child_process').exec("/usr/local/bin/restart-haproxy", function (err, stdout, stderr) {
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

      res.send('complete');
    });
  });

  return app;
};
