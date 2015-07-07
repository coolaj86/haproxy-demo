#!/bin/bash

# Change to be whatever
FQDN="$1"

# make directories to work from
mkdir -p certs/{servers,tmp}

# Create Certificate for this domain,
mkdir -p "certs/servers/${FQDN}"
openssl genrsa \
  -out "certs/servers/${FQDN}/privkey.pem" \
  2048

# Create the CSR
openssl req -new \
  -key "certs/servers/${FQDN}/privkey.pem" \
  -out "certs/tmp/${FQDN}.csr.pem" \
  -subj "/C=US/ST=Utah/L=Provo/O=ACME Service/CN=${FQDN}"
