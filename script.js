document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".site-navigation");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuFilters = document.querySelector("#menu-filters");
  const menuGrid = document.querySelector("#menu-grid");
  const reservationForm = document.querySelector("#reservation-form");
  const reservationConfirmation = document.querySelector("#reservation-confirmation");
  const testimonialTrack = document.querySelector("#testimonial-track");
  const testimonialDots = document.querySelector("#testimonial-dots");
  const testimonialButtons = document.querySelectorAll("[data-carousel-direction]");
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

  const testimonials = [
    {
      quote: "Nina's Strawberry Dream tastes like summer in a waffle cone. The whole shop feels cheerful and cozy.",
      name: "Maya R.",
      favorite: "Strawberry Dream",
    },
    {
      quote: "The staff made my son's birthday scoop party feel extra special. Cookie Confetti was the star of the day.",
      name: "Jordan P.",
      favorite: "Cookie Confetti",
    },
    {
      quote: "Chocolate Velvet is unbelievably smooth, and the pastel shop design makes every visit feel like a treat.",
      name: "Elena S.",
      favorite: "Chocolate Velvet",
    },
    {
      quote: "I love that the flavors rotate but still feel familiar. Blueberry Cloud is my new weekend ritual.",
      name: "Priya K.",
      favorite: "Blueberry Cloud",
    },
    {
      quote: "The reservation form made planning our sundae night simple, and the scoops were even better in person.",
      name: "Theo M.",
      favorite: "Caramel Waffle Crunch",
    },
    {
      quote: "Mint Chip Meadow is refreshing, playful, and packed with chocolate. Nina's is our neighborhood happy place.",
      name: "Camila D.",
      favorite: "Mint Chip Meadow",
    },
  ];

  let currentTestimonialIndex = 0;
  let testimonialIntervalId;

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

  const reservationFields = reservationForm
    ? Array.from(reservationForm.querySelectorAll("input"))
    : [];

  const today = new Date();
  const todayValue = today.toISOString().split("T")[0];
  const dateField = reservationForm?.querySelector("#reservation-date");

  if (dateField) {
    dateField.min = todayValue;
  }

  const validationMessages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number.",
    date: "Please choose today or a future reservation date.",
    time: "Please choose a reservation time.",
    partySize: "Please enter a party size between 1 and 12.",
  };

  const setFieldError = (field, message) => {
    const errorElement = document.querySelector(`#${field.id}-error`);

    field.classList.toggle("is-invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));

    if (errorElement) {
      errorElement.textContent = message;
    }
  };

  const validateField = (field) => {
    const value = field.value.trim();
    let errorMessage = "";

    if (!value) {
      errorMessage = validationMessages[field.name];
    } else if (field.name === "email" && !field.validity.valid) {
      errorMessage = validationMessages.email;
    } else if (field.name === "phone" && (!/^[\d\s()+.-]+$/.test(value) || value.replace(/\D/g, "").length < 7)) {
      errorMessage = validationMessages.phone;
    } else if (field.name === "date" && value < todayValue) {
      errorMessage = validationMessages.date;
    } else if (field.name === "partySize") {
      const partySize = Number(value);

      if (!Number.isInteger(partySize) || partySize < 1 || partySize > 12) {
        errorMessage = validationMessages.partySize;
      }
    }

    setFieldError(field, errorMessage);

    return !errorMessage;
  };

  const validateReservationForm = () => {
    const validationResults = reservationFields.map((field) => validateField(field));

    return validationResults.every(Boolean);
  };

  const clearReservationForm = () => {
    reservationFields.forEach((field) => setFieldError(field, ""));
  };

  if (reservationForm && reservationConfirmation) {
    reservationFields.forEach((field) => {
      field.addEventListener("blur", () => {
        console.log("Reservation field blur validation triggered.", { field: field.name });
        validateField(field);
      });

      field.addEventListener("input", () => {
        reservationConfirmation.textContent = "";

        if (field.classList.contains("is-invalid")) {
          console.log("Reservation field input re-validation triggered.", { field: field.name });
          validateField(field);
        }
      });
    });

    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = Object.fromEntries(new FormData(reservationForm));
      console.log("Reservation form submit event triggered.", formData);

      if (!validateReservationForm()) {
        reservationConfirmation.textContent = "";
        console.log("Reservation form submission blocked by validation errors.", formData);
        return;
      }

      reservationConfirmation.textContent = `Thanks, ${formData.name}! Your reservation request for ${formData.partySize} guest(s) on ${formData.date} at ${formData.time} has been received.`;
      console.log("Reservation form submitted successfully.", formData);
      reservationForm.reset();
      clearReservationForm();
    });
  }

  const updateTestimonialCarousel = (nextIndex) => {
    if (!testimonialTrack || !testimonialDots || testimonials.length === 0) {
      return;
    }

    currentTestimonialIndex = (nextIndex + testimonials.length) % testimonials.length;
    testimonialTrack.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;

    testimonialTrack.querySelectorAll(".testimonial-slide").forEach((slide, index) => {
      slide.classList.toggle("is-active", index === currentTestimonialIndex);
      slide.setAttribute("aria-hidden", String(index !== currentTestimonialIndex));
    });

    testimonialDots.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
      const isActive = index === currentTestimonialIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const goToTestimonial = (direction) => {
    const offset = direction === "previous" ? -1 : 1;
    updateTestimonialCarousel(currentTestimonialIndex + offset);
  };

  const startTestimonialAutoSlide = () => {
    testimonialIntervalId = window.setInterval(() => {
      goToTestimonial("next");
    }, 5000);
  };

  const resetTestimonialAutoSlide = () => {
    window.clearInterval(testimonialIntervalId);
    startTestimonialAutoSlide();
  };

  const renderTestimonials = () => {
    if (!testimonialTrack || !testimonialDots) {
      return;
    }

    const slidesFragment = document.createDocumentFragment();
    const dotsFragment = document.createDocumentFragment();

    testimonials.forEach((testimonial, index) => {
      const slide = document.createElement("article");
      slide.className = "testimonial-slide";
      slide.setAttribute("aria-hidden", String(index !== currentTestimonialIndex));

      const card = document.createElement("figure");
      card.className = "testimonial-card";

      const quote = document.createElement("blockquote");
      quote.textContent = testimonial.quote;

      const caption = document.createElement("figcaption");
      const customerName = document.createElement("strong");
      customerName.textContent = testimonial.name;

      const favoriteScoop = document.createElement("span");
      favoriteScoop.textContent = `Favorite scoop: ${testimonial.favorite}`;

      caption.append(customerName, favoriteScoop);

      card.append(quote, caption);
      slide.append(card);
      slidesFragment.append(slide);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "testimonial-dot";
      dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
      dot.setAttribute("aria-current", String(index === currentTestimonialIndex));

      dot.addEventListener("click", () => {
        updateTestimonialCarousel(index);
        resetTestimonialAutoSlide();
      });

      dotsFragment.append(dot);
    });

    testimonialTrack.append(slidesFragment);
    testimonialDots.append(dotsFragment);
    updateTestimonialCarousel(currentTestimonialIndex);
    startTestimonialAutoSlide();
  };

  testimonialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      goToTestimonial(button.dataset.carouselDirection);
      resetTestimonialAutoSlide();
    });
  });

  renderTestimonials();

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
