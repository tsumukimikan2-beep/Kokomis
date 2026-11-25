const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const stage = document.querySelector("#heroStage");
const dock = document.querySelector(".dock");
const dockItems = document.querySelectorAll(".dock__item");
let indicatorTimer;

function moveDockIndicator(item, animate = true) {
  if (!dock || !item) return;

  const dockBounds = dock.getBoundingClientRect();
  const itemBounds = item.getBoundingClientRect();
  const x = itemBounds.left - dockBounds.left - 6;
  const width = itemBounds.width;

  window.clearTimeout(indicatorTimer);

  if (animate) {
    dock.classList.remove("is-moving");
    void dock.offsetWidth;
    dock.classList.add("is-moving");
  }

  dock.style.setProperty("--indicator-x", `${x}px`);
  dock.style.setProperty("--indicator-width", `${width}px`);

  if (animate) {
    indicatorTimer = window.setTimeout(() => {
      dock.classList.remove("is-moving");
    }, 280);
  }
}

const initialDockItem = Array.from(dockItems).find((item) => item.getAttribute("href") === window.location.hash);
if (initialDockItem) {
  dockItems.forEach((item) => {
    item.classList.remove("is-active");
    item.removeAttribute("aria-current");
  });
  initialDockItem.classList.add("is-active");
  initialDockItem.setAttribute("aria-current", "page");
}

const savedTheme = localStorage.getItem("komisi-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
const initialTheme = savedTheme || preferredTheme;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("komisi-theme", theme);
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(!isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#111111" : "#f4f4f2");
}

setTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

if (stage && window.matchMedia("(pointer: fine)").matches) {
  stage.addEventListener("mousemove", (event) => {
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  });

  stage.addEventListener("mouseleave", () => {
    stage.style.transform = "";
  });
}

dockItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("is-active")) return;

    dockItems.forEach((link) => {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    });
    item.classList.add("is-active");
    item.setAttribute("aria-current", "page");
    moveDockIndicator(item);
  });
});

window.addEventListener("resize", () => {
  const activeItem = dock?.querySelector(".dock__item.is-active");
  if (activeItem) moveDockIndicator(activeItem, false);
});

requestAnimationFrame(() => {
  const activeItem = dock?.querySelector(".dock__item.is-active");
  if (activeItem) moveDockIndicator(activeItem, false);
});
