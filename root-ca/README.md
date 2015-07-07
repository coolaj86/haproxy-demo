See [Create your own certificate authority (for testing)](https://coolaj86.com/articles/create-your-own-certificate-authority-for-testing/)

```
```

TODO

Did I get chain.pem vs fullchain.pem correct? Or mixed up?

haproxy

cat ~/faux-certs/servers/shell.example.com/cert.pem ~/faux-certs/servers/shell.example.com/privkey.pem > shell.example.com.bundle.pem

NOTE: do NOT include the root ca

sudo mkdir /etc/haproxy/certs/
sudo mv shell.example.com.bundle.pem /etc/haproxy/certs/
