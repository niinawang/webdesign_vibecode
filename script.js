document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".site-navigation");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuGrid = document.querySelector("#menu-grid");
  const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

  const menuItems = [
    {
      flavorName: "Strawberry Dream",
      category: "Fruit",
      description: "Sweet strawberry ice cream with ribbons of berry jam.",
      price: "$4.75",
      imagePlaceholder: "ST",
    },
    {
      flavorName: "Chocolate Velvet",
      category: "Classic",
      description: "Deep cocoa ice cream with a silky, truffle-like finish.",
      price: "$4.95",
      imagePlaceholder: "CV",
    },
    {
      flavorName: "Vanilla Bean Bliss",
      category: "Classic",
      description: "Creamy vanilla bean ice cream with fragrant specks in every scoop.",
      price: "$4.50",
      imagePlaceholder: "VB",
    },
    {
      flavorName: "Blueberry Cloud",
      category: "Fruit",
      description: "Light blueberry ice cream swirled with fluffy marshmallow cream.",
      price: "$5.25",
      imagePlaceholder: "BC",
    },
    {
      flavorName: "Mint Chip Meadow",
      category: "Refreshing",
      description: "Cool mint ice cream dotted with crisp chocolate chips.",
      price: "$4.95",
      imagePlaceholder: "MC",
    },
    {
      flavorName: "Caramel Waffle Crunch",
      category: "Crunchy",
      description: "Buttery caramel ice cream folded with waffle cone pieces.",
      price: "$5.50",
      imagePlaceholder: "CW",
    },
    {
      flavorName: "Pistachio Petal",
      category: "Nutty",
      description: "Roasted pistachio ice cream with a soft floral finish.",
      price: "$5.25",
      imagePlaceholder: "PP",
    },
    {
      flavorName: "Cookie Confetti",
      category: "Celebration",
      description: "Cake batter ice cream with cookie crumbles and rainbow sprinkles.",
      price: "$5.50",
      imagePlaceholder: "CC",
    },
  ];

  const renderMenuItems = () => {
    if (!menuGrid) {
      return;
    }

    const menuFragment = document.createDocumentFragment();

    menuItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "menu-card";

      const image = document.createElement("div");
      image.className = "menu-card-image";
      image.setAttribute("aria-hidden", "true");
      image.textContent = item.imagePlaceholder;

      const content = document.createElement("div");
      content.className = "menu-card-content";

      const category = document.createElement("p");
      category.className = "menu-card-category";
      category.textContent = item.category;

      const title = document.createElement("h3");
      title.textContent = item.flavorName;

      const description = document.createElement("p");
      description.className = "menu-card-description";
      description.textContent = item.description;

      const price = document.createElement("p");
      price.className = "menu-card-price";
      price.textContent = item.price;

      content.append(category, title, description, price);
      card.append(image, content);
      menuFragment.append(card);
    });

    menuGrid.append(menuFragment);
  };

  renderMenuItems();

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
