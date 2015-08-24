'use strict';

var fs = require('fs');
var Mustache = require('mustache');
var tplPath = '/etc/haproxy/tpl.cfg';
//var outPath = '/etc/haproxy/out.cfg';
var outPath = '/tmp/out.cfg';

var tpl = fs.readFileSync(tplPath, 'utf8');

var view = {
  devices: [
    { device: 'aj'
    , ip: '10.8.0.6'
    }
  , { device: 'bryson'
    , ip: '10.8.0.8'
    }
  ]
, domains: [
    { domain: 'aj.daplie.com'
    , device: 'aj'
    }
  , { domain: 'www.aj.daplie.com'
    , device: 'aj'
    }
  , { domain: 'bryson.daplie.com'
    , device: 'bryson'
    }
  , { domain: 'www.bryson.daplie.com'
    , device: 'bryson'
    }
  ]
};

var output = Mustache.render(tpl, view);

fs.writeFileSync(outPath, output, 'utf8');
