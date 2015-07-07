#!/bin/bash

FQDN="$1"


echo "PRIVATE server bundle: certs/servers/${FQDN}/server.pem"
echo "(keep it secret, keep it safe - just like privkey.pem)"
cat \
  "certs/servers/${FQDN}/privkey.pem" \
  "certs/servers/${FQDN}/cert.pem" \
  > "certs/servers/${FQDN}/server.pem"
echo ""
echo ""


echo "chain: certs/servers/${FQDN}/chain.pem"
echo "(contains Intermediates and Root CA in least-authoritative first manner)"
# if there were an intermediate, it would be concatonated before the Root CA
cat \
  "certs/ca/my-root-ca.crt.pem" \
  > "certs/servers/${FQDN}/chain.pem"
echo ""
echo ""


echo "fullchain: certs/servers/${FQDN}/fullchain.pem"
echo "(contains Server CERT, Intermediates and Root CA)"
cat \
  "certs/servers/${FQDN}/cert.pem" \
  "certs/ca/my-root-ca.crt.pem" \
  > "certs/servers/${FQDN}/fullchain.pem"
echo ""
echo ""

echo "All Done"
