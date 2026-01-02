#!/bin/bash
# DryFruto Deployment Script for Hostinger
# Uses Hostinger's default nginx as reverse proxy

set -e

echo "==========================================="
echo "DryFruto Deployment (Hostinger)"
echo "==========================================="

# Step 1: Copy nginx config
echo ""
echo "[1/5] Setting up Nginx config..."
sudo cp ./hostinger-nginx.conf /etc/nginx/sites-available/dryfruto.com

# Create symlink if not exists
if [ ! -f /etc/nginx/sites-enabled/dryfruto.com ]; then
    sudo ln -s /etc/nginx/sites-available/dryfruto.com /etc/nginx/sites-enabled/
fi

# Step 2: Get SSL certificate
echo ""
echo "[2/5] Getting SSL certificate..."
if [ ! -f /etc/letsencrypt/live/dryfruto.com/fullchain.pem ]; then
    sudo certbot certonly --webroot -w /var/www/html \
        -d dryfruto.com -d www.dryfruto.com \
        --email admin@dryfruto.com --agree-tos --non-interactive
else
    echo "SSL certificate already exists"
fi

# Step 3: Test nginx config
echo ""
echo "[3/5] Testing Nginx config..."
sudo nginx -t

# Step 4: Reload nginx
echo ""
echo "[4/5] Reloading Nginx..."
sudo systemctl reload nginx

# Step 5: Start DryFruto containers
echo ""
echo "[5/5] Starting DryFruto containers..."
docker compose -f docker-compose.prod.yml up -d

# Check status
echo ""
echo "==========================================="
echo "✅ Deployment Complete!"
echo "==========================================="
echo ""
echo "Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""
echo "Access your site:"
echo "  https://dryfruto.com"
echo "  https://dryfruto.com/admin"
echo ""
