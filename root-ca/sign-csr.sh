#!/bin/bash

FQDN="$1"

# Sign the request from Server with your Root CA
if [ -f "certs/ca/my-root-ca.srl" ]; then
openssl x509 \
  -req -in certs/tmp/${FQDN}.csr.pem \
  -CA certs/ca/my-root-ca.crt.pem \
  -CAkey certs/ca/my-root-ca.key.pem \
  -CAserial certs/ca/my-root-ca.srl \
  -out certs/servers/${FQDN}/cert.pem \
  -days 9131
else
openssl x509 \
  -req -in certs/tmp/${FQDN}.csr.pem \
  -CA certs/ca/my-root-ca.crt.pem \
  -CAkey certs/ca/my-root-ca.key.pem \
  -CAcreateserial \
  -out certs/servers/${FQDN}/cert.pem \
  -days 9131
fi

# If you already have a serial file, you would use that (in place of CAcreateserial)
# -CAcreateserial \
# otherwise you would use this
# -CAserial certs/ca/my-root-ca.srl \
