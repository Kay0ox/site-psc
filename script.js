// FAQ Accordion
document.querySelectorAll(".accordion__header").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);
    panel.style.display = expanded ? "none" : "block";
  });
});

// Scroll animations
const animateElements = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

animateElements.forEach(el => observer.observe(el));
