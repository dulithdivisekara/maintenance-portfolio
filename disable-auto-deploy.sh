#!/usr/bin/env bash
set -e

ACCOUNT_ID="444da14dbfc897be97036cecf2bce0d5"
PROJECT_NAME="dulith-me"
TOKEN=$(grep 'oauth_token' ~/.config/.wrangler/config/default.toml | cut -d'"' -f2)

if [ -z "$TOKEN" ]; then
  echo "❌ Error: Could not read Wrangler oauth_token from ~/.config/.wrangler/config/default.toml"
  exit 1
fi

echo "⏸️  Disabling automatic production deployments for $PROJECT_NAME..."
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME" \
  -d '{"source": {"config": {"production_deployments_enabled": false}}}' | jq .success

echo "✅ Automatic production deployment paused! Pushes to GitHub will no longer deploy to dulith.me."
