#!/usr/bin/env bash
set -euo pipefail

#--- configuration -----------------------------------------------------
REPO_URL="git@github.com:your-org/vyarna-nucleus.git"
WORKDIR="$HOME/vyarna-nucleus"
# paths to write certificate and env file from env vars
CERT_PATH="$WORKDIR/isrgrootx1.pem"
ENV_PROD_PATH="$WORKDIR/global.env.production"
CPANEL_USER="${CPANEL_USER:-}"
CPANEL_HOST="${CPANEL_HOST:-}"
CPANEL_TARGET="/home/$CPANEL_USER/public_html"
#----------------------------------------------------------------------

# 1. Clone or update repository
if [ ! -d "$WORKDIR/.git" ]; then
  git clone "$REPO_URL" "$WORKDIR"
else
  git -C "$WORKDIR" pull
fi
cd "$WORKDIR"

# 2. Write secrets from environment variables
if [ -n "${ISRGROOTX1_PEM:-}" ]; then
  printf '%s' "$ISRGROOTX1_PEM" > "$CERT_PATH"
fi
if [ -n "${GLOBAL_ENV_PRODUCTION:-}" ]; then
  printf '%s' "$GLOBAL_ENV_PRODUCTION" > "$ENV_PROD_PATH"
fi

# 3. Prepare workspaces using repo.js
cp global.env.local-example global.env.local
node repo.js fill-env
node repo.js install
node repo.js update-libs
node repo.js update-migrations

# 4. Build Docker images
docker compose build

# 5. Create .htaccess for cPanel (example)
cat > .htaccess <<'HTEOF'
Options +FollowSymLinks -Indexes
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
HTEOF

# 6. Upload build artifacts to cPanel via SCP
scp -r .htaccess docker-compose.yml \
  "$CPANEL_USER@$CPANEL_HOST:$CPANEL_TARGET/"

echo "Deployment complete."
