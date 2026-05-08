document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".site-navigation");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuFilters = document.querySelector("#menu-filters");
  const menuGrid = document.querySelector("#menu-grid");
  const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

  const menuItems = [
    {
      flavorName: "Vanilla Bean Bliss",
      category: "Classic",
      description: "Creamy vanilla bean ice cream with fragrant specks in every scoop.",
      price: "$4.50",
      imagePlaceholder: "VB",
    },
    {
      flavorName: "Strawberry Dream",
      category: "Fruit",
      description: "Sweet strawberry ice cream with ribbons of berry jam.",
      price: "$4.75",
      imagePlaceholder: "ST",
    },
    {
      flavorName: "Chocolate Velvet",
      category: "Chocolate",
      description: "Deep cocoa ice cream with a silky, truffle-like finish.",
      price: "$4.95",
      imagePlaceholder: "CV",
    },
    {
      flavorName: "Caramel Waffle Crunch",
      category: "Seasonal",
      description: "Buttery caramel ice cream folded with waffle cone pieces.",
      price: "$5.50",
      imagePlaceholder: "CW",
    },
    {
      flavorName: "Cookie Confetti",
      category: "Classic",
      description: "Cake batter ice cream with cookie crumbles and rainbow sprinkles.",
      price: "$5.50",
      imagePlaceholder: "CC",
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
      category: "Chocolate",
      description: "Cool mint ice cream dotted with crisp chocolate chips.",
      price: "$4.95",
      imagePlaceholder: "MC",
    },
    {
      flavorName: "Pistachio Petal",
      category: "Seasonal",
      description: "Roasted pistachio ice cream with a soft floral finish.",
      price: "$5.25",
      imagePlaceholder: "PP",
    },
  ];

  const filterCategories = ["All", ...new Set(menuItems.map((item) => item.category))];

  const getFilteredMenuItems = (category) => {
    // The "All" filter shows the complete array; category buttons use Array.filter()
    // to return only the matching flavor cards without reloading the page.
    if (category === "All") {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === category);
  };

  const updateActiveFilterButton = (selectedCategory) => {
    if (!menuFilters) {
      return;
    }

    menuFilters.querySelectorAll(".filter-button").forEach((button) => {
      const isActive = button.dataset.category === selectedCategory;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const createMenuCard = (item) => {
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

    return card;
  };

  const renderMenuItems = (category = "All") => {
    if (!menuGrid) {
      return;
    }

    const menuFragment = document.createDocumentFragment();
    const filteredItems = getFilteredMenuItems(category);

    filteredItems.forEach((item) => menuFragment.append(createMenuCard(item)));
    menuGrid.replaceChildren(menuFragment);
  };

  const renderFilterButtons = () => {
    if (!menuFilters) {
      return;
    }

    filterCategories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = category === "All" ? "filter-button is-active" : "filter-button";
      button.dataset.category = category;
      button.textContent = category;
      button.setAttribute("aria-pressed", String(category === "All"));

      button.addEventListener("click", () => {
        updateActiveFilterButton(category);
        renderMenuItems(category);
      });

      menuFilters.append(button);
    });
  };

  renderFilterButtons();
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
