// script.js — shared behaviour for every page

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Mark the current page's nav link as active
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

  // Fade + slide elements into view as the user scrolls to them.
  // Runs now for static cards, and is called again by bikes-data.js
  // after it finishes building the bike cards dynamically.
  window.initReveal(".service-card, .contact-card, .fuel-panel");
});

window.initReveal = function (selector) {
  const targets = document.querySelectorAll(selector);
  targets.forEach((el, i) => {
    if (el.classList.contains("reveal")) return; // already set up
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("visible"));
  }
};
