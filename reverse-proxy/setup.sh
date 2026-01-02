#!/bin/bash
# Setup script for Central Reverse Proxy

set -e

echo "=========================================="
echo "Central Reverse Proxy Setup"
echo "=========================================="

# Create shared Docker network
echo ""
echo "[1/4] Creating shared Docker network..."
docker network create web-proxy 2>/dev/null || echo "Network 'web-proxy' already exists"

# Create certs directory
echo ""
echo "[2/4] Creating certificates directory..."
mkdir -p ./certs/live/dryfruto.com

# Create self-signed certificate (temporary until Let's Encrypt)
echo ""
echo "[3/4] Creating temporary self-signed certificate..."
if [ ! -f ./certs/live/dryfruto.com/fullchain.pem ]; then
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ./certs/live/dryfruto.com/privkey.pem \
        -out ./certs/live/dryfruto.com/fullchain.pem \
        -subj "/CN=dryfruto.com"
    echo "Self-signed certificate created"
else
    echo "Certificate already exists"
fi

# Start the proxy
echo ""
echo "[4/4] Starting reverse proxy..."
docker compose up -d

echo ""
echo "=========================================="
echo "Reverse Proxy Started!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Start DryFruto: cd ../dryfruto && docker compose -f docker-compose.prod.yml up -d"
echo "2. Get SSL cert:  ./get-ssl.sh dryfruto.com admin@dryfruto.com"
echo ""
