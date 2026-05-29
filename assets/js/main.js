/* ==========================================================================
   Indie Game Gauntlet — Mobile Navigation Toggle
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("active");
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
    });

    // Close menu when a nav link is clicked (smooth‑scroll UX)
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
