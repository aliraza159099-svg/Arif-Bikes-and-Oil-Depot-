# How to Put Arif Bikes and Oil Depu Online — Free

Three free options, easiest first. GitHub Pages is recommended — no card
details, no expiry, works forever for a static site like this one.

---

## Option 1: GitHub Pages (recommended)

**Step 1 — Create a GitHub account**
Go to github.com and sign up (free).

**Step 2 — Create a new repository**
1. Click the **+** icon (top right) → **New repository**.
2. Name it something like `arif-bikes-oil-depot`.
3. Set it to **Public**.
4. Click **Create repository**.

**Step 3 — Upload your website files**
1. On the new repo page, click **"uploading an existing file"**.
2. Select or drag in every file (`index.html`, `style.css`, `script.js`,
   `bikes.json`, etc.) — they all sit loose, with no subfolders, so this
   works fine even from a phone browser, where drag-and-drop can't
   preserve folder structure anyway.
3. Scroll down, click **Commit changes**.

**Step 4 — Turn on Pages**
1. In the repo, go to **Settings → Pages** (left sidebar).
2. Under "Build and deployment", set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/ (root)`. Click **Save**.

**Step 5 — Get your link**
Wait 1–2 minutes, refresh the same Settings → Pages screen. A green box
shows your live link, something like:

```
https://yourusername.github.io/arif-bikes-oil-depot/
```

Share this link — it's permanent and free. Any time you upload a changed
file to the repo, the live site updates automatically in a minute or two.

---

## Option 2: Netlify (drag-and-drop, even simpler)

1. Go to netlify.com → sign up free.
2. On the dashboard, find the **"Drag and drop your site folder here"** box.
3. Drag your whole `arif-bikes-oil-depot` folder onto it.
4. Netlify gives you a live link instantly (e.g. `random-name.netlify.app`).
5. You can rename it for free: **Site settings → Change site name**.

Good option if you don't want to deal with GitHub at all. Downside: to
update the site later, you re-drag the whole folder each time (unless you
connect it to GitHub later).

---

## Option 3: Cloudflare Pages

Same idea as Netlify — sign up at pages.cloudflare.com, connect a GitHub
repo (same as Option 1) or upload directly, get a free `*.pages.dev` link.
Slightly faster loading in Pakistan since Cloudflare has servers closer by.

---

## Optional: Use your own domain name (not free, but cheap)

If you later want something like `arifbikes.com` instead of a
`github.io` link:

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc. — usually
   $8–12/year).
2. In your domain's DNS settings, point it to GitHub Pages / Netlify /
   Cloudflare (each has a short "custom domain" guide in their settings —
   look for **Settings → Custom domain** in whichever you used).
3. The free hosting itself doesn't change — you're just renaming the
   address.

---

## Recommended path for you

Since you're already comfortable with VS Code: use **Option 1 (GitHub
Pages)**. It's free forever, gives you version history of every change,
and sets you up to use GitHub for future projects too — worth learning
either way.
