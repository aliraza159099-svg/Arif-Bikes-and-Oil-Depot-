# Admin Panel Guide

`admin.html` lets you add a new bike (with photo) or remove a sold one,
straight from your phone or laptop browser — no VS Code, no editing code.

**Important — please read this once:** the username/password login on
`admin.html` is only a front-door screen. This is a plain static website —
its code is visible to anyone, so a password typed into it can't be true
security. The part that actually protects your bike list is the **GitHub
token** described below, because only you can create one, and it can be
turned off any time. Don't rely on the login screen alone; don't share the
token with anyone.

---

## 1. One-time setup: create a GitHub token

1. Log into github.com.
2. Click your profile picture (top right) → **Settings**.
3. Scroll to the bottom → **Developer settings**.
4. **Personal access tokens → Fine-grained tokens → Generate new token**.
5. Fill in:
   - **Token name**: `arif-bikes-admin`
   - **Expiration**: 90 days is a good default (you'll just generate a new
     one when it expires — takes a minute).
   - **Repository access**: "Only select repositories" → choose your
     `arif-bikes-oil-depot` repo.
   - **Permissions** → **Repository permissions** → find **Contents** →
     set to **Read and write**.
6. Click **Generate token**.
7. **Copy the token immediately** (starts with `github_pat_...`) — GitHub
   only shows it once. Paste it somewhere safe temporarily (like a Notes
   app) until you use it.

You'll paste this token into the admin page each time you use it. It is
not saved anywhere automatically, so it stays private even if someone
else opens your browser later.

---

## 2. Open the admin panel

Go to (replace with your actual GitHub username and repo name):

```
https://yourusername.github.io/your-repo-name/admin.html
```

For example, if your repo is `Bikes-ad-Oil-Depot`, the address is
`https://yourusername.github.io/Bikes-ad-Oil-Depot/admin.html`.

Log in with:
- **Username:** `arifbalghari`
- **Password:** `arif99+88@`

---

## 3. First-time settings (only needed once per device)

Open **⚙️ GitHub Settings**, fill in:
- **GitHub Username** — your GitHub account name
- **Repository Name** — `arif-bikes-oil-depot` (already filled in)
- **Branch** — `main` (already filled in)
- **GitHub Token** — paste the token you created in Step 1

Click **Save Settings** — this remembers your username/repo/branch on this
device (never the token, for safety). You'll paste the token again each
visit.

---

## 4. Add a new bike

1. Fill in **Bike Name**, **Engine (cc)**, **Price**.
2. Choose a photo from your phone/computer.
3. Click **➕ Add Bike**.

Give it about a minute — the photo and updated bike list get saved to
GitHub, and the live site rebuilds automatically. Refresh `bikes.html` on
the live site to see it.

## 5. Remove a sold bike

In the **Current Bikes** list, click **Remove** next to the bike, confirm.
Same one-minute wait for it to disappear from the live site.

---

## Troubleshooting

- **"GitHub responded with 401/403"** — your token is missing, expired,
  or doesn't have Contents: Read & Write permission. Generate a new one
  (Step 1).
- **"GitHub responded with 404"** — check the username/repo spelling in
  Settings matches your actual GitHub repo exactly.
- **Bike list doesn't update on the live site** — wait 1–2 minutes;
  GitHub Pages takes a short moment to rebuild after each change.
- **Forgot to save the token and it's gone** — no problem, just generate
  a new one (Step 1) any time; old ones can be revoked from the same
  Developer settings page.
