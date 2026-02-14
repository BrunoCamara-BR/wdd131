const KEY = "reviewCount";

let count = Number(localStorage.getItem(KEY));

if (!count) {
  count = 0;
}

count += 1;

localStorage.setItem(KEY, String(count));
document.querySelector("#reviewCount").textContent = count;
