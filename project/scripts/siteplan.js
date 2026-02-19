const priceButton = document.querySelector("#price-button");
const aZButton = document.querySelector("#a-z-button");
const discountButton = document.querySelector("#discount-button");
const hambutton = document.querySelector("#hambutton");
const hambuttonClose = document.querySelector("#hambutton-close");
const menu = document.querySelector("#menu");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#bar");
const searchBtn = document.querySelector("#searchBtn");
const cartCountEl = document.querySelector("#cartCount");

// ---- LocalStorage cart helpers ----
const CART_KEY = "uai_cart";

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

const hammocksObj = [
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

function showProducts(hammocksObj) {
  document.querySelector("#products-card").innerHTML = hammocksObj.reduce(
    (allCards, item) => {
      const basePrice = Number(item.value);
      const finalPrice =
        item.discountValue > 0
          ? basePrice * (1 - Number(item.discountValue) / 100)
          : basePrice;

      return (allCards += `
    <li class="card">
            <div class="products">
              <img src="images/products/${item.codigo}.webp" alt="hammock ${item.type} ${item.color}" loading="lazy" />
              ${item.discountValue > 0 ? `<div class="discount">${item.discountValue} OFF</div>` : ""}
            </div>
            <div class="information">
              <p class="name">hammock ${item.type} ${item.color}</p>
              <p class="price">US$ ${finalPrice.toFixed(2)}</p>
              <button class="add-to-cart" type="button" data-code="${item.codigo}" aria-label="Add to cart">
                <img
                  src="images/add-card.ico"
                  alt="Add to cart"
                  loading="lazy"
                />
              </button>
            </div>
          </li>
        `);
    },
    "",
  );
}

showProducts(hammocksObj);
updateCartBadge();

// current list shown (used by search + sorting)
let currentList = hammocksObj.slice();

// ---- Sorting / filtering controls ----
let priceAsc = false; // starts at "price ↓"
let azAsc = false; // starts at "a-z ↓"
let discountAsc = false; // starts at "discount ↓"

function productName(item) {
  return `hammock ${item.type} ${item.color}`.toLowerCase();
}

function resetOtherButtons(exceptBtn) {
  if (exceptBtn !== priceButton) {
    priceButton.classList.remove("active");
    priceButton.textContent = "price ↓";
    priceAsc = false;
  }

  if (exceptBtn !== aZButton) {
    aZButton.classList.remove("active");
    aZButton.textContent = "a-z ↓";
    azAsc = false;
  }

  if (exceptBtn !== discountButton) {
    discountButton.classList.remove("active");
    discountButton.textContent = "discount ↓";
    discountAsc = false;
  }
}

function renderSorted(list) {
  showProducts(list);
}

function applyPriceSort() {
  const sorted = currentList.slice().sort((a, b) => {
    return priceAsc ? a.value - b.value : b.value - a.value;
  });
  renderSorted(sorted);
}

function applyAZSort() {
  const sorted = currentList.slice().sort((a, b) => {
    const na = productName(a);
    const nb = productName(b);
    if (na < nb) return azAsc ? -1 : 1;
    if (na > nb) return azAsc ? 1 : -1;
    return 0;
  });
  renderSorted(sorted);
}

function applyDiscountSort() {
  const sorted = currentList.slice().sort((a, b) => {
    return discountAsc
      ? a.discountValue - b.discountValue
      : b.discountValue - a.discountValue;
  });
  renderSorted(sorted);
}

function applyActiveSortOrRender() {
  if (priceButton.classList.contains("active")) {
    applyPriceSort();
    return;
  }
  if (aZButton.classList.contains("active")) {
    applyAZSort();
    return;
  }
  if (discountButton.classList.contains("active")) {
    applyDiscountSort();
    return;
  }
  renderSorted(currentList);
}

priceButton.addEventListener("click", () => {
  resetOtherButtons(priceButton);

  priceButton.classList.toggle("active");
  priceAsc = priceButton.classList.contains("active");
  priceButton.textContent = priceAsc ? "price ↑" : "price ↓";

  currentList = currentList.slice();
  applyPriceSort();
});
aZButton.addEventListener("click", () => {
  resetOtherButtons(aZButton);

  aZButton.classList.toggle("active");
  azAsc = aZButton.classList.contains("active");
  aZButton.textContent = azAsc ? "a-z ↑" : "a-z ↓";

  currentList = currentList.slice();
  applyAZSort();
});
discountButton.addEventListener("click", () => {
  resetOtherButtons(discountButton);

  discountButton.classList.toggle("active");
  discountAsc = discountButton.classList.contains("active");
  discountButton.textContent = discountAsc ? "discount ↑" : "discount ↓";

  currentList = currentList.slice();
  applyDiscountSort();
});

// ---- Search (regex) by color ----
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const q = (searchInput.value || "").trim();

  if (!q) {
    currentList = hammocksObj.slice();
    applyActiveSortOrRender();
    return;
  }

  let rx;
  try {
    rx = new RegExp(q, "i");
  } catch (err) {
    // fallback simple contains if regex is invalid
    const qLower = q.toLowerCase();
    currentList = hammocksObj.filter((item) =>
      String(item.color).toLowerCase().includes(qLower),
    );
    applyActiveSortOrRender();
    return;
  }

  currentList = hammocksObj.filter((item) => rx.test(String(item.color)));
  applyActiveSortOrRender();
});

// ---- Add to cart (event delegation because list is re-rendered) ----
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const code = Number(btn.dataset.code);
  if (!code) return;

  const cart = readCart();
  const found = cart.find((it) => Number(it.codigo) === code);
  if (found) {
    found.qty = Number(found.qty || 0) + 1;
  } else {
    cart.push({ codigo: code, qty: 1 });
  }

  writeCart(cart);
  updateCartBadge();
});

hambutton.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu.classList.toggle("show");
});

hambuttonClose.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu.classList.toggle("show");
});
