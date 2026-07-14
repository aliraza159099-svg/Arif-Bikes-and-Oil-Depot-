/* =========================================================
   ADMIN PANEL LOGIC
   -----------------------------------------------------------
   Talks directly to GitHub's REST API from the browser using
   a Personal Access Token you paste in. No separate server is
   needed — GitHub IS the server here.

   The login screen (username/password) is just a front-door
   screen, not real protection — see the note on that screen
   and in ADMIN_GUIDE.md. The GitHub token is what actually
   protects your data, because only you can create one.
   ========================================================= */

const ADMIN_USER = "arifbalghari";
const ADMIN_PASS = "arif99+88@";

const DATA_PATH = "bikes.json";
const IMAGES_DIR = "";

// ---------- Login gate ----------
document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("login-screen");
  const adminPanel = document.getElementById("admin-panel");

  if (sessionStorage.getItem("adminOk") === "1") {
    loginScreen.style.display = "none";
    adminPanel.style.display = "block";
    initAdmin();
  }

  document.getElementById("login-btn").addEventListener("click", () => {
    const user = document.getElementById("login-user").value.trim();
    const pass = document.getElementById("login-pass").value;
    const errorEl = document.getElementById("login-error");

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("adminOk", "1");
      loginScreen.style.display = "none";
      adminPanel.style.display = "block";
      initAdmin();
    } else {
      errorEl.textContent = "Incorrect username or password.";
      errorEl.classList.add("show");
    }
  });
});

// ---------- Admin panel ----------
let currentSha = null; // sha of bikes.json, needed to update it
let currentBikes = [];

function initAdmin() {
  // Load saved settings (not the token — that's never auto-saved)
  document.getElementById("gh-owner").value = localStorage.getItem("admin_owner") || "";
  document.getElementById("gh-repo").value = localStorage.getItem("admin_repo") || "arif-bikes-oil-depot";
  document.getElementById("gh-branch").value = localStorage.getItem("admin_branch") || "main";

  document.getElementById("save-settings-btn").addEventListener("click", () => {
    localStorage.setItem("admin_owner", document.getElementById("gh-owner").value.trim());
    localStorage.setItem("admin_repo", document.getElementById("gh-repo").value.trim());
    localStorage.setItem("admin_branch", document.getElementById("gh-branch").value.trim());
    showListStatus("Settings saved on this device.", "success");
  });

  document.getElementById("refresh-btn").addEventListener("click", loadBikes);
  document.getElementById("add-btn").addEventListener("click", addBike);

  loadBikes();
}

function getSettings() {
  return {
    owner: document.getElementById("gh-owner").value.trim(),
    repo: document.getElementById("gh-repo").value.trim(),
    branch: document.getElementById("gh-branch").value.trim() || "main",
    token: document.getElementById("gh-token").value.trim(),
  };
}

function apiUrl(path, { owner, repo }) {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

function authHeaders(token) {
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

// UTF-8 safe base64 helpers (bike names may include Urdu text)
function b64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function b64Decode(str) {
  return decodeURIComponent(escape(atob(str)));
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "bike";
}

function showListStatus(msg, type) {
  const el = document.getElementById("list-status");
  el.textContent = msg;
  el.className = `status-msg show ${type}`;
}
function showAddStatus(msg, type) {
  const el = document.getElementById("add-status");
  el.textContent = msg;
  el.className = `status-msg show ${type}`;
}

// ---------- Load current bike list (read-only, works without a token on public repos) ----------
async function loadBikes() {
  const settings = getSettings();
  if (!settings.owner || !settings.repo) {
    showListStatus("Fill in your GitHub username and repo name above first.", "error");
    return;
  }
  showListStatus("Loading current bikes…", "info");

  try {
    const res = await fetch(`${apiUrl(DATA_PATH, settings)}?ref=${settings.branch}`, {
      headers: authHeaders(settings.token),
    });
    if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
    const data = await res.json();
    currentSha = data.sha;
    currentBikes = JSON.parse(b64Decode(data.content));
    renderBikeList();
    showListStatus(`Loaded ${currentBikes.length} bike(s).`, "success");
  } catch (err) {
    showListStatus(`Couldn't load the bike list: ${err.message}`, "error");
  }
}

function renderBikeList() {
  const container = document.getElementById("bike-list");
  if (!currentBikes.length) {
    container.innerHTML = `<p style="font-family:var(--font-mono); color:var(--chrome);">No bikes listed.</p>`;
    return;
  }
  container.innerHTML = currentBikes
    .map(
      (bike, i) => `
      <div class="bike-row">
        <img src="${bike.image}" onerror="this.onerror=null;this.src='placeholder-bike.svg';" />
        <div class="info">
          <div class="name">${bike.name}</div>
          <div class="meta">${bike.cc} · ${bike.price}</div>
        </div>
        <button class="remove-btn" data-index="${i}">Remove</button>
      </div>`
    )
    .join("");

  container.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => removeBike(Number(btn.dataset.index)));
  });
}

