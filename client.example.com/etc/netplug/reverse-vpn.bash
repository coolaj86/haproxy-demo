#!/bin/bash

sudo killall ssh
sudo killall openvpn
#sudo killall haproxy
sleep 0.5

sudo killall -9 ssh
sudo killall -9 openvpn
#sudo killall -9 haproxy

ssh shell.example.com -F /etc/ssh/openvpn_tunnel_config -N &
sudo openvpn --config /etc/openvpn/client.conf
