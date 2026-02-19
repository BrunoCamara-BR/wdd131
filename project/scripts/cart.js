const CART_KEY = "uai_cart";

const cartCountEl = document.querySelector("#cartCount");
const itemsEl = document.querySelector("#cart-items");
const emptyEl = document.querySelector("#cart-empty");
const totalEl = document.querySelector("#cart-total");
const checkoutForm = document.querySelector("#checkout-form");

const hambutton = document.querySelector("#hambutton");
const hambuttonClose = document.querySelector("#hambutton-close");
const menu = document.querySelector("#menu");

const PRODUCTS = [
  {
    codigo: 2718,
    type: "balcony",
    color: "beige",
    value: 45,
    discountValue: 10,
  },
  { codigo: 3566, type: "balcony", color: "red", value: 45, discountValue: 0 },
  {
    codigo: 3668,
    type: "traditional",
    color: "blue",
    value: 25,
    discountValue: 5,
  },
  {
    codigo: 3843,
    type: "traditional",
    color: "mixed",
    value: 28,
    discountValue: 0,
  },
  {
    codigo: 4220,
    type: "balcony",
    color: "pink",
    value: 45,
    discountValue: 12,
  },
  {
    codigo: 4349,
    type: "traditional",
    color: "green",
    value: 25,
    discountValue: 0,
  },
  {
    codigo: 6885,
    type: "balcony",
    color: "green-black",
    value: 45,
    discountValue: 5,
  },
  {
    codigo: 7004,
    type: "traditional",
    color: "orange",
    value: 25,
    discountValue: 0,
  },
  {
    codigo: 7182,
    type: "balcony",
    color: "mixed",
    value: 49,
    discountValue: 10,
  },
  { codigo: 7214, type: "nylon", color: "green", value: 22, discountValue: 0 },
  { codigo: 8141, type: "balcony", color: "red", value: 45, discountValue: 12 },
  {
    codigo: 8526,
    type: "presidential",
    color: "blue",
    value: 69.5,
    discountValue: 0,
  },
  {
    codigo: 9562,
    type: "balcony",
    color: "mixed",
    value: 49,
    discountValue: 5,
  },
  {
    codigo: 9783,
    type: "kids",
    color: "green",
    value: 19.5,
    discountValue: 10,
  },
];

function findProduct(code) {
  return PRODUCTS.find((p) => Number(p.codigo) === Number(code)) || null;
}

function finalPrice(product) {
  const base = Number(product.value);
  const d = Number(product.discountValue || 0);
  return d > 0 ? base * (1 - d / 100) : base;
}

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

function calcTotal(cart) {
  let total = 0;
  for (const line of cart) {
    const product = findProduct(line.codigo);
    if (!product) continue;
    total += finalPrice(product) * Number(line.qty || 0);
  }
  return total;
}

function render() {
  const cart = readCart();
  updateCartBadge();

  if (!itemsEl || !emptyEl || !totalEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = "";
    emptyEl.style.display = "block";
    totalEl.textContent = "Total: US$ 0.00";
    return;
  }

  emptyEl.style.display = "none";

  itemsEl.innerHTML = cart
    .map((line) => {
      const product = findProduct(line.codigo);
      if (!product) return "";

      const name = `hammock ${product.type} ${product.color}`;
      const unit = finalPrice(product);
      const qty = Number(line.qty || 0);
      const lineTotal = unit * qty;

      return `
        <div class="cart-item" data-code="${product.codigo}">
          <img src="images/products/${product.codigo}.webp" alt="${name}" loading="lazy" />
          <div class="meta">
            <h3>${name}</h3>
            <p>US$ ${unit.toFixed(2)} each</p>
          </div>
          <div class="actions">
            <div class="qty" aria-label="Quantity controls">
              <button type="button" class="qty-minus" aria-label="Decrease quantity">-</button>
              <span class="qty-val" aria-label="Quantity">${qty}</span>
              <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="remove-btn" aria-label="Remove item">Remove</button>
            <div class="line-total" style="display:none;">${lineTotal.toFixed(2)}</div>
          </div>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = `Total: US$ ${calcTotal(cart).toFixed(2)}`;
}

function changeQty(code, delta) {
  const cart = readCart();
  const item = cart.find((it) => Number(it.codigo) === Number(code));
  if (!item) return;

  const next = Number(item.qty || 0) + delta;
  if (next <= 0) {
    const idx = cart.findIndex((it) => Number(it.codigo) === Number(code));
    if (idx >= 0) cart.splice(idx, 1);
  } else {
    item.qty = next;
  }

  writeCart(cart);
  render();
}

function removeItem(code) {
  const cart = readCart().filter((it) => Number(it.codigo) !== Number(code));
  writeCart(cart);
  render();
}

document.addEventListener("click", (e) => {
  const itemEl = e.target.closest(".cart-item");
  if (!itemEl) return;

  const code = Number(itemEl.dataset.code);
  if (!code) return;

  if (e.target.closest(".qty-plus")) changeQty(code, +1);
  if (e.target.closest(".qty-minus")) changeQty(code, -1);
  if (e.target.closest(".remove-btn")) removeItem(code);
});

checkoutForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const cart = readCart();
  if (cart.length === 0) {
    render();
    return;
  }

  // Simple "checkout": clear cart and go to thank you page
  localStorage.removeItem(CART_KEY);
  window.location.href = "thankyou.html";
});

// Hamburger menu (cart page)
hambutton?.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu?.classList.toggle("show");
});
hambuttonClose?.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu?.classList.toggle("show");
});

render();
