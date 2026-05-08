document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".site-navigation");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

  if (!navigation || !menuToggle) {
    return;
  }

  const openMenu = () => {
    navigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    console.log("Navigation menu opened by hamburger event listener.");
  };

  const closeMenu = (reason = "manual close") => {
    if (!navigation.classList.contains("is-open")) {
      return;
    }

    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    console.log(`Navigation menu closed by event listener: ${reason}.`);
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("is-open");
    console.log("Hamburger menu click event listener triggered.", { isOpen });

    if (isOpen) {
      closeMenu("hamburger toggle");
      return;
    }

    openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const targetSection = targetId ? document.querySelector(targetId) : null;

      console.log("Navigation link event listener triggered.", { targetId });

      navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
      link.classList.add("is-active");

      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      closeMenu("navigation link selected");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedOutsideNavigation = !navigation.contains(event.target);

    if (mobileBreakpoint.matches && clickedOutsideNavigation) {
      closeMenu("outside click");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu("escape key");
    }
  });

  mobileBreakpoint.addEventListener("change", (event) => {
    console.log("Responsive navigation breakpoint listener triggered.", {
      isMobile: event.matches,
    });

    if (!event.matches) {
      closeMenu("desktop breakpoint reached");
    }
  });
});
