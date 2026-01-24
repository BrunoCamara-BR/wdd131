// hamburger button:
const hambutton = document.querySelector("#hambutton");
const menu = document.querySelector(".menu");
const mainTitle = document.querySelector(".main-title");
const header = document.querySelector("header");

hambutton.addEventListener("click", () => {
  hambutton.classList.toggle("show");
  menu.classList.toggle("show");
  mainTitle.classList.toggle("show");
  header.classList.toggle("show");
});

// footer update time
const today = new Date();
const yearSpan = document.querySelector("#currentyear");

const currentYear = today.getFullYear();

yearSpan.textContent = currentYear;

const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const hours = String(today.getHours()).padStart(2, "0");
const minutes = String(today.getMinutes()).padStart(2, "0");
const seconds = String(today.getSeconds()).padStart(2, "0");

const fullDateTime = `Last modification: ${month}/${day}/${currentYear} ${hours}:${minutes}:${seconds}`;

document.getElementById("lastmodified").textContent = fullDateTime;

