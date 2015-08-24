https://letsencrypt.org/certs/isrgrootx1.pem
https://letsencrypt.org/certs/letsencryptauthorityx1.pem
https://letsencrypt.org/certs/letsencryptauthorityx2.pem

sudo ./venv/bin/letsencrypt --email aj@daplie.com --text --agree-eula --authenticator standalone -d daplie.com -d www.daplie.com auth
