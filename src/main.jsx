import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "../styles.css";

const shopPhone = "917502888200";
const adminCredentials = { username: "f3admin", password: "Fresh@88200" };

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

function money(value) {
  return `Rs. ${Math.round(value || 0)}`;
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function LogoBrand({ admin = false }) {
  return (
    <a className="brand" href={admin ? "/" : "#home"} aria-label="F3 Vegetables home">
      <img src="/assets/f3-logo.png" alt="F3 Vegetables logo" />
      <span>
        <strong>{admin ? "F3 Admin" : "F3 Vegetables"}</strong>
        <small>{admin ? "Orders and offers" : "Fresh . Fine . Fair"}</small>
      </span>
    </a>
  );
}

function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState(() => readJson("f3-cart", []));
  const [orders, setOrders] = useState(() => readJson("f3-orders", []));
  const [offers] = useState(() => readJson("f3-offers", fallbackOffers));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", type: "Delivery", payment: "UPI after confirmation" });

  const categories = useMemo(() => [
    { name: "All", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80" },
    { name: "Vegetables", image: products.find((p) => p.id === "tomato").image },
    { name: "Greens", image: products.find((p) => p.id === "greens").image },
    { name: "Fruits", image: products.find((p) => p.id === "banana").image },
    { name: "Essentials", image: products.find((p) => p.id === "coconut").image },
    { name: "Offers", image: products.find((p) => p.id === "small-onion").image }
  ], []);

  const normalizedOffers = offers.map((offer) => {
    const product = products.find((item) => item.id === offer.productId) || products[0];
    return { ...offer, image: product.image, unit: product.unit, price: Number(offer.price || product.price) };
  });

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || selectedCategory === "Offers" || product.category === selectedCategory;
      const textMatch = [product.name, product.tamil, product.category].join(" ").toLowerCase().includes(q);
      return categoryMatch && textMatch;
    });

    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, selectedCategory, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2300);
  }

  function persistCart(nextCart) {
    setCart(nextCart);
    writeJson("f3-cart", nextCart);
  }

  function addToCart(productId, quantity) {
    const product = products.find((item) => item.id === productId);
    if (!product || !Number.isFinite(quantity) || quantity <= 0) {
      showToast("Enter a valid quantity.");
      return;
    }

    const existing = cart.find((item) => item.id === productId);
    const nextCart = existing
      ? cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity + quantity } : item)
      : [...cart, { ...product, quantity }];

    persistCart(nextCart);
    showToast(`${product.name} added`);
  }

  function removeFromCart(productId) {
    persistCart(cart.filter((item) => item.id !== productId));
  }

  function whatsappText(order) {
    return encodeURIComponent([
      "New F3 Vegetables order",
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
    if (!cart.length) {
      showToast("Add products before checkout.");
      return;
    }
    if (!customer.name.trim() || !customer.phone.trim()) {
      showToast("Enter name and mobile number.");
      return;
    }

    const order = {
      id: crypto.randomUUID(),
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      type: customer.type,
      payment: customer.payment,
      status: "New",
      total: cartTotal,
      items: cart,
      createdAt: new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date())
    };

    const nextOrders = [...orders, order];
    setOrders(nextOrders);
    writeJson("f3-orders", nextOrders);
    persistCart([]);
    setCustomer({ name: "", phone: "", address: "", type: "Delivery", payment: "UPI after confirmation" });
    setCheckoutOpen(false);
    showToast("Order created. Sending to WhatsApp.");
    window.setTimeout(() => window.open(`https://wa.me/${shopPhone}?text=${whatsappText(order)}`, "_blank", "noreferrer"), 400);
  }

  return (
    <>
      <div className="service-bar">
        <span>Next-day and same-day local delivery in Karur</span>
        <span>Call: 075028 88200</span>
      </div>
      <header className="store-header">
        <LogoBrand />
        <div className="desktop-search">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search from our fresh products" />
        </div>
        <nav className="desktop-nav" aria-label="Store navigation">
          <a href="#categories">Categories</a>
          <a href="#offers">Offers</a>
          <a href="#products">Products</a>
          <a href="/admin">Admin</a>
        </nav>
        <button className="cart-action" onClick={() => setCheckoutOpen(true)} type="button">
          <span>🛒</span>
          <strong>{cartCount % 1 === 0 ? cartCount : cartCount.toFixed(1)}</strong>
        </button>
      </header>

      <main id="home">
        <section className="mobile-hero">
          <div className="delivery-line">
            <span>📍 Anna Nagar, Karur</span>
            <strong>Open until 9 PM</strong>
          </div>
          <div className="mobile-search">
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search tomato, keerai, onion..." />
          </div>
          <div className="hero-banner">
            <div>
              <p>Fresh vegetables</p>
              <h1>Order daily groceries from F3</h1>
              <a href="#products">Shop now</a>
            </div>
          </div>
        </section>

        <section className="section-block" id="offers">
          <div className="section-head">
            <div>
              <p>Today at F3</p>
              <h2>Daily offers</h2>
            </div>
            <a href="#products">View all</a>
          </div>
          <div className="offer-track">
            {normalizedOffers.map((offer) => (
              <article className="offer-card" key={`${offer.productId}-${offer.title}`}>
                <div>
                  <small>{offer.tag}</small>
                  <strong>{offer.title}</strong>
                  <span>{money(offer.price)} / {offer.unit}</span>
                </div>
                <img src={offer.image} alt={offer.title} />
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="categories">
          <div className="section-head">
            <div>
              <p>Fresh aisles</p>
              <h2>Popular categories</h2>
            </div>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                className={`category-tile ${selectedCategory === category.name ? "active" : ""}`}
                key={category.name}
                type="button"
                onClick={() => {
                  setSelectedCategory(category.name);
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="circle"><img src={category.image} alt="" /></span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section-block split-showcase">
          <article className="showcase-card green-card">
            <span>Kitchen essentials</span>
            <strong>Fresh herbs, coconut, lemon and more</strong>
            <a href="#products">Explore essentials</a>
          </article>
          <article className="showcase-card purple-card">
            <span>For families</span>
            <strong>Build your weekly basket in one order</strong>
            <a href="#products">Start basket</a>
          </article>
        </section>

        <section className="section-block" id="products">
          <div className="section-head sticky-title">
            <div>
              <p>Shop fresh</p>
              <h2>All products</h2>
            </div>
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
              <option value="popular">Popular</option>
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
            </select>
          </div>
          <div className="category-pills">
            {categories.map((category) => (
              <button className={selectedCategory === category.name ? "active" : ""} key={category.name} type="button" onClick={() => setSelectedCategory(category.name)}>
                {category.name}
              </button>
            ))}
          </div>
          <div className="products-layout">
            <div className="product-list" aria-live="polite">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
            <BasketPanel cart={cart} cartTotal={cartTotal} cartCount={cartCount} onRemove={removeFromCart} onCheckout={() => setCheckoutOpen(true)} />
          </div>
        </section>

        <section className="section-block info-strip">
          <article><span>✓</span><strong>Quality checked</strong><p>Vegetables are selected before packing.</p></article>
          <article><span>↗</span><strong>Fast confirmation</strong><p>Order details go to the shop instantly.</p></article>
          <article><span>₹</span><strong>Fair pricing</strong><p>Final bill confirmed by weight and stock.</p></article>
        </section>

        <section className="contact-block" id="contact">
          <div>
            <p>Store location</p>
            <h2>F3 Vegetables, Karur</h2>
            <span>No 1, 5th Cross Rd, opposite to KCP House west gate, Anna Nagar, Karur, Tamil Nadu 639002</span>
          </div>
          <div className="contact-actions">
            <a href="tel:+917502888200">Call shop</a>
            <a href="https://www.google.com/search?q=f3+vegetables+karur" target="_blank" rel="noreferrer">Google listing</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><img src="/assets/f3-logo.png" alt="F3 Vegetables logo" /><strong>F3 Vegetables</strong><span>Fresh . Fine . Fair</span></div>
        <div><strong>Contact</strong><span>075028 88200</span><span>Open until 9 PM</span></div>
        <div><strong>Address</strong><span>Anna Nagar, Karur, Tamil Nadu 639002</span></div>
      </footer>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        <a href="#home"><span>⌂</span>Home</a>
        <a href="#categories"><span>▦</span>Categories</a>
        <button onClick={() => setCheckoutOpen(true)} type="button"><span>🛒</span>Basket</button>
        <a href="/admin"><span>◎</span>Admin</a>
      </nav>

      <CheckoutModal
        open={checkoutOpen}
        cart={cart}
        total={cartTotal}
        customer={customer}
        setCustomer={setCustomer}
        onClose={() => setCheckoutOpen(false)}
        onRemove={removeFromCart}
        onPlaceOrder={placeOrder}
      />

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}

function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <article className="product-card">
      <div className="product-image" style={{ backgroundImage: `url('${product.image}')` }} />
      <div className="product-body">
        <div>
          <h3>{product.name}</h3>
          <small>{product.tamil} | {product.category}</small>
        </div>
        <div className="price-row">
          <div>
            <strong>{money(product.price)}</strong>
            <span><s>{money(product.cut)}</s> / {product.unit}</span>
          </div>
        </div>
        <div className="add-row">
          <input type="number" min="0.5" step="0.5" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} aria-label={`Quantity for ${product.name}`} />
          <button type="button" onClick={() => onAdd(product.id, quantity)}>Add</button>
        </div>
      </div>
    </article>
  );
}

function BasketPanel({ cart, cartTotal, cartCount, onRemove, onCheckout }) {
  return (
    <aside className="basket-panel">
      <div className="basket-head">
        <h3>My Basket</h3>
        <span>{cartCount % 1 === 0 ? cartCount : cartCount.toFixed(1)} items</span>
      </div>
      <div className="basket-items">
        {cart.length ? cart.map((item) => <BasketLine key={item.id} item={item} onRemove={onRemove} />) : <div className="empty-state">Your basket is empty.</div>}
      </div>
      <div className="basket-total">
        <span>Total</span>
        <strong>{money(cartTotal)}</strong>
      </div>
      <button onClick={onCheckout} type="button">Checkout</button>
    </aside>
  );
}

function BasketLine({ item, onRemove }) {
  return (
    <div className="basket-line">
      <div>
        <strong>{item.name}</strong>
        <small>{item.quantity} {item.unit} x {money(item.price)}</small>
      </div>
      <div>
        <strong>{money(item.quantity * item.price)}</strong>
        <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}

function CheckoutModal({ open, cart, total, customer, setCustomer, onClose, onRemove, onPlaceOrder }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <section className="checkout-drawer react-modal" aria-labelledby="checkoutTitle">
        <div className="checkout-shell">
          <div className="drawer-head">
            <div>
              <p>F3 checkout</p>
              <h2 id="checkoutTitle">Complete your order</h2>
            </div>
            <button className="close-button" onClick={onClose} type="button" aria-label="Close checkout">×</button>
          </div>
          <div className="checkout-items">
            {cart.length ? cart.map((item) => <BasketLine key={item.id} item={item} onRemove={onRemove} />) : <div className="empty-state">Your basket is empty.</div>}
          </div>
          <div className="checkout-total">
            <span>Total amount</span>
            <strong>{money(total)}</strong>
          </div>
          <div className="checkout-form">
            <label>Name<input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} autoComplete="name" placeholder="Customer name" /></label>
            <label>Mobile<input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} inputMode="tel" autoComplete="tel" placeholder="10 digit mobile" /></label>
            <label>Order type<select value={customer.type} onChange={(e) => setCustomer({ ...customer, type: e.target.value })}><option>Delivery</option><option>Pickup</option></select></label>
            <label>Payment<select value={customer.payment} onChange={(e) => setCustomer({ ...customer, payment: e.target.value })}><option>UPI after confirmation</option><option>Cash on delivery</option><option>Pay at store</option></select></label>
            <label className="wide-field">Address / notes<textarea value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} rows="3" placeholder="Door no, street, landmark" /></label>
          </div>
          <button className="place-order" onClick={onPlaceOrder} type="button">Place order on WhatsApp</button>
          <small>Final price may vary slightly by exact weight and daily market rate.</small>
        </div>
      </section>
    </div>
  );
}

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function login() {
    if (form.username.trim() === adminCredentials.username && form.password === adminCredentials.password) {
      sessionStorage.setItem("f3-admin-auth", "yes");
      navigate("/admin/dashboard");
      return;
    }
    setMessage("Invalid username or password.");
  }

  return (
    <main className="login-page admin-page">
      <section className="login-card">
        <img src="/assets/f3-logo.png" alt="F3 Vegetables logo" />
        <p>Owner access</p>
        <h1>Login to F3 Admin</h1>
        <span>Manage orders, update status, and publish daily offer slides.</span>
        <label>Username<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} autoComplete="username" placeholder="Enter username" /></label>
        <label>Password<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} onKeyDown={(e) => e.key === "Enter" && login()} type="password" autoComplete="current-password" placeholder="Enter password" /></label>
        <button onClick={login} type="button">Login</button>
        <small>{message}</small>
      </section>
    </main>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(() => readJson("f3-orders", []));
  const [offers, setOffers] = useState(() => readJson("f3-offers", fallbackOffers));
  const [offerForm, setOfferForm] = useState({ productId: "tomato", title: "", tag: "", price: "" });
  const [toast, setToast] = useState("");

  if (sessionStorage.getItem("f3-admin-auth") !== "yes") return <Navigate to="/admin" replace />;

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function saveOrders(nextOrders) {
    setOrders(nextOrders);
    writeJson("f3-orders", nextOrders);
  }

  function saveOffers(nextOffers) {
    setOffers(nextOffers);
    writeJson("f3-offers", nextOffers);
  }

  function updateStatus(id, status) {
    saveOrders(orders.map((order) => order.id === id ? { ...order, status } : order));
    showToast("Order status updated.");
  }

  function publishOffer() {
    const product = products.find((item) => item.id === offerForm.productId);
    const price = Number(offerForm.price || product.price);
    if (!offerForm.title.trim() || !offerForm.tag.trim() || !Number.isFinite(price)) {
      showToast("Fill offer title, tag, and price.");
      return;
    }
    saveOffers([{ productId: product.id, title: offerForm.title.trim(), tag: offerForm.tag.trim(), price }, ...offers]);
    setOfferForm({ productId: "tomato", title: "", tag: "", price: "" });
    showToast("Offer published on home page.");
  }

  const orderValue = orders.reduce((total, order) => total + Number(order.total || 0), 0);

  return (
    <div className="admin-page">
      <header className="dashboard-header">
        <LogoBrand admin />
        <div>
          <a href="/">Open Store</a>
          <button type="button" onClick={() => { sessionStorage.removeItem("f3-admin-auth"); navigate("/admin"); }}>Logout</button>
        </div>
      </header>
      <main className="dashboard-page">
        <section className="admin-stats">
          <article><span>Total orders</span><strong>{orders.length}</strong></article>
          <article><span>New orders</span><strong>{orders.filter((order) => order.status === "New").length}</strong></article>
          <article><span>Order value</span><strong>{money(orderValue)}</strong></article>
          <article><span>Offer slides</span><strong>{offers.length}</strong></article>
        </section>
        <section className="dashboard-grid">
          <div className="admin-card">
            <div className="card-head">
              <div><p>Live orders</p><h1>Customer orders</h1></div>
              <button type="button" onClick={() => saveOrders(orders.filter((order) => !["Completed", "Cancelled"].includes(order.status)))}>Clear completed</button>
            </div>
            <div className="orders-list">
              {orders.length ? orders.slice().reverse().map((order) => (
                <article className="order-row" key={order.id}>
                  <header>
                    <div><h2>{order.name}</h2><small>{order.phone} | {order.type} | {order.createdAt}</small></div>
                    <div><strong>{money(order.total)}</strong><span className="status-pill">{order.status || "New"}</span></div>
                  </header>
                  <small>{order.payment || "Payment after confirmation"}</small>
                  <ul>{(order.items || []).map((item) => <li key={item.id}>{item.name} - {item.quantity} {item.unit} - {money(item.quantity * item.price)}</li>)}</ul>
                  <small>{order.address || "No address added"}</small>
                  <div className="order-tools">
                    <select value={order.status || "New"} onChange={(e) => updateStatus(order.id, e.target.value)}>
                      {["New", "Confirmed", "Packed", "Out for delivery", "Completed", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
                    </select>
                    <button type="button" onClick={() => saveOrders(orders.filter((item) => item.id !== order.id))}>Delete</button>
                  </div>
                </article>
              )) : <div className="empty-state">No customer orders yet.</div>}
            </div>
          </div>
          <aside className="admin-card">
            <div className="card-head"><div><p>Daily offers</p><h1>Offer slides</h1></div></div>
            <div className="offer-form">
              <label>Product<select value={offerForm.productId} onChange={(e) => setOfferForm({ ...offerForm, productId: e.target.value })}>{products.map((product) => <option value={product.id} key={product.id}>{product.name}</option>)}</select></label>
              <label>Offer title<input value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })} placeholder="Tomato Flash Deal" /></label>
              <label>Offer tag<input value={offerForm.tag} onChange={(e) => setOfferForm({ ...offerForm, tag: e.target.value })} placeholder="Fresh today" /></label>
              <label>Offer price<input value={offerForm.price} onChange={(e) => setOfferForm({ ...offerForm, price: e.target.value })} type="number" placeholder="32" /></label>
              <button type="button" onClick={publishOffer}>Publish offer slide</button>
            </div>
            <div className="offers-list">
              {offers.map((offer, index) => {
                const product = products.find((item) => item.id === offer.productId) || products[0];
                return (
                  <article className="offer-row" key={`${offer.productId}-${offer.title}-${index}`}>
                    <img src={product.image} alt={offer.title} />
                    <div>
                      <small>{offer.tag}</small>
                      <strong>{offer.title}</strong>
                      <span>{money(offer.price || product.price)} / {product.unit}</span>
                      <button type="button" onClick={() => saveOffers(offers.filter((_, offerIndex) => offerIndex !== index))}>Remove</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>
        </section>
      </main>
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
