const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.getElementById("sidebar");

mobileMenu.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document
      .querySelectorAll(".pill")
      .forEach((p) => p.classList.remove("active"));

    pill.classList.add("active");
  });
});

document.querySelectorAll(".episode-row").forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.style.boxShadow =
      "0 10px 30px rgba(124,77,255,.18)";
  });

  row.addEventListener("mouseleave", () => {
    row.style.boxShadow = "none";
  });
});

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = ".25s";
  });
});