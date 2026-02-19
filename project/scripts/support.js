const CART_KEY = "uai_cart";

const form = document.querySelector("#support-form");
const successMsg = document.querySelector("#support-success");
const cartCountEl = document.querySelector("#cartCount");

const hambutton = document.querySelector("#hambutton");
const hambuttonClose = document.querySelector("#hambutton-close");
const menu = document.querySelector("#menu");

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function cartTotalQty(cart) {
  return cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function updateCartBadge() {
  if (!cartCountEl) return;
  const total = cartTotalQty(readCart());
  cartCountEl.textContent = String(total);
  cartCountEl.classList.toggle("show", total > 0);
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  successMsg.style.display = "block";
  form.reset();
});

hambutton?.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu?.classList.toggle("show");
});
hambuttonClose?.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu?.classList.toggle("show");
});

updateCartBadge();
