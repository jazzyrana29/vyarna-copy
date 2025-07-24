#!/usr/bin/env bash
set -euo pipefail

#--- configuration -----------------------------------------------------
REPO_URL="git@github.com:your-org/vyarna-nucleus.git"
WORKDIR="$HOME/vyarna-nucleus"
# optional: repo containing prod secrets (env files, certs)
CONFIG_REPO_URL="git@github.com:your-org/private-env.git"
CERT_PATH="$WORKDIR/isrgrootx1.pem"
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

# 2. Fetch private configs (if provided)
if [ -n "$CONFIG_REPO_URL" ]; then
  if [ ! -d "$WORKDIR/private-env/.git" ]; then
    git clone "$CONFIG_REPO_URL" "$WORKDIR/private-env"
  else
    git -C "$WORKDIR/private-env" pull
  fi

  # copy certificate and any env files
  if [ -f "$WORKDIR/private-env/isrgrootx1.pem" ]; then
    cp "$WORKDIR/private-env/isrgrootx1.pem" "$CERT_PATH"
  fi
  if [ -f "$WORKDIR/private-env/global.env.production" ]; then
    cp "$WORKDIR/private-env/global.env.production" ./global.env.production
  fi
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
