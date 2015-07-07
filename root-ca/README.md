See [Create your own certificate authority (for testing)](https://coolaj86.com/articles/create-your-own-certificate-authority-for-testing/)

```bash
sudo apt-get install --yes tree
```

Create the Root CA
------------------

You may wish to edit the bash script to match your own info,
but since this is just for testing I don't see a great reason to do so.

```bash
bash ./create-root-ca.sh

tree ./certs
```

Create a Server Key and CSR
--------------------


```bash
bash ./create-key-and-csr.sh foo.example.com

tree ./certs
```

Sign the Certificate Request
----------------------

```bash
bash ./sign-csr.sh foo.example.com

tree ./certs
```

Create Bundles
--------------

```bash
bash create-bundles.sh foo.example.com

tree ./certs
```

Notes for HAProxy
----------------

* Do **not** include the Root CA in the bundle
* You may specify each file individually if you like
* You may put cert.pem and privkey.pem in a single server.pem

```bash
sudo ln -s "$(pwd)/certs" /etc/haproxy/certs
```
