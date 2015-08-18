#!/bin/bash

sudo killall ssh
sudo killall openvpn
#sudo killall haproxy
sleep 0.5

sudo killall -9 ssh
sudo killall -9 openvpn
#sudo killall -9 haproxy

ssh shell.example.com -i /etc/openvpn/id_rsa -N &
sudo haproxy
sudo openvpn --config /etc/openvpn/client.ovpn
