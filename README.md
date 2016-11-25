Daplie is Taking Back the Internet!
--------------

[![](https://daplie.github.com/igg/images/ad-developer-rpi-white-890x275.jpg?v2)](https://daplie.com/preorder/)

Stop serving the empire and join the rebel alliance!

* [Invest in Daplie on Wefunder](https://daplie.com/invest/)
* [Pre-order Cloud](https://daplie.com/preorder/), The World's First Home Server for Everyone

# In Progress

Porting
[Adventures on port 443 with HAProxy, HTTPS, SSH, and OpenVPN](https://coolaj86.com/articles/adventures-in-haproxy-tcp-tls-https-ssh-openvpn/)
to this repository.

# haproxy-demo

All related config and files for a demo of the full power of haproxy including https, SNI, tls, ssh, and openvpn.

## Server

The server is relatively simple and assumes example.com domains.

All necessary certificates for the example.com domains are included.

The server shows how to multiplex and virtual host over multiple protocols all over port 443.

* HTTPS (virtual hosting via SNI)
* SSH on 443 (no virtual hosting)
* SSH over TLS (virtual hosting via SNI)
* OpenSSL over TLS (virtual hosting via SNI via SOCAT)
* OpenSSL over SOCKS5 (virtual hosting via SSH over TLS)

This includes TLS (HTTPS / SSL) certificates, a highly customized config file for haproxy, as well as a fairly normal config file for OpenVPN. 

## Client

The client config includes TLS certificates for the example.com domains, ssh configuration examples, and openvpn client examples.
