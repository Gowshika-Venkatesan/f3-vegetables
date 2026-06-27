const shopPhone = "917502888200";

const products = [
  { id: "tomato", name: "Tomato", tamil: "Thakkali", category: "Vegetables", unit: "kg", price: 32, cut: 38, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=84" },
  { id: "brinjal", name: "Brinjal", tamil: "Kathirikai", category: "Vegetables", unit: "kg", price: 44, cut: 52, image: "https://images.unsplash.com/photo-1604914440268-8d352fe4db95?auto=format&fit=crop&w=700&q=84" },
  { id: "drumstick", name: "Drumstick", tamil: "Murungakkai", category: "Vegetables", unit: "bundle", price: 38, cut: 45, image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=700&q=84" },
  { id: "small-onion", name: "Small Onion", tamil: "Chinna Vengayam", category: "Vegetables", unit: "kg", price: 72, cut: 86, image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=700&q=84" },
  { id: "potato", name: "Potato", tamil: "Urulai Kizhangu", category: "Vegetables", unit: "kg", price: 36, cut: 42, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=84" },
  { id: "carrot", name: "Carrot", tamil: "Carrot", category: "Vegetables", unit: "kg", price: 58, cut: 70, image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=700&q=84" },
  { id: "beans", name: "Beans", tamil: "Beans", category: "Vegetables", unit: "kg", price: 68, cut: 82, image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=700&q=84" },
  { id: "cucumber", name: "Cucumber", tamil: "Vellarikkai", category: "Vegetables", unit: "kg", price: 34, cut: 42, image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=700&q=84" },
  { id: "greens", name: "Fresh Greens", tamil: "Keerai", category: "Greens", unit: "bunch", price: 18, cut: 24, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=84" },
  { id: "coriander", name: "Coriander", tamil: "Kothamalli", category: "Greens", unit: "bunch", price: 12, cut: 16, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=84" },
  { id: "mint", name: "Mint Leaves", tamil: "Pudina", category: "Greens", unit: "bunch", price: 14, cut: 18, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=700&q=84" },
  { id: "banana", name: "Banana", tamil: "Vazhai Pazham", category: "Fruits", unit: "dozen", price: 64, cut: 78, image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=84" },
  { id: "lemon", name: "Lemon", tamil: "Elumichai", category: "Fruits", unit: "piece", price: 6, cut: 8, image: "https://images.unsplash.com/photo-1587496679742-bad502958fbf?auto=format&fit=crop&w=700&q=84" },
  { id: "apple", name: "Apple", tamil: "Apple", category: "Fruits", unit: "kg", price: 180, cut: 210, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=700&q=84" },
  { id: "coconut", name: "Coconut", tamil: "Thengai", category: "Essentials", unit: "piece", price: 32, cut: 38, image: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=700&q=84" },
  { id: "curry-leaves", name: "Curry Leaves", tamil: "Karuveppilai", category: "Essentials", unit: "pack", price: 10, cut: 14, image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=700&q=84" }
];

const fallbackOffers = [
  { productId: "tomato", title: "Tomato Flash Deal", tag: "Fresh today", price: 32 },
  { productId: "greens", title: "Keerai Morning Pick", tag: "Best before noon", price: 18 },
  { productId: "banana", title: "Banana Family Pack", tag: "Sweet stock", price: 64 },
  { productId: "small-onion", title: "Small Onion Saver", tag: "Kitchen essential", price: 72 }
];

const els = {
  offerTrack: document.querySelector("#offerTrack"),
  categoryGrid: document.querySelector("#categoryGrid"),
  categoryPills: document.querySelector("#categoryPills"),
  productList: document.querySelector("#productList"),
  desktopSearch: document.querySelector("#desktopSearch"),
  mobileSearch: document.querySelector("#mobileSearch"),
  sortSelect: document.querySelector("#sortSelect"),
  cartCount: document.querySelector("#cartCount"),
  basketCount: document.querySelector("#basketCount"),
  basketItems: document.querySelector("#basketItems"),
  basketTotal: document.querySelector("#basketTotal"),
  basketCheckout: document.querySelector("#basketCheckout"),
  bottomCart: document.querySelector("#bottomCart"),
  cartDrawer: document.querySelector("#cartDrawer"),
  openCart: document.querySelector("#openCart"),
  checkoutItems: document.querySelector("#checkoutItems"),
  checkoutTotal: document.querySelector("#checkoutTotal"),
  placeOrder: document.querySelector("#placeOrder"),
  customerName: document.querySelector("#customerName"),
  customerPhone: document.querySelector("#customerPhone"),
  customerAddress: document.querySelector("#customerAddress"),
  orderType: document.querySelector("#orderType"),
  paymentMode: document.querySelector("#paymentMode"),
  toast: document.querySelector("#toast")
};

let selectedCategory = "All";
let cart = JSON.parse(localStorage.getItem("f3-cart") || "[]");
let orders = JSON.parse(localStorage.getItem("f3-orders") || "[]");
let offers = JSON.parse(localStorage.getItem("f3-offers") || JSON.stringify(fallbackOffers));

function money(value) {
  return `Rs. ${Math.round(value)}`;
}

function persist() {
  localStorage.setItem("f3-cart", JSON.stringify(cart));
  localStorage.setItem("f3-orders", JSON.stringify(orders));
  localStorage.setItem("f3-offers", JSON.stringify(offers));
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2300);
}

function categories() {
  return [
    { name: "All", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80" },
    { name: "Vegetables", image: products.find((p) => p.id === "tomato").image },
    { name: "Greens", image: products.find((p) => p.id === "greens").image },
    { name: "Fruits", image: products.find((p) => p.id === "banana").image },
    { name: "Essentials", image: products.find((p) => p.id === "coconut").image },
    { name: "Offers", image: products.find((p) => p.id === "small-onion").image }
  ];
}

function normalizedOffers() {
  return offers.map((offer) => {
    const product = products.find((item) => item.id === offer.productId) || products[0];
    return {
      ...offer,
      image: offer.image || product.image,
      unit: offer.unit || product.unit,
      price: offer.price || product.price
    };
  });
}

function renderOffers() {
  els.offerTrack.innerHTML = normalizedOffers()
    .map((offer) => `
      <article class="offer-card">
        <div>
          <small>${offer.tag}</small>
          <strong>${offer.title}</strong>
          <span>${money(offer.price)} / ${offer.unit}</span>
        </div>
        <img src="${offer.image}" alt="${offer.title}" />
      </article>
    `)
    .join("");
}

function renderCategories() {
  const markup = categories()
    .map((category) => `
      <button class="category-tile ${selectedCategory === category.name ? "active" : ""}" type="button" data-category="${category.name}">
        <span class="circle"><img src="${category.image}" alt="" /></span>
        <span>${category.name}</span>
      </button>
    `)
    .join("");

  const pills = categories()
    .map((category) => `<button class="${selectedCategory === category.name ? "active" : ""}" type="button" data-category="${category.name}">${category.name}</button>`)
    .join("");

  els.categoryGrid.innerHTML = markup;
  els.categoryPills.innerHTML = pills;
}

function query() {
  return (els.mobileSearch.value || els.desktopSearch.value).trim().toLowerCase();
}

function productMatches(product) {
  const q = query();
  const categoryMatch = selectedCategory === "All" || selectedCategory === "Offers" || product.category === selectedCategory;
  const textMatch = [product.name, product.tamil, product.category].join(" ").toLowerCase().includes(q);
  return categoryMatch && textMatch;
}

function sortedProducts() {
  const list = products.filter(productMatches);
  if (els.sortSelect.value === "low") return list.sort((a, b) => a.price - b.price);
  if (els.sortSelect.value === "high") return list.sort((a, b) => b.price - a.price);
  if (selectedCategory === "Offers") {
    const offerIds = normalizedOffers().map((offer) => offer.productId);
    return list.sort((a, b) => offerIds.indexOf(b.id) - offerIds.indexOf(a.id));
  }
  return list;
}

function renderProducts() {
  const list = sortedProducts();
  els.productList.innerHTML = list
    .map((product) => `
      <article class="product-card">
        <div class="product-image" style="background-image: url('${product.image}')"></div>
        <div class="product-body">
          <div>
            <h3>${product.name}</h3>
            <small>${product.tamil} | ${product.category}</small>
          </div>
          <div class="price-row">
            <div>
              <strong>${money(product.price)}</strong>
              <span><s>${money(product.cut)}</s> / ${product.unit}</span>
            </div>
          </div>
          <div class="add-row">
            <input type="number" min="0.5" step="0.5" value="1" aria-label="Quantity for ${product.name}" data-qty="${product.id}" />
            <button type="button" data-add="${product.id}">Add</button>
          </div>
        </div>
      </article>
    `)
    .join("");
}

function cartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function basketLine(item) {
  return `
    <div class="basket-line">
      <div>
        <strong>${item.name}</strong>
        <small>${item.quantity} ${item.unit} x ${money(item.price)}</small>
      </div>
      <div>
        <strong>${money(item.quantity * item.price)}</strong>
        <button type="button" data-remove="${item.id}">Remove</button>
      </div>
    </div>
  `;
}

function renderCart() {
  const count = cartCount();
  const countText = `${count % 1 === 0 ? count : count.toFixed(1)} item${count === 1 ? "" : "s"}`;
  const markup = cart.length ? cart.map(basketLine).join("") : `<div class="empty-state">Your basket is empty.</div>`;

  els.cartCount.textContent = count % 1 === 0 ? count : count.toFixed(1);
  els.basketCount.textContent = countText;
  els.basketTotal.textContent = money(cartTotal());
  els.checkoutTotal.textContent = money(cartTotal());
  els.basketItems.innerHTML = markup;
  els.checkoutItems.innerHTML = markup;
}

function addToCart(productId, quantity) {
  const product = products.find((item) => item.id === productId);
  const existing = cart.find((item) => item.id === productId);
  if (!product) return;

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  persist();
  renderCart();
  toast(`${product.name} added`);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  persist();
  renderCart();
}

function whatsappText(order) {
  return encodeURIComponent([
    `New F3 Vegetables order`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Type: ${order.type}`,
    `Payment: ${order.payment}`,
    `Address: ${order.address || "-"}`,
    "",
    "Items:",
    ...order.items.map((item) => `- ${item.name}: ${item.quantity} ${item.unit} x ${money(item.price)} = ${money(item.quantity * item.price)}`),
    "",
    `Total: ${money(order.total)}`
  ].join("\n"));
}

function placeOrder() {
  const name = els.customerName.value.trim();
  const phone = els.customerPhone.value.trim();
  const address = els.customerAddress.value.trim();

  if (!cart.length) {
    toast("Add products before checkout.");
    return;
  }

  if (!name || !phone) {
    toast("Enter name and mobile number.");
    return;
  }

  const order = {
    id: crypto.randomUUID(),
    name,
    phone,
    address,
    type: els.orderType.value,
    payment: els.paymentMode.value,
    status: "New",
    total: cartTotal(),
    items: cart,
    createdAt: new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date())
  };

  orders.push(order);
  cart = [];
  persist();
  renderCart();
  els.customerName.value = "";
  els.customerPhone.value = "";
  els.customerAddress.value = "";
  els.cartDrawer.close();
  toast("Order created. Sending to WhatsApp.");
  window.setTimeout(() => window.open(`https://wa.me/${shopPhone}?text=${whatsappText(order)}`, "_blank", "noreferrer"), 400);
}

function chooseCategory(category) {
  selectedCategory = category;
  renderCategories();
  renderProducts();
  document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
}

function syncSearch(value) {
  els.desktopSearch.value = value;
  els.mobileSearch.value = value;
  renderProducts();
}

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) chooseCategory(categoryButton.dataset.category);

  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    const input = document.querySelector(`[data-qty="${addButton.dataset.add}"]`);
    const quantity = Number(input.value);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      toast("Enter a valid quantity.");
      return;
    }
    addToCart(addButton.dataset.add, quantity);
  }

  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

els.desktopSearch.addEventListener("input", (event) => syncSearch(event.target.value));
els.mobileSearch.addEventListener("input", (event) => syncSearch(event.target.value));
els.sortSelect.addEventListener("change", renderProducts);
els.openCart.addEventListener("click", () => els.cartDrawer.showModal());
els.bottomCart.addEventListener("click", () => els.cartDrawer.showModal());
els.basketCheckout.addEventListener("click", () => els.cartDrawer.showModal());
els.placeOrder.addEventListener("click", placeOrder);

renderOffers();
renderCategories();
renderProducts();
renderCart();
