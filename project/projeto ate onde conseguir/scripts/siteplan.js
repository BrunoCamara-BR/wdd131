const priceButton = document.querySelector("#price-button")
const aZButton = document.querySelector("#a-z-button")
const discountButton = document.querySelector("#discount-button")
const hambutton = document.querySelector("#hambutton")
const hambuttonClose = document.querySelector("#hambutton-close")
const menu = document.querySelector("#menu")


const hammocksObj = [
  { codigo: 2718, type: "balcony", color: "beige", value: 45, discountValue: 0 },
  { codigo: 3566, type: "balcony", color: "red", value: 45, discountValue: 0 },
  { codigo: 3668, type: "traditional", color: "blue", value: 25, discountValue: 0 },
  { codigo: 3843, type: "traditional", color: "mixed", value: 28, discountValue: 0 },
  { codigo: 4220, type: "balcony", color: "pink", value: 45, discountValue: 0 },
  { codigo: 4349, type: "traditional", color: "green", value: 25, discountValue: 0 },
  { codigo: 6885, type: "balcony", color: "green-black", value: 45, discountValue: 0 },
  { codigo: 7004, type: "traditional", color: "orange", value: 25, discountValue: 0 },
  { codigo: 7182, type: "balcony", color: "mixed", value: 49, discountValue: 0 },
  { codigo: 7214, type: "nylon", color: "green", value: 22, discountValue: 0 },
  { codigo: 8141, type: "balcony", color: "red", value: 45, discountValue: 0 },
  { codigo: 8526, type: "presidential", color: "blue", value: 69.5, discountValue: 0 },
  { codigo: 9562, type: "balcony", color: "mixed", value: 49, discountValue: 0 },
  { codigo: 9783, type: "kids", color: "green", value: 19.5, discountValue: 0 }
];


function showProducts(hammocksObj) {

    document.querySelector("#products-card").innerHTML = hammocksObj.reduce((allCards, item) => {
    return allCards += `
    <li class="card">
            <div class="products">
              <img src="images/products/${item.codigo}.webp" alt="hammock ${item.type} ${item.color}" loading="lazy" />
              <div ${item.discountValue > 0 ? `class="discount>"${item.discountValue} OFF` : ">"}</div>
            </div>
            <div class="information">
              <p class="name">hammock ${item.type} ${item.color}</p>
              <p class="price">US$ ${item.value}</p>
              <img
                src="images/add-card.ico"
                alt="button to add a item to a cart"
              />
            </div>
          </li>
        `;
  }
  ,"");

}

showProducts(hammocksObj);



priceButton.addEventListener("click", () => {
    priceButton.classList.toggle("active");
    priceButton.textContent = priceButton.classList.contains("active") ? "price ↑" : "price ↓";
})

aZButton.addEventListener("click", () => {
    aZButton.classList.toggle("active");
    aZButton.textContent = aZButton.classList.contains("active") ? "a-z ↑" : "a-z ↓";
})

discountButton.addEventListener("click", () => {
    discountButton.classList.toggle("active");
    discountButton.textContent = discountButton.classList.contains("active") ? "discount ↑" : "discount ↓";
})


hambutton.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu.classList.toggle("show");
});

hambuttonClose.addEventListener("click", () => {
  hambutton.classList.toggle("active");
  menu.classList.toggle("show");
});







