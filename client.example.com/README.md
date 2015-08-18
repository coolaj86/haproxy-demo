```bash
echo '#!/bin/bash' > ./up.bash
echo 'echo "$@" > /tmp/ovpn.up.log' >> ./up.bash
chmod a+x up.bash

echo "#!/bin/bash" > ./down.bash
echo 'echo "$@" > /tmp/ovpn.down.log' >> ./down.bash
chmod a+x down.bash
```

* script must be executable
* script must have `#!/path/to/interpreter`

Arguments are as follows

```
cmd tun_dev tun_mtu link_mtu ifconfig_local_ip ifconfig_remote_ip [ init | restart ]
```

`openvpn --config /etc/openvpn/client.cfg`

`/etc/openvpn/client.cfg`:
```
up /etc/openvpn/scripts/up.bash
down /etc/openvpn/scripts/up.bash
up-restart
ping-restart 10
```

`openvpn --config /etc/openvpn/client.cfg --up-restart --up /path/to/script.bash --down /path/to/script.bash`

<http://superuser.com/questions/332968/how-to-configure-eth0-to-retry-dhclient-when-unplugged-and-replugged>

```
sudo apt-get install --yes netplug
```

```
ssh -F /etc/ssh/client-config -N
```
