#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🚀 Deploying Coming Soon maintenance page to dulith.me (production)..."
npx wrangler pages deploy "$DIR" --project-name dulith-me --branch main --commit-message "Update Coming Soon maintenance page"
echo "✅ Deployed! Visit https://dulith.me"
