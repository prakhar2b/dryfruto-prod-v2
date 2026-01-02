#!/bin/bash
# DryFruto Deployment Script for Hostinger
# This script stops the default nginx and starts DryFruto

set -e

echo "==========================================="
echo "DryFruto Deployment Script"
echo "==========================================="

# Step 1: Stop default Hostinger nginx
echo ""
echo "[1/5] Stopping default nginx..."
sudo systemctl stop nginx 2>/dev/null || echo "nginx service not running"
sudo systemctl disable nginx 2>/dev/null || echo "nginx service not found"

# Step 2: Verify ports are free
echo ""
echo "[2/5] Checking if ports 80 and 443 are free..."
if sudo netstat -tlnp 2>/dev/null | grep -E ':80|:443' | grep -v docker; then
    echo "WARNING: Ports 80 or 443 are still in use!"
    echo "Please stop the services using these ports and try again."
    exit 1
fi
echo "Ports 80 and 443 are free!"

# Step 3: Pull latest images
echo ""
echo "[3/5] Pulling latest Docker images..."
docker compose -f docker-compose.prod.yml pull

# Step 4: Start containers
echo ""
echo "[4/5] Starting DryFruto containers..."
docker compose -f docker-compose.prod.yml up -d

# Step 5: Wait and check health
echo ""
echo "[5/5] Waiting for containers to be healthy..."
sleep 10
docker compose -f docker-compose.prod.yml ps

echo ""
echo "==========================================="
echo "Deployment Complete!"
echo "==========================================="
echo ""
echo "Access your site:"
echo "  http://dryfruto.com  -> Redirects to HTTPS"
echo "  https://dryfruto.com -> Main website"
echo "  https://dryfruto.com/admin -> Admin panel"
echo ""
echo "Note: SSL certificate will be obtained automatically."
echo "If you see SSL warning, wait a few minutes and refresh."
echo ""
echo "Useful commands:"
echo "  docker compose -f docker-compose.prod.yml logs -f nginx"
echo "  docker compose -f docker-compose.prod.yml ps"
echo ""
