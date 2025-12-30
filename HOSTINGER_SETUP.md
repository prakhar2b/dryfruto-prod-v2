# DryFruto - Hostinger Docker Manager Setup

## Domain: statellmarketing.com

## Quick Setup Steps

### 1. DNS Configuration in Hostinger

Login to [Hostinger Control Panel](https://hpanel.hostinger.com):

1. Go to **Domains** → **statellmarketing.com**
2. Click **DNS / Nameservers**
3. Add these A records:

| Type | Name | Points To | TTL |
|------|------|-----------|-----|
| A | @ | YOUR_VPS_IP | 14400 |
| A | www | YOUR_VPS_IP | 14400 |

### 2. Deploy via Docker Manager

1. In Hostinger panel, go to **VPS** → **Docker Manager**
2. Click **Create New Project**
3. Connect your GitHub repository
4. Select `docker-compose.yml`
5. Click **Deploy**

### 3. SSL Certificate Setup (First Time)

After initial deployment, SSH into your VPS and run:

```bash
# Create certbot directories
mkdir -p certbot/conf certbot/www

# Get SSL certificate
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email your-email@example.com \
    --agree-tos \
    --no-eff-email \
    -d statellmarketing.com \
    -d www.statellmarketing.com

# Restart nginx to apply SSL
docker-compose restart nginx
```

---

## Access URLs

| URL | Description |
|-----|-------------|
| http://statellmarketing.com | HTTP Access |
| https://statellmarketing.com | HTTPS Access (SSL) |
| https://statellmarketing.com/admin | Admin Panel |
| https://statellmarketing.com/api/health | API Health Check |

---

## Architecture

```
Internet
    │
    ▼
┌─────────────────────────────────┐
│      Nginx (Port 80 & 443)      │
│   statellmarketing.com          │
└───────────────┬─────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐  ┌─────────┐  ┌─────────┐
│Frontend│  │ Backend │  │ MongoDB │
│ :80   │  │  :8001  │  │ :27017  │
│Node 14│  │ FastAPI │  │         │
└───────┘  └─────────┘  └─────────┘
```

---

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild and deploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check SSL certificate
docker-compose run --rm certbot certificates

# Renew SSL certificate
docker-compose run --rm certbot renew
```

---

## Troubleshooting

### SSL Certificate Issues
```bash
# Check if certificate exists
ls -la certbot/conf/live/statellmarketing.com/

# Force certificate renewal
docker-compose run --rm certbot certonly --force-renewal \
    --webroot --webroot-path=/var/www/certbot \
    -d statellmarketing.com -d www.statellmarketing.com
```

### Container Not Starting
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

### Database Issues
```bash
# Access MongoDB shell
docker exec -it dryfruto-mongodb mongosh
```
