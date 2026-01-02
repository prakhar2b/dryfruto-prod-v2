# DryFruto - Dry Fruits E-Commerce

A full-stack web application for a dry fruits business.

## Tech Stack
- **Frontend:** React
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Deployment:** Docker + Nginx (reverse proxy)

## Local Development

```bash
# Start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down
```

## Production Deployment (Hostinger VPS)

### Prerequisites
- Hostinger VPS with Ubuntu
- Docker & Docker Compose installed
- Domain pointing to VPS IP (e.g., dryfruto.com)

### Step 1: Upload Project to Server
```bash
# On your local machine
scp -r /path/to/dryfruto user@your-server-ip:/home/user/
```

### Step 2: Start Docker Containers
```bash
cd /home/user/dryfruto
docker compose up -d --build
```

This will:
- Build images locally
- Start MongoDB, Backend (port 8001), Frontend (port 3000)
- Ports are bound to localhost only (127.0.0.1)

### Step 3: Configure Hostinger's Nginx

```bash
# Copy nginx config
sudo cp hostinger-nginx.conf /etc/nginx/sites-available/dryfruto.com

# Enable the site
sudo ln -s /etc/nginx/sites-available/dryfruto.com /etc/nginx/sites-enabled/

# Test and reload nginx
sudo nginx -t && sudo systemctl reload nginx
```

### Step 4: Get SSL Certificate
```bash
# Install certbot nginx plugin if needed
sudo apt install python3-certbot-nginx -y

# Get certificate (will also update nginx config for HTTPS)
sudo certbot --nginx -d dryfruto.com -d www.dryfruto.com
```

### Step 5: Verify
Visit https://dryfruto.com - your site should be live!

## Admin Panel
- **URL:** `/admin`
- **Default credentials:** admin / admin123
- **Change password after first login!**

## Useful Commands

```bash
# View running containers
docker ps

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Restart services
docker compose restart

# Rebuild and restart
docker compose up -d --build

# Check what's using a port
sudo lsof -i :80
sudo lsof -i :8001
```

## Project Structure
```
/app
├── backend/          # FastAPI application
├── frontend/         # React application
├── docker-compose.yml
├── hostinger-nginx.conf
└── DOMAIN_SETUP.md   # DNS configuration guide
```
