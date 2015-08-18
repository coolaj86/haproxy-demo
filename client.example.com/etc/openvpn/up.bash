#!/bin/bash

echo "$@" > /tmp/ovpn.up.log

# tun0 1500 1508 10.8.0.6 10.8.0.5 init
curl http://10.8.0.1:8080/ -X POST
