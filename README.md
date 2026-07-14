# Arif Bikes and Oil Depu — Website

A simple 4-page site: Home, Bikes, Fuel, Contact. Plain HTML/CSS/JS —
no installs, no build step, nothing to compile.

## 1. Open and preview

1. Open the whole `arif-bikes-oil-depot` folder in VS Code (`File > Open Folder`).
2. Install the free **"Live Server"** extension in VS Code (Extensions icon on
   the left sidebar → search "Live Server" → Install).
3. Right-click `index.html` → **"Open with Live Server"**.
4. Your browser opens the site, and it auto-refreshes every time you save a file.

## 2. Add / remove bikes

**Easiest — use the admin panel:** open `admin.html` on your live site
(or via Live Server) and add or remove bikes with a form, including photo
upload. Full walkthrough in `ADMIN_GUIDE.md` — you'll need a free GitHub
token, explained there.

**Manual option:** bike details live in `bikes.json`. Upload a photo to
the repo root (same place as the other files), then add a matching entry
to the JSON file:

```json
{ "name": "Honda CD 70", "cc": "70cc", "price": "Rs. 1,35,000", "image": "honda-cd70.jpg" }
```

Add as many entries as you like — 20, 30, more. If a photo is missing, a
placeholder picture shows automatically — nothing breaks.

## 3. Update fuel prices

Open `fuel.html`, find these two lines, and edit the numbers:

```html
<div class="price" id="petrol-price">Rs. 272.50</div>
<div class="price" id="diesel-price">Rs. 278.00</div>
```

Also update the "Last updated" date just below.

## 4. Fix the map

Go to Google Maps, search for the shop's exact location, click **Share →
Embed a map**, copy the link inside `src="..."`, and paste it into the
`src` of the `<iframe>` in `contact.html`.

## 5. Put it online (free)

Easiest free option — **GitHub Pages**:

1. Create a free GitHub account and a new repository.
2. Upload this whole folder to it.
3. In the repo, go to **Settings → Pages**, set the source to the `main`
   branch, save.
4. GitHub gives you a free live link (e.g. `yourname.github.io/arif-bikes`)
   in a minute or two.

(Netlify and Vercel also offer free hosting if you'd rather drag-and-drop
the folder instead of using GitHub.)

## Folder structure

```
(all files sit flat in the repo root — no subfolders, since GitHub's
mobile uploader doesn't preserve folder structure)

index.html          Home page
bikes.html           Bike catalog (reads bikes.json)
fuel.html             Fuel prices (edit numbers directly)
contact.html          Contact + map
admin.html            Add/remove bikes with photo upload — see ADMIN_GUIDE.md
style.css              All styling — one file, well commented
script.js               Shared nav + scroll-reveal behaviour
bikes-data.js           Renders bikes.html from bikes.json
admin.js                Admin panel logic (GitHub API calls)
bikes.json               <-- bike inventory lives here
placeholder-bike.svg     shown automatically if a bike photo is missing
ADMIN_GUIDE.md           How to use admin.html + create a GitHub token
DEPLOY.md                How to publish the site free
```
