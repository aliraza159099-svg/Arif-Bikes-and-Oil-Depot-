/* =========================================================
   BIKES RENDERER
   -----------------------------------------------------------
   Bike details now live in bikes.json instead of this
   file. This script just fetches that JSON and draws the
   cards on bikes.html.

   You normally won't need to touch this file at all — use
   admin.html to add/remove bikes, or edit bikes.json
   directly on GitHub if you prefer.
   ========================================================= */

async function renderBikes() {
  const grid = document.getElementById("bike-grid");
  if (!grid) return;

  let bikes = [];
  try {
    const res = await fetch("bikes.json", { cache: "no-store" });
    bikes = await res.json();
  } catch (err) {
    grid.innerHTML = `<p style="font-family:var(--font-mono); color:var(--chrome);">
      Couldn't load the bike list right now. If you're viewing this file directly
      (double-clicked, not via Live Server or a live website), that's why — browsers
      block local file loading for security. Use Live Server in VS Code, or view the
      live site.
    </p>`;
    return;
  }

  if (!bikes.length) {
    grid.innerHTML = `<p style="font-family:var(--font-mono); color:var(--chrome);">
      No bikes listed right now — check back soon.
    </p>`;
    return;
  }

  grid.innerHTML = bikes.map((bike) => `
    <div class="bike-card">
      <img
        class="bike-img"
        src="${bike.image}"
        alt="${bike.name}"
        onerror="this.onerror=null;this.src='placeholder-bike.svg';"
      />
      <div class="bike-body">
        <h3>${bike.name}</h3>
        <div class="bike-specs">${bike.cc}</div>
        <div class="bike-price">${bike.price}</div>
        <a class="btn btn-primary" target="_blank"
           href="https://wa.me/923445596219?text=${encodeURIComponent("Assalam o Alaikum, I'm interested in the " + bike.name)}">
          Inquire on WhatsApp
        </a>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderBikes();
  if (window.initReveal) window.initReveal(".bike-card");
});
