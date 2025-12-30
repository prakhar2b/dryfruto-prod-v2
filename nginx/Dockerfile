# Nginx Dockerfile with SSL certificate generation inside container
FROM nginx:alpine

# Install certbot and its dependencies
RUN apk add --no-cache certbot certbot-nginx openssl bash

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Create directories
RUN mkdir -p /var/www/certbot /etc/letsencrypt /var/log/letsencrypt

# Create SSL generation script
RUN cat > /generate-ssl.sh << 'SCRIPT'
#!/bin/bash

DOMAIN="${DOMAIN:-statellmarketing.com}"
EMAIL="${SSL_EMAIL:-admin@statellmarketing.com}"

SSL_CERT="/etc/letsencrypt/live/$DOMAIN/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/$DOMAIN/privkey.pem"

# Check if certificates already exist
if [ -f "$SSL_CERT" ] && [ -f "$SSL_KEY" ]; then
    echo "SSL certificates already exist, skipping generation"
    exit 0
fi

# If GENERATE_SSL is not set or is false, use self-signed certificates
if [ "$GENERATE_SSL" != "true" ]; then
    echo "GENERATE_SSL not enabled, creating self-signed certificate..."
    mkdir -p /etc/letsencrypt/live/$DOMAIN
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
        -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
        -subj "/CN=$DOMAIN"
    echo "Self-signed certificate created for $DOMAIN"
    exit 0
fi

# Try to get Let's Encrypt certificate
echo "Attempting to generate Let's Encrypt certificate for $DOMAIN..."
certbot certonly --standalone \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --domains "$DOMAIN,www.$DOMAIN" \
    --cert-path /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
    --key-path /etc/letsencrypt/live/$DOMAIN/privkey.pem \
    || {
        echo "Let's Encrypt failed, creating self-signed certificate..."
        mkdir -p /etc/letsencrypt/live/$DOMAIN
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
            -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
            -subj "/CN=$DOMAIN"
        echo "Self-signed certificate created for $DOMAIN"
    }
SCRIPT

RUN chmod +x /generate-ssl.sh

# Create nginx configuration
RUN cat > /etc/nginx/nginx.conf << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    client_max_body_size 50M;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    upstream frontend {
        server frontend:80;
    }

    upstream backend {
        server backend:8001;
    }

    # HTTP Server (Port 80 mapped to 9001)
    server {
        listen 80;
        listen [::]:80;
        server_name statellmarketing.com www.statellmarketing.com localhost;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        location /api/ {
            proxy_pass http://backend/api/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 300s;
        }

        location /uploads/ {
            proxy_pass http://backend/uploads/;
            expires 30d;
            add_header Cache-Control "public";
        }
    }

    # HTTPS Server (Port 443 mapped to 9443)
    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name statellmarketing.com www.statellmarketing.com;

        # SSL Certificates
        ssl_certificate /etc/letsencrypt/live/statellmarketing.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/statellmarketing.com/privkey.pem;

        # SSL Settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:50m;

        # Security Headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        location /api/ {
            proxy_pass http://backend/api/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 300s;
        }

        location /uploads/ {
            proxy_pass http://backend/uploads/;
            expires 30d;
            add_header Cache-Control "public";
        }
    }
}
EOF

# Create entrypoint script
RUN cat > /docker-entrypoint.sh << 'ENTRY'
#!/bin/bash
set -e

# Generate SSL certificates
/generate-ssl.sh

# Start nginx
exec nginx -g 'daemon off;'
ENTRY

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["/docker-entrypoint.sh"]
