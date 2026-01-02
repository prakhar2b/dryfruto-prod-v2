#!/bin/bash
# Get Let's Encrypt SSL Certificate for a domain
# Usage: ./get-ssl.sh domain.com email@domain.com

DOMAIN="${1:-dryfruto.com}"
EMAIL="${2:-admin@dryfruto.com}"

echo "==========================================="
echo "Getting SSL Certificate for $DOMAIN"
echo "==========================================="

# Check if domain resolves
echo ""
echo "Checking DNS for $DOMAIN..."
IP=$(dig +short $DOMAIN 2>/dev/null)
if [ -z "$IP" ]; then
    echo "⚠️  WARNING: $DOMAIN does not resolve to an IP address"
    echo "   Make sure DNS is configured before getting SSL certificate."
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Domain resolves to: $IP"
fi

# Create cert directory
mkdir -p ./certs/live/$DOMAIN

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
    --force-renewal \
    -d $DOMAIN \
    -d www.$DOMAIN

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSL Certificate obtained successfully!"
    
    # Reload nginx
    echo "Reloading nginx..."
    docker exec nginx-proxy nginx -s reload
    
    echo ""
    echo "==========================================="
    echo "✅ Done! $DOMAIN is now secured with HTTPS"
    echo "==========================================="
else
    echo ""
    echo "❌ Failed to obtain certificate"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Make sure $DOMAIN points to this server's IP"
    echo "  2. Make sure ports 80 and 443 are open"
    echo "  3. Check nginx logs: docker logs nginx-proxy"
fi
