# Multi-Site Deployment Guide

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                             │
│                                                             │
│   dryfruto.com          site2.com          site3.com       │
│        │                    │                   │           │
│        └────────────────────┼───────────────────┘           │
│                             │                               │
│                             ▼                               │
│              ┌─────────────────────────────┐                │
│              │    NGINX REVERSE PROXY      │                │
│              │      Ports 80 & 443         │                │
│              │   (nginx-proxy container)   │                │
│              └─────────────────────────────┘                │
│                      │         │                            │
│           ┌─────────┘         └─────────┐                   │
│           ▼                             ▼                   │
│   ┌───────────────┐             ┌───────────────┐          │
│   │   DryFruto    │             │    Site 2     │          │
│   │  - frontend   │             │  - frontend   │          │
│   │  - backend    │             │  - backend    │          │
│   │  - mongodb    │             │  - database   │          │
│   └───────────────┘             └───────────────┘          │
│                                                             │
│              All on shared 'web-proxy' network              │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
/opt/
├── reverse-proxy/           # Central reverse proxy
│   ├── docker-compose.yml
│   ├── nginx.conf
│   ├── setup.sh
│   ├── get-ssl.sh
│   └── certs/               # SSL certificates
│       └── live/
│           ├── dryfruto.com/
│           ├── site2.com/
│           └── site3.com/
│
├── dryfruto/                # DryFruto application
│   └── docker-compose.prod.yml
│
├── site2/                   # Another website
│   └── docker-compose.yml
│
└── site3/                   # Another website
    └── docker-compose.yml
```

---

## Initial Setup (One Time)

### Step 1: Create Shared Network
```bash
docker network create web-proxy
```

### Step 2: Setup Reverse Proxy
```bash
cd /opt/reverse-proxy
chmod +x setup.sh get-ssl.sh
./setup.sh
```

### Step 3: Start DryFruto
```bash
cd /opt/dryfruto
docker compose -f docker-compose.prod.yml up -d
```

### Step 4: Get SSL Certificate
```bash
cd /opt/reverse-proxy
./get-ssl.sh dryfruto.com admin@dryfruto.com
```

---

## Adding a New Website

### Step 1: Add DNS Record
Point the new domain to your server IP in your domain registrar.

### Step 2: Add Site Config to nginx.conf

Edit `/opt/reverse-proxy/nginx.conf` and add:

```nginx
# ============================================================
# NEWSITE.COM
# ============================================================

server {
    listen 80;
    listen [::]:80;
    server_name newsite.com www.newsite.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        allow all;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name newsite.com www.newsite.com;

    ssl_certificate /etc/letsencrypt/live/newsite.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/newsite.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://newsite-frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Add /api/ location if needed
}
```

### Step 3: Create Site's docker-compose.yml

```yaml
# /opt/newsite/docker-compose.yml
services:
  frontend:
    image: your-image:latest
    container_name: newsite-frontend
    restart: unless-stopped
    networks:
      - web-proxy

networks:
  web-proxy:
    external: true
```

### Step 4: Start the New Site
```bash
cd /opt/newsite
docker compose up -d
```

### Step 5: Get SSL Certificate
```bash
cd /opt/reverse-proxy
./get-ssl.sh newsite.com admin@newsite.com
```

### Step 6: Reload Nginx
```bash
docker exec nginx-proxy nginx -s reload
```

---

## Useful Commands

```bash
# View all running containers
docker ps

# View proxy logs
docker logs nginx-proxy -f

# Reload nginx config (after editing nginx.conf)
docker exec nginx-proxy nginx -t          # Test config
docker exec nginx-proxy nginx -s reload   # Reload

# Restart everything
cd /opt/reverse-proxy && docker compose restart
cd /opt/dryfruto && docker compose -f docker-compose.prod.yml restart

# View network connections
docker network inspect web-proxy

# Renew all SSL certificates
docker run --rm -v /opt/reverse-proxy/certs:/etc/letsencrypt certbot/certbot renew
docker exec nginx-proxy nginx -s reload
```

---

## DNS Configuration

All domains point to the SAME server IP:

| Domain | Type | Name | Value |
|--------|------|------|-------|
| dryfruto.com | A | @ | YOUR_SERVER_IP |
| dryfruto.com | A | www | YOUR_SERVER_IP |
| site2.com | A | @ | YOUR_SERVER_IP |
| site2.com | A | www | YOUR_SERVER_IP |
| site3.com | A | @ | YOUR_SERVER_IP |
| site3.com | A | www | YOUR_SERVER_IP |

---

## Troubleshooting

### SSL Certificate Error
```bash
# Check if domain resolves
dig dryfruto.com +short

# Manually get certificate
cd /opt/reverse-proxy
./get-ssl.sh dryfruto.com admin@dryfruto.com
```

### Container Not Accessible
```bash
# Check if container is on web-proxy network
docker network inspect web-proxy | grep -A5 "Containers"

# Check container is running
docker ps | grep dryfruto
```

### 502 Bad Gateway
```bash
# Check if backend container is healthy
docker ps | grep dryfruto-backend
docker logs dryfruto-backend

# Check nginx can reach backend
docker exec nginx-proxy curl http://dryfruto-backend:8001/api/health
```
