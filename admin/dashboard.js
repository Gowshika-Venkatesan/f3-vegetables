if (sessionStorage.getItem("f3-admin-auth") !== "yes") {
  window.location.href = "index.html";
}

const products = [
  { id: "tomato", name: "Tomato", unit: "kg", price: 32, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80" },
  { id: "brinjal", name: "Brinjal", unit: "kg", price: 44, image: "https://images.unsplash.com/photo-1604914440268-8d352fe4db95?auto=format&fit=crop&w=400&q=80" },
  { id: "drumstick", name: "Drumstick", unit: "bundle", price: 38, image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=400&q=80" },
  { id: "small-onion", name: "Small Onion", unit: "kg", price: 72, image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=400&q=80" },
  { id: "potato", name: "Potato", unit: "kg", price: 36, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80" },
  { id: "carrot", name: "Carrot", unit: "kg", price: 58, image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=400&q=80" },
  { id: "beans", name: "Beans", unit: "kg", price: 68, image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=400&q=80" },
  { id: "greens", name: "Fresh Greens", unit: "bunch", price: 18, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80" },
  { id: "coriander", name: "Coriander", unit: "bunch", price: 12, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80" },
  { id: "mint", name: "Mint Leaves", unit: "bunch", price: 14, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80" },
  { id: "banana", name: "Banana", unit: "dozen", price: 64, image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80" },
  { id: "lemon", name: "Lemon", unit: "piece", price: 6, image: "https://images.unsplash.com/photo-1587496679742-bad502958fbf?auto=format&fit=crop&w=400&q=80" },
  { id: "apple", name: "Apple", unit: "kg", price: 180, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80" },
  { id: "coconut", name: "Coconut", unit: "piece", price: 32, image: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=400&q=80" }
];

const fallbackOffers = [
  { productId: "tomato", title: "Tomato Flash Deal", tag: "Fresh today", price: 32 },
  { productId: "greens", title: "Keerai Morning Pick", tag: "Best before noon", price: 18 },
  { productId: "banana", title: "Banana Family Pack", tag: "Sweet stock", price: 64 },
  { productId: "small-onion", title: "Small Onion Saver", tag: "Kitchen essential", price: 72 }
];

const els = {
  logoutButton: document.querySelector("#logoutButton"),
  totalOrders: document.querySelector("#totalOrders"),
  newOrders: document.querySelector("#newOrders"),
  orderValue: document.querySelector("#orderValue"),
  offerCount: document.querySelector("#offerCount"),
  ordersList: document.querySelector("#ordersList"),
  clearOrders: document.querySelector("#clearOrders"),
  offerProduct: document.querySelector("#offerProduct"),
  offerTitle: document.querySelector("#offerTitle"),
  offerTag: document.querySelector("#offerTag"),
  offerPrice: document.querySelector("#offerPrice"),
  addOffer: document.querySelector("#addOffer"),
  offersList: document.querySelector("#offersList"),
  toast: document.querySelector("#toast")
};

let orders = JSON.parse(localStorage.getItem("f3-orders") || "[]");
let offers = JSON.parse(localStorage.getItem("f3-offers") || JSON.stringify(fallbackOffers));

function money(value) {
  return `Rs. ${Math.round(value || 0)}`;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function persist() {
  localStorage.setItem("f3-orders", JSON.stringify(orders));
  localStorage.setItem("f3-offers", JSON.stringify(offers));
}

function hydrateOffer(offer) {
  const product = products.find((item) => item.id === offer.productId) || products[0];
  return { ...offer, image: product.image, unit: product.unit, price: Number(offer.price || product.price) };
}

function renderProductOptions() {
  els.offerProduct.innerHTML = products.map((product) => `<option value="${product.id}">${product.name}</option>`).join("");
}

function renderStats() {
  els.totalOrders.textContent = orders.length;
  els.newOrders.textContent = orders.filter((order) => order.status === "New").length;
  els.orderValue.textContent = money(orders.reduce((total, order) => total + Number(order.total || 0), 0));
  els.offerCount.textContent = offers.length;
}

function renderOrders() {
  if (!orders.length) {
    els.ordersList.innerHTML = `<div class="empty-state">No customer orders yet.</div>`;
    return;
  }

  els.ordersList.innerHTML = orders
    .slice()
    .reverse()
    .map((order) => `
      <article class="order-row">
        <header>
          <div>
            <h2>${order.name}</h2>
            <small>${order.phone} | ${order.type} | ${order.createdAt}</small>
          </div>
          <div>
            <strong>${money(order.total)}</strong>
            <span class="status-pill">${order.status || "New"}</span>
          </div>
        </header>
        <small>${order.payment || "Payment after confirmation"}</small>
        <ul>${(order.items || []).map((item) => `<li>${item.name} - ${item.quantity} ${item.unit} - ${money(item.quantity * item.price)}</li>`).join("")}</ul>
        <small>${order.address || "No address added"}</small>
        <div class="order-tools">
          <select data-status="${order.id}">
            ${["New", "Confirmed", "Packed", "Out for delivery", "Completed", "Cancelled"].map((status) => `<option value="${status}" ${status === order.status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
          <button type="button" data-delete="${order.id}">Delete</button>
        </div>
      </article>
    `)
    .join("");
}

function renderOffers() {
  if (!offers.length) {
    els.offersList.innerHTML = `<div class="empty-state">No offers published.</div>`;
    return;
  }

  els.offersList.innerHTML = offers
    .map(hydrateOffer)
    .map((offer, index) => `
      <article class="offer-row">
        <img src="${offer.image}" alt="${offer.title}" />
        <div>
          <small>${offer.tag}</small>
          <strong>${offer.title}</strong>
          <span>${money(offer.price)} / ${offer.unit}</span>
          <button type="button" data-remove-offer="${index}">Remove</button>
        </div>
      </article>
    `)
    .join("");
}

function render() {
  orders = JSON.parse(localStorage.getItem("f3-orders") || "[]");
  offers = JSON.parse(localStorage.getItem("f3-offers") || JSON.stringify(fallbackOffers));
  renderStats();
  renderOrders();
  renderOffers();
}

els.logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("f3-admin-auth");
  window.location.href = "index.html";
});

els.ordersList.addEventListener("change", (event) => {
  const select = event.target.closest("[data-status]");
  if (!select) return;
  const order = orders.find((item) => item.id === select.dataset.status);
  if (!order) return;
  order.status = select.value;
  persist();
  render();
  toast("Order status updated.");
});

els.ordersList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  orders = orders.filter((order) => order.id !== button.dataset.delete);
  persist();
  render();
  toast("Order deleted.");
});

els.clearOrders.addEventListener("click", () => {
  orders = orders.filter((order) => !["Completed", "Cancelled"].includes(order.status));
  persist();
  render();
  toast("Completed and cancelled orders cleared.");
});

els.addOffer.addEventListener("click", () => {
  const product = products.find((item) => item.id === els.offerProduct.value);
  const title = els.offerTitle.value.trim();
  const tag = els.offerTag.value.trim();
  const price = Number(els.offerPrice.value || product.price);

  if (!title || !tag || !Number.isFinite(price)) {
    toast("Fill offer title, tag, and price.");
    return;
  }

  offers.unshift({ productId: product.id, title, tag, price });
  els.offerTitle.value = "";
  els.offerTag.value = "";
  els.offerPrice.value = "";
  persist();
  render();
  toast("Offer published on home page.");
});

els.offersList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-offer]");
  if (!button) return;
  offers.splice(Number(button.dataset.removeOffer), 1);
  persist();
  render();
  toast("Offer removed.");
});

renderProductOptions();
render();
