const fs = require("fs");
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

    const visibleCards = Array.from(document.querySelectorAll(".menu-card"));
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
});
