const fs = require("fs");
const jquery = require("jquery");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

const setScrollY = (value) => {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
    writable: true,
  });
};

const loadWebsite = () => {
  jest.resetModules();
  localStorage.clear();
  document.open();
  document.write(html);
  document.close();

  setScrollY(0);

  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

  window.scrollTo = jest.fn(({ top }) => setScrollY(top));
  window.jQuery = jquery;
  window.$ = jquery;

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver = MockIntersectionObserver;
  global.IntersectionObserver = MockIntersectionObserver;

  require("../script.js");
  document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
};

const fillValidReservationFields = () => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  document.querySelector("#reservation-name").value = "Nina Fan";
  document.querySelector("#reservation-phone").value = "555-123-4567";
  document.querySelector("#reservation-date").value = tomorrow;
  document.querySelector("#reservation-time").value = "18:30";
  document.querySelector("#reservation-party-size").value = "4";
};

const getVisibleMenuCards = () => Array.from(document.querySelectorAll(".menu-card"))
  .filter((card) => !card.classList.contains("is-hidden"));

describe("Nina's Ice Cream website interactions", () => {
  let consoleSpy;

  beforeEach(() => {
    jest.useFakeTimers();
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    loadWebsite();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("invalid emails trigger validation errors", () => {
    fillValidReservationFields();

    const emailField = document.querySelector("#reservation-email");
    const form = document.querySelector("#reservation-form");
    const emailError = document.querySelector("#reservation-email-error");

    emailField.value = "not-an-email";
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(emailField.classList.contains("is-invalid")).toBe(true);
    expect(emailField.getAttribute("aria-invalid")).toBe("true");
    expect(emailError.textContent).toBe("Please enter a valid email address.");
  });

  test("category filters show the correct menu items", () => {
    const chocolateButton = Array.from(document.querySelectorAll(".filter-button"))
      .find((button) => button.textContent === "Chocolate");

    chocolateButton.click();

    const visibleCards = getVisibleMenuCards();
    const visibleCategories = visibleCards.map((card) => card.querySelector(".menu-card-category").textContent);
    const visibleTitles = visibleCards.map((card) => card.querySelector("h3").textContent);

    expect(chocolateButton.classList.contains("is-active")).toBe(true);
    expect(visibleCards).toHaveLength(2);
    expect(visibleCategories).toEqual(["Chocolate", "Chocolate"]);
    expect(visibleTitles).toEqual(["Chocolate Velvet", "Mint Chip Meadow"]);
  });

  test("dark mode updates localStorage and document theme", () => {
    const themeToggle = document.querySelector(".theme-toggle");

    themeToggle.click();

    expect(localStorage.getItem("ninas-ice-cream-theme")).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(themeToggle.getAttribute("aria-label")).toBe("Switch to light mode");

    themeToggle.click();

    expect(localStorage.getItem("ninas-ice-cream-theme")).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  test("back-to-top button visibility changes on scroll", () => {
    const backToTopButton = document.querySelector(".back-to-top");

    expect(backToTopButton.classList.contains("is-visible")).toBe(false);
    expect(backToTopButton.getAttribute("aria-hidden")).toBe("true");

    setScrollY(500);
    window.dispatchEvent(new Event("scroll"));

    expect(backToTopButton.classList.contains("is-visible")).toBe(true);
    expect(backToTopButton.getAttribute("aria-hidden")).toBe("false");
    expect(backToTopButton.tabIndex).toBe(0);

    setScrollY(0);
    window.dispatchEvent(new Event("scroll"));

    expect(backToTopButton.classList.contains("is-visible")).toBe(false);
    expect(backToTopButton.getAttribute("aria-hidden")).toBe("true");
    expect(backToTopButton.tabIndex).toBe(-1);
  });

  test("dynamic rendering creates the correct number of menu cards", () => {
    expect(document.querySelectorAll(".menu-card")).toHaveLength(8);
    expect(document.querySelectorAll(".menu-card-image img")).toHaveLength(8);
  });

  test("pistachio menu card uses the corrected ice cream image", () => {
    const pistachioCard = Array.from(document.querySelectorAll(".menu-card"))
      .find((card) => card.querySelector("h3").textContent === "Pistachio Petal");
    const pistachioImage = pistachioCard.querySelector(".menu-card-image img");

    expect(pistachioImage.src).toContain("photo-1554630981-a73ffb5ed6f8");
    expect(pistachioImage.alt).toBe("Pale green pistachio ice cream in a cone.");
  });

  test("jQuery search works with category filtering and no-results messaging", () => {
    const fruitButton = Array.from(document.querySelectorAll(".filter-button"))
      .find((button) => button.textContent === "Fruit");
    const searchInput = document.querySelector("#menu-search-input");
    const noResultsMessage = document.querySelector("#menu-no-results");

    fruitButton.click();
    searchInput.value = "blueberry";
    window.$(searchInput).trigger("keyup");

    let visibleCards = getVisibleMenuCards();

    expect(visibleCards).toHaveLength(1);
    expect(visibleCards[0].querySelector("h3").textContent).toBe("Blueberry Cloud");
    expect(noResultsMessage.hidden).toBe(true);

    searchInput.value = "pistachio";
    window.$(searchInput).trigger("keyup");
    visibleCards = getVisibleMenuCards();

    expect(visibleCards).toHaveLength(0);
    expect(noResultsMessage.hidden).toBe(false);
    expect(noResultsMessage.textContent).toBe("No flavors match your search 🍦");
  });

  test("category filter helper returns only matching mock menu items", () => {
    const mockMenuItems = [
      { flavorName: "Vanilla Bean", category: "Classic" },
      { flavorName: "Strawberry Swirl", category: "Fruit" },
      { flavorName: "Blueberry Cloud", category: "Fruit" },
      { flavorName: "Chocolate Fudge", category: "Chocolate" },
    ];

    // The helper should keep only items whose category matches the selected
    // filter, which mirrors the menu category behavior used by the live UI.
    const fruitResults = window.NinasIceCream.filterMenuItemsByCategory(mockMenuItems, "Fruit");

    expect(fruitResults).toHaveLength(2);
    expect(fruitResults).toEqual([
      { flavorName: "Strawberry Swirl", category: "Fruit" },
      { flavorName: "Blueberry Cloud", category: "Fruit" },
    ]);
    expect(fruitResults.every((item) => item.category === "Fruit")).toBe(true);
  });
});
