#!/bin/bash
# Get Let's Encrypt SSL Certificate
# Usage: ./get-ssl.sh domain.com email@domain.com

DOMAIN="${1:-dryfruto.com}"
EMAIL="${2:-admin@dryfruto.com}"

echo "=========================================="
echo "Getting SSL Certificate for $DOMAIN"
echo "=========================================="

# Check if domain resolves
echo ""
echo "Checking DNS for $DOMAIN..."
IP=$(dig +short $DOMAIN)
if [ -z "$IP" ]; then
    echo "ERROR: $DOMAIN does not resolve to an IP address"
    echo "Please configure DNS first."
    exit 1
fi
echo "Domain resolves to: $IP"

# Run certbot
echo ""
echo "Running certbot..."
docker run --rm \
    -v $(pwd)/certs:/etc/letsencrypt \
    -v $(pwd)/certbot_www:/var/www/certbot \
    --network web-proxy \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Reload nginx
echo ""
echo "Reloading nginx..."
docker exec nginx-proxy nginx -s reload

echo ""
echo "=========================================="
echo "SSL Certificate obtained for $DOMAIN"
echo "=========================================="
