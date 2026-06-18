/* ============================================================
   Edel Kiprop — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Typing effect in hero ---------- */
  const typed = document.getElementById("typed");
  if (typed) {
    const words = [
      "machine learning models.",
      "meaning out of messy data.",
      "with Python, NLP & SQL.",
      "dashboards that tell stories.",
    ];
    if (prefersReduced) {
      typed.textContent = "machine learning models.";
    } else {
      let w = 0, c = 0, deleting = false;
      const tick = () => {
        const word = words[w];
        typed.textContent = word.slice(0, c);
        if (!deleting && c < word.length) {
          c++;
        } else if (deleting && c > 0) {
          c--;
        } else if (!deleting && c === word.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        } else {
          deleting = false;
          w = (w + 1) % words.length;
        }
        setTimeout(tick, deleting ? 45 : 80);
      };
      tick();
    }
  }

  /* ---------- Nav: scrolled style + hide on scroll-down ---------- */
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("nav--scrolled", y > 24);
    // hide when scrolling down past the hero, show when scrolling up
    if (y > 400 && y > lastY) {
      nav.classList.add("nav--hidden");
    } else {
      nav.classList.remove("nav--hidden");
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const closeMenu = () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");
  const linkFor = (id) =>
    Array.from(navLinks).find((a) => a.getAttribute("href") === "#" + id);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("is-active"));
            const link = linkFor(entry.target.id);
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // gentle stagger for groups entering together
            setTimeout(() => entry.target.classList.add("is-visible"), i * 90);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => revealObs.observe(el));
  }

  /* ---------- Mark elements for reveal that aren't already ---------- */
  document
    .querySelectorAll(".section__title, .about__text, .about__card, .skills__group, .timeline__item, .more__title")
    .forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });
  // re-observe the late additions
  if (!prefersReduced && "IntersectionObserver" in window) {
    const late = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal:not(.is-visible)")
      .forEach((el) => late.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Current year in footer ---------- */
  const yearEl = document.querySelector(".footer__text");
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace("2026", new Date().getFullYear());
  }
})();
