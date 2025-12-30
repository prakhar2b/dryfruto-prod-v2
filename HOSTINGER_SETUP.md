# DryFruto - Hostinger Docker Manager Setup

## Domain: statellmarketing.com

## Container Names

| Service | Container Name |
|---------|----------------|
| MongoDB | sm2024db01 |
| Backend API | sm2024api01 |
| Frontend | sm2024web01 |
| Nginx Proxy | sm2024proxy01 |
| Certbot SSL | sm2024ssl01 |

---

## Access URLs

| Protocol | Port | URL |
|----------|------|-----|
| HTTP | 9001 | `http://statellmarketing.com:9001` |
| HTTPS | 9443 | `https://statellmarketing.com:9443` |
| Admin | 9001 | `http://statellmarketing.com:9001/admin` |

---

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

### 3. Test HTTP First

After deployment, test HTTP access:
```
http://statellmarketing.com:9001
```

If HTTP works, proceed to SSL setup.

---

## SSL/HTTPS Configuration (Port 9443)

### Why HTTPS shows error initially?
HTTPS requires SSL certificates. Without certificates, nginx cannot start the HTTPS server, causing connection errors on port 9443.

### Step-by-Step SSL Setup:

#### Step 1: SSH into your Hostinger VPS
```bash
ssh root@YOUR_VPS_IP
```

#### Step 2: Navigate to project directory
```bash
cd /docker/dryfruto-vikram
# OR find your project:
ls /docker/
```

#### Step 3: Create certbot directories
```bash
mkdir -p certbot/conf certbot/www
```

#### Step 4: Get SSL Certificate from Let's Encrypt
```bash
# Stop nginx temporarily (it's blocking port 80 needed for verification)
docker-compose stop nginx

# Run certbot to get certificate
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  -p 80:80 \
  certbot/certbot certonly \
  --standalone \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d statellmarketing.com \
  -d www.statellmarketing.com
```

#### Step 5: Verify certificate was created
```bash
ls certbot/conf/live/statellmarketing.com/
# Should show: fullchain.pem, privkey.pem, cert.pem, chain.pem
```

#### Step 6: Restart nginx with SSL
```bash
docker-compose up -d nginx
```

#### Step 7: Test HTTPS
```
https://statellmarketing.com:9443
```

---

## Alternative SSL Method (Using Webroot)

If standalone method doesn't work:

```bash
# Make sure nginx is running first
docker-compose up -d nginx

# Run certbot with webroot method
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d statellmarketing.com \
  -d www.statellmarketing.com

# Restart nginx
docker-compose restart nginx
```

---

## SSL Certificate Renewal

Certificates expire every 90 days. To renew:

```bash
# Manual renewal
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot renew

# Restart nginx after renewal
docker-compose restart nginx
```

---

## Troubleshooting SSL

### Error: "Connection refused on port 9443"
- SSL certificates not configured yet
- Follow the SSL setup steps above

### Error: "Certificate not found"
```bash
# Check if certificates exist
ls -la certbot/conf/live/statellmarketing.com/

# If empty, run certbot again
```

### Error: "Certificate domain mismatch"
- Make sure DNS is properly configured
- Domain must point to your VPS IP
- Check with: `nslookup statellmarketing.com`

### Error: "Too many certificate requests"
- Let's Encrypt has rate limits (5 per week)
- Wait and try again, or use staging server for testing:
```bash
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  -p 80:80 \
  certbot/certbot certonly \
  --standalone \
  --staging \
  --email your-email@example.com \
  --agree-tos \
  -d statellmarketing.com
```

---

## Architecture

```
Internet
    │
    ├─── Port 9001 (HTTP)
    │
    └─── Port 9443 (HTTPS)
         │
         ▼
┌─────────────────────────────────────┐
│      sm2024proxy01 (Nginx)          │
│   statellmarketing.com              │
└─────────────────┬───────────────────┘
                  │
    ┌─────────────┼───────────────┐
    ▼             ▼               ▼
┌────────┐  ┌──────────┐  ┌───────────┐
│sm2024  │  │ sm2024   │  │ sm2024    │
│web01   │  │ api01    │  │ db01      │
│Frontend│  │ Backend  │  │ MongoDB   │
│ :80    │  │  :8001   │  │ :27017    │
│Node 14 │  │ FastAPI  │  │           │
└────────┘  └──────────┘  └───────────┘
```

---

## Useful Commands

```bash
# View all logs
docker-compose logs -f

# View nginx logs only
docker logs sm2024proxy01

# Restart all services
docker-compose restart

# Rebuild and redeploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check container status
docker ps

# Access MongoDB
docker exec -it sm2024db01 mongosh
```

---

## Firewall Configuration

Make sure these ports are open on your VPS:

```bash
# Check firewall status
ufw status

# Open required ports
ufw allow 9001/tcp   # HTTP
ufw allow 9443/tcp   # HTTPS
ufw allow 22/tcp     # SSH

# Enable firewall
ufw enable
```
