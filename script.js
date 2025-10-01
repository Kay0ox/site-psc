// Header scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// FAQ toggle
document.querySelectorAll(".faq-item button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const open = answer.style.display === "block";
    document.querySelectorAll(".faq-answer").forEach(a => a.style.display="none");
    if (!open) answer.style.display = "block";
  });
});
