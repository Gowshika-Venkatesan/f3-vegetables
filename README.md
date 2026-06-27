# F3 Vegetables Website

React online ordering website for F3 Vegetables, Anna Nagar, Karur.

## What This Includes

- Fresh local shop landing page using the F3 logo
- Separate React pages for home, products, contact, and admin
- Campaign-style daily offers carousel
- Product search and category filters on the products page
- Add-to-cart ordering flow
- Pickup or delivery checkout form
- WhatsApp order handoff
- `/admin` order dashboard
- Vercel-ready static website

## Run Locally

```bash
npm install
npm run dev
```

## Admin Login

Open:

```text
http://localhost:5173/admin
```

After login, it redirects to:

```text
http://localhost:5173/admin/dashboard
```

Credentials:

```text
Username: f3admin
Password: Fresh@88200
```

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the GitHub repo in Vercel.
3. Choose `Vite` or `React` as the framework preset.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

## Push to a New GitHub Repo

Create a new empty GitHub repository first. Then run:

```bash
cd "C:\Users\GNANADESH\Documents\F3 vegetables"
git init
git add .
git commit -m "Initial F3 Vegetables website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/f3-vegetables.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Future Database Upgrade

For the first live DB version, use Supabase with these tables:

- `products`
- `orders`
- `order_items`

This demo already separates products, cart, and orders in a way that can be connected to Supabase later.
