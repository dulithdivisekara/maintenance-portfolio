# Maintenance / Coming Soon Webpage for dulith.me

This directory contains the customized Coming Soon / Maintenance page for [dulith.me](https://dulith.me).

## 🚀 Deployed Status
- **Live URL**: [https://dulith.me](https://dulith.me) (and [https://dulith-me.pages.dev](https://dulith-me.pages.dev))
- **Automatic GitHub Deploys for Production**: **Paused / Disabled**
  - Commits & pushes to `dulithdivisekara/dulith.me` will **not** overwrite the live Coming Soon page on `dulith.me`.

---

## 🛠️ Management Scripts

### 1. Deploy / Update the Coming Soon Page
```bash
./deploy.sh
```
Uses Wrangler to deploy this directory straight to the `dulith-me` Cloudflare Pages project.

### 2. Pause Automatic Production Deploys
```bash
./disable-auto-deploy.sh
```
Disables Cloudflare Pages automatic builds on GitHub pushes to the production branch.

### 3. Re-enable Automatic Production Deploys (When Portfolio is Ready)
```bash
./enable-auto-deploy.sh
```
Turns automatic GitHub deployments back on so pushing to `main` in `dulith.me` goes live immediately.

---

## 🎨 Customizing the Coming Soon Page

- **HTML & Content**: [`index.html`](file:///home/dulith/Projects/maintainance_portfolio/index.html)
  - Change launch date / duration in the `data-days="14"` or `data-hour="9"` attributes.
  - Links: GitHub, LinkedIn, contact email, Terminal CV (`curl whoami.dulith.me`).
- **Styling**: [`css/style.css`](file:///home/dulith/Projects/maintainance_portfolio/css/style.css)
- **Countdown & Signup**: [`js/snippet.js`](file:///home/dulith/Projects/maintainance_portfolio/js/snippet.js)
  - Subscribed emails are automatically stored in the browser's `localStorage` (`dulith_notif_subscribers`).
