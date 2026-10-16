#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🚀 Deploying maintenance page..."

# 1. Deploy to primary live portfolio site (dulith.me)
npx wrangler pages deploy "$DIR" --project-name dulith-me --branch main --commit-message "Update Coming Soon maintenance page"
echo "✅ Deployed to dulith.me! Visit https://dulith.me"

# 2. Deploy to standalone maintenance-portfolio project
npx wrangler pages deploy "$DIR" --project-name maintenance-portfolio --branch main --commit-message "Update maintenance-portfolio"
echo "✅ Deployed to maintenance-portfolio! Visit https://maintenance-portfolio-44x.pages.dev"
