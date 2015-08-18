
```bash
sudo service rsyslog stop; sudo service rsyslog start
sudo haproxy -db -f etc/haproxy/haproxy.cfg
```

```bash
sudo killall haproxy; sudo rm /var/log/haproxy*; sudo service rsyslog restart; sleep 1; echo "starting haproxy"; sudo haproxy -db -f ./haproxy-demo/haproxy.example.com/etc/haproxy/haproxy.cfg
```

```
/dev/log
/var/lib/haproxy/dev/log
/var/log/haproxy.log
```
