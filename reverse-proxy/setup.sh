#!/bin/bash
# Setup Central Reverse Proxy
# Run this ONCE before starting any websites

set -e

echo "==========================================="
echo "Central Reverse Proxy Setup"
echo "==========================================="

# Step 1: Create shared Docker network
echo ""
echo "[1/4] Creating shared Docker network 'web-proxy'..."
docker network create web-proxy 2>/dev/null && echo "Network created!" || echo "Network already exists"

# Step 2: Create certificates directory
echo ""
echo "[2/4] Creating certificates directory..."
mkdir -p ./certs/live/dryfruto.com

# Step 3: Create temporary self-signed certificate
echo ""
echo "[3/4] Creating temporary self-signed SSL certificate..."
if [ ! -f ./certs/live/dryfruto.com/fullchain.pem ]; then
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ./certs/live/dryfruto.com/privkey.pem \
        -out ./certs/live/dryfruto.com/fullchain.pem \
        -subj "/CN=dryfruto.com" 2>/dev/null
    echo "Self-signed certificate created"
else
    echo "Certificate already exists"
fi

# Step 4: Stop any existing nginx on port 80
echo ""
echo "[4/4] Stopping default nginx (if running)..."
sudo systemctl stop nginx 2>/dev/null || true
sudo systemctl disable nginx 2>/dev/null || true

# Step 5: Start reverse proxy
echo ""
echo "[5/5] Starting reverse proxy..."
docker compose up -d

echo ""
echo "==========================================="
echo "✅ Reverse Proxy Started!"
echo "==========================================="
echo ""
echo "Listening on:"
echo "  - Port 80  (HTTP → redirects to HTTPS)"
echo "  - Port 443 (HTTPS)"
echo ""
echo "Next steps:"
echo "  1. Start DryFruto:"
echo "     cd /opt/dryfruto && docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "  2. Get real SSL certificate (after DNS is configured):"
echo "     ./get-ssl.sh dryfruto.com admin@dryfruto.com"
echo ""