// ---------- Add a bike (requires a token with write access) ----------
async function addBike() {
  const settings = getSettings();
  if (!settings.token) {
    showAddStatus("Paste your GitHub token above first — needed to save changes.", "error");
    return;
  }
  const name = document.getElementById("new-name").value.trim();
  const cc = document.getElementById("new-cc").value.trim();
  const price = document.getElementById("new-price").value.trim();
  const fileInput = document.getElementById("new-image");
  const file = fileInput.files[0];

  if (!name || !cc || !price) {
    showAddStatus("Please fill in name, cc, and price.", "error");
    return;
  }

  showAddStatus("Saving…", "info");
  document.getElementById("add-btn").disabled = true;

  try {
    let imagePath = "placeholder-bike.svg";

    if (file) {
      const ext = file.name.split(".").pop().toLowerCase();
      imagePath = `${slugify(name)}-${Date.now()}.${ext}`;
      const base64 = await fileToBase64(file);

      const uploadRes = await fetch(apiUrl(imagePath, settings), {
        method: "PUT",
        headers: { ...authHeaders(settings.token), "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Add photo for ${name}`,
          content: base64,
          branch: settings.branch,
        }),
      });
      if (!uploadRes.ok) throw new Error(`Photo upload failed (${uploadRes.status})`);
    }

    // Re-fetch the latest bikes.json right before writing, to avoid overwriting
    // someone else's very recent change with a stale copy.
    const freshRes = await fetch(`${apiUrl(DATA_PATH, settings)}?ref=${settings.branch}`, {
      headers: authHeaders(settings.token),
    });
    if (!freshRes.ok) throw new Error(`Couldn't re-check bike list (${freshRes.status})`);
    const freshData = await freshRes.json();
    const freshBikes = JSON.parse(b64Decode(freshData.content));

    freshBikes.push({ name, cc, price, image: imagePath });

    const putRes = await fetch(apiUrl(DATA_PATH, settings), {
      method: "PUT",
      headers: { ...authHeaders(settings.token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Add bike: ${name}`,
        content: b64Encode(JSON.stringify(freshBikes, null, 2)),
        sha: freshData.sha,
        branch: settings.branch,
      }),
    });
    if (!putRes.ok) throw new Error(`Saving bike list failed (${putRes.status})`);

    showAddStatus(`"${name}" added! It'll appear on the live site in about a minute.`, "success");
    document.getElementById("new-name").value = "";
    document.getElementById("new-cc").value = "";
    document.getElementById("new-price").value = "";
    fileInput.value = "";
    loadBikes();
  } catch (err) {
    showAddStatus(`Something went wrong: ${err.message}`, "error");
  } finally {
    document.getElementById("add-btn").disabled = false;
  }
}

// ---------- Remove a bike ----------
async function removeBike(index) {
  const settings = getSettings();
  if (!settings.token) {
    showListStatus("Paste your GitHub token above first — needed to save changes.", "error");
    return;
  }
  const bike = currentBikes[index];
  if (!confirm(`Remove "${bike.name}" from the site?`)) return;

  showListStatus(`Removing ${bike.name}…`, "info");

  try {
    // Re-fetch latest before writing, same reason as addBike()
    const freshRes = await fetch(`${apiUrl(DATA_PATH, settings)}?ref=${settings.branch}`, {
      headers: authHeaders(settings.token),
    });
    if (!freshRes.ok) throw new Error(`Couldn't re-check bike list (${freshRes.status})`);
    const freshData = await freshRes.json();
    const freshBikes = JSON.parse(b64Decode(freshData.content));

    const updated = freshBikes.filter((b) => !(b.name === bike.name && b.image === bike.image));

    const putRes = await fetch(apiUrl(DATA_PATH, settings), {
      method: "PUT",
      headers: { ...authHeaders(settings.token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Remove bike: ${bike.name}`,
        content: b64Encode(JSON.stringify(updated, null, 2)),
        sha: freshData.sha,
        branch: settings.branch,
      }),
    });
    if (!putRes.ok) throw new Error(`Saving bike list failed (${putRes.status})`);

    showListStatus(`"${bike.name}" removed.`, "success");
    loadBikes();
  } catch (err) {
    showListStatus(`Something went wrong: ${err.message}`, "error");
  }
     }
