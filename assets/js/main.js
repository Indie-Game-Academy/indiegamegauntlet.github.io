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

  /* ========================================================================
     Judge Roster — Character‑Select Modal
     ======================================================================== */

  // Judge data — edit this object to populate judge details
  var judgeData = {
    "judge-1": {
      name: "[Judge 1 Name]",
      img: "assets/images/judge-placeholder.png",
      bio: "[Placeholder bio for Judge 1 — describe their background, expertise, and what they bring to the show.]",
      socials: [
        { label: "Twitter / X", icon: "𝕏", url: "#" },
        { label: "YouTube", icon: "▶", url: "#" }
      ]
    },
    "judge-2": {
      name: "[Judge 2 Name]",
      img: "assets/images/judge-placeholder.png",
      bio: "[Placeholder bio for Judge 2 — describe their background, expertise, and what they bring to the show.]",
      socials: [
        { label: "Twitter / X", icon: "𝕏", url: "#" }
      ]
    },
    "judge-3": {
      name: "[Judge 3 Name]",
      img: "assets/images/judge-placeholder.png",
      bio: "[Placeholder bio for Judge 3 — describe their background, expertise, and what they bring to the show.]",
      socials: [
        { label: "Twitch", icon: "🟣", url: "#" }
      ]
    },
    "judge-4": {
      name: "[Judge 4 Name]",
      img: "assets/images/judge-placeholder.png",
      bio: "[Placeholder bio for Judge 4 — describe their background, expertise, and what they bring to the show.]",
      socials: []
    }
  };

  var modal = document.getElementById("judge-modal");
  var modalImg = document.getElementById("judge-modal-img");
  var modalName = document.getElementById("judge-modal-name");
  var modalBio = document.getElementById("judge-modal-bio");
  var modalSocials = document.getElementById("judge-modal-socials");
  var modalClose = modal ? modal.querySelector(".judge-modal__close") : null;
  var modalBackdrop = modal ? modal.querySelector(".judge-modal__backdrop") : null;

  function openJudgeModal(judgeId) {
    var judge = judgeData[judgeId];
    if (!judge || !modal) return;

    modalImg.src = judge.img;
    modalImg.alt = judge.name;
    modalName.textContent = judge.name;
    modalBio.textContent = judge.bio;

    // Build social links
    modalSocials.innerHTML = "";
    judge.socials.forEach(function (s) {
      var a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", s.label);
      a.setAttribute("title", s.label);
      a.textContent = s.icon;
      modalSocials.appendChild(a);
    });

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalClose) modalClose.focus();
  }

  function closeJudgeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Attach click handlers to judge cards
  document.querySelectorAll(".judge-card[data-judge]").forEach(function (card) {
    card.addEventListener("click", function () {
      openJudgeModal(card.getAttribute("data-judge"));
    });
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener("click", closeJudgeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeJudgeModal);
  }

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.getAttribute("aria-hidden") === "false") {
      closeJudgeModal();
    }
  });
});
