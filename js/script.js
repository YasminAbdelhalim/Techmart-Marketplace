const productGrid = document.getElementById("product-grid");

let allProducts = [];

async function loadProducts() {
  try {
    const response = await fetch("./data/products.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    allProducts = await response.json();
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    productGrid.innerHTML = "<p>Could not load products.</p>";
  }
}

function renderProducts(products) {
  productGrid.innerHTML = "";

  if (products.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button type="button" class="add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

loadProducts();

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-bar");
const categoryInputs = document.querySelectorAll('input[name="category"]');
const maxPriceInput = document.getElementById("max-price");
const priceValue = document.getElementById("price-value");

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategories = [...categoryInputs]
    .filter((input) => input.checked)
    .map((input) => input.value);
  const maxPrice = Number(maxPriceInput.value);

  const filtered = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

categoryInputs.forEach((input) =>
  input.addEventListener("change", applyFilters)
);

maxPriceInput.addEventListener("input", () => {
  priceValue.textContent = `$${maxPriceInput.value}`;
  applyFilters();
});


 
const CART_KEY = "techmart-cart";

const cartButton = document.getElementById("cart-button");
const cartCounter = document.getElementById("counter");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const closeCartButton = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

// Each item looks like: { id: 1, quantity: 2 }
let cart = loadCart();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  updateCart();
}

function changeQuantity(productId, change) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function updateCart() {
  saveCart();
  renderCart();
}

function renderCart() {
  cartItemsList.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    const product = allProducts.find((p) => p.id === item.id);
    if (!product) return; 

    total += product.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <div class="cart-item-controls">
          <button type="button" data-action="decrease" data-id="${product.id}" aria-label="Decrease quantity">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" data-id="${product.id}" aria-label="Increase quantity">+</button>
          <button type="button" class="remove-item" data-action="remove" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(li);
  });

  if (count === 0) {
    cartItemsList.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
  }

  cartCounter.textContent = count;
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart");
  if (!button) return;
  addToCart(Number(button.dataset.id));
});

cartItemsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") changeQuantity(id, 1);
  if (action === "decrease") changeQuantity(id, -1);
  if (action === "remove") removeFromCart(id);
});

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

clearCartButton.addEventListener("click", () => {
  cart = [];
  updateCart();
});
