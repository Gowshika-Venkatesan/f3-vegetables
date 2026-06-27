import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "../styles.css";

const shopPhone = "917502888200";
const adminCredentials = { username: "f3admin", password: "Fresh@88200" };

const categoryMeta = {
  "Organic Products": {
    short: "Organic",
    note: "Naturally grown daily essentials",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=86"
  },
  Vegetables: {
    short: "Vegetables",
    note: "Fresh cooking vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=700&q=86"
  },
  Fruits: {
    short: "Fruits",
    note: "Seasonal and daily fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=86"
  },
  "Leafy Vegetables": {
    short: "Leafy",
    note: "Greens and herbs",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=86"
  }
};

const products = [
  { id: "organic-tomato", name: "Organic Tomato", tamil: "Organic Thakkali", category: "Organic Products", unit: "kg", price: 48, cut: 58, badge: "Organic", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=86" },
  { id: "country-eggplant", name: "Country Brinjal", tamil: "Nattu Kathirikai", category: "Organic Products", unit: "kg", price: 56, cut: 68, badge: "Farm Pick", image: "https://images.unsplash.com/photo-1604914440268-8d352fe4db95?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-carrot", name: "Organic Carrot", tamil: "Organic Carrot", category: "Organic Products", unit: "kg", price: 76, cut: 90, badge: "Organic", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-coconut", name: "Organic Coconut", tamil: "Organic Thengai", category: "Organic Products", unit: "piece", price: 42, cut: 52, badge: "Natural", image: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-lemon", name: "Organic Lemon", tamil: "Organic Elumichai", category: "Organic Products", unit: "piece", price: 8, cut: 11, badge: "Fresh", image: "https://images.unsplash.com/photo-1587496679742-bad502958fbf?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-banana", name: "Organic Banana", tamil: "Organic Vazhai Pazham", category: "Organic Products", unit: "dozen", price: 88, cut: 105, badge: "Sweet", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=86" },

  { id: "tomato", name: "Tomato", tamil: "Thakkali", category: "Vegetables", unit: "kg", price: 32, cut: 40, badge: "Daily", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=86" },
  { id: "brinjal", name: "Brinjal", tamil: "Kathirikai", category: "Vegetables", unit: "kg", price: 44, cut: 54, badge: "Fresh", image: "https://images.unsplash.com/photo-1604914440268-8d352fe4db95?auto=format&fit=crop&w=700&q=86" },
  { id: "drumstick", name: "Drumstick", tamil: "Murungakkai", category: "Vegetables", unit: "bundle", price: 38, cut: 48, badge: "Popular", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=700&q=86" },
  { id: "small-onion", name: "Small Onion", tamil: "Chinna Vengayam", category: "Vegetables", unit: "kg", price: 72, cut: 88, badge: "Kitchen", image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=700&q=86" },
  { id: "big-onion", name: "Big Onion", tamil: "Periya Vengayam", category: "Vegetables", unit: "kg", price: 42, cut: 52, badge: "Daily", image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&w=700&q=86" },
  { id: "potato", name: "Potato", tamil: "Urulai Kizhangu", category: "Vegetables", unit: "kg", price: 36, cut: 44, badge: "Daily", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=86" },
  { id: "carrot", name: "Carrot", tamil: "Carrot", category: "Vegetables", unit: "kg", price: 58, cut: 70, badge: "Fresh", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=700&q=86" },
  { id: "beans", name: "Beans", tamil: "Beans", category: "Vegetables", unit: "kg", price: 68, cut: 84, badge: "Tender", image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=700&q=86" },
  { id: "cucumber", name: "Cucumber", tamil: "Vellarikkai", category: "Vegetables", unit: "kg", price: 34, cut: 42, badge: "Cool", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=700&q=86" },
  { id: "beetroot", name: "Beetroot", tamil: "Beetroot", category: "Vegetables", unit: "kg", price: 54, cut: 66, badge: "Fresh", image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=700&q=86" },
  { id: "capsicum", name: "Capsicum", tamil: "Kudai Milagai", category: "Vegetables", unit: "kg", price: 82, cut: 98, badge: "Premium", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=86" },
  { id: "cauliflower", name: "Cauliflower", tamil: "Cauliflower", category: "Vegetables", unit: "piece", price: 46, cut: 58, badge: "Fresh", image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=700&q=86" },
  { id: "ladies-finger", name: "Ladies Finger", tamil: "Vendakkai", category: "Vegetables", unit: "kg", price: 52, cut: 64, badge: "Tender", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=700&q=86" },

  { id: "banana", name: "Banana", tamil: "Vazhai Pazham", category: "Fruits", unit: "dozen", price: 64, cut: 78, badge: "Sweet", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=86" },
  { id: "apple", name: "Apple", tamil: "Apple", category: "Fruits", unit: "kg", price: 180, cut: 220, badge: "Premium", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=700&q=86" },
  { id: "orange", name: "Orange", tamil: "Orange", category: "Fruits", unit: "kg", price: 110, cut: 135, badge: "Juicy", image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=700&q=86" },
  { id: "pomegranate", name: "Pomegranate", tamil: "Mathulai", category: "Fruits", unit: "kg", price: 210, cut: 250, badge: "Premium", image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=700&q=86" },
  { id: "grapes", name: "Grapes", tamil: "Thiratchai", category: "Fruits", unit: "kg", price: 120, cut: 145, badge: "Fresh", image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=86" },
  { id: "watermelon", name: "Watermelon", tamil: "Tharpoosani", category: "Fruits", unit: "kg", price: 28, cut: 36, badge: "Seasonal", image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=700&q=86" },
  { id: "papaya", name: "Papaya", tamil: "Pappali", category: "Fruits", unit: "kg", price: 48, cut: 60, badge: "Ripe", image: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&w=700&q=86" },
  { id: "mango", name: "Mango", tamil: "Mambazham", category: "Fruits", unit: "kg", price: 140, cut: 170, badge: "Seasonal", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=86" },

  { id: "keerai", name: "Fresh Greens", tamil: "Keerai", category: "Leafy Vegetables", unit: "bunch", price: 18, cut: 24, badge: "Morning", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=86" },
  { id: "coriander", name: "Coriander", tamil: "Kothamalli", category: "Leafy Vegetables", unit: "bunch", price: 12, cut: 16, badge: "Fresh", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=86" },
  { id: "mint", name: "Mint Leaves", tamil: "Pudina", category: "Leafy Vegetables", unit: "bunch", price: 14, cut: 18, badge: "Aroma", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=700&q=86" },
  { id: "curry-leaves", name: "Curry Leaves", tamil: "Karuveppilai", category: "Leafy Vegetables", unit: "pack", price: 10, cut: 14, badge: "Daily", image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=700&q=86" },
  { id: "spinach", name: "Spinach", tamil: "Pasalai Keerai", category: "Leafy Vegetables", unit: "bunch", price: 22, cut: 28, badge: "Healthy", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=86" },
  { id: "spring-onion", name: "Spring Onion", tamil: "Vengaya Thal", category: "Leafy Vegetables", unit: "bunch", price: 28, cut: 36, badge: "Fresh", image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=700&q=86" }
];

const starterOffers = [
  { productId: "organic-tomato", title: "Organic Tomato Pack", tag: "Royal fresh pick", price: 48 },
  { productId: "keerai", title: "Morning Greens Deal", tag: "Leafy vegetables", price: 18 },
  { productId: "banana", title: "Sweet Banana Basket", tag: "Fruit offer", price: 64 },
  { productId: "small-onion", title: "Kitchen Onion Saver", tag: "Daily essential", price: 72 }
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
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState(() => readJson("f3-cart", []));
  const [orders, setOrders] = useState(() => readJson("f3-orders", []));
  const [offers] = useState(() => readJson("f3-offers", starterOffers));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", type: "Delivery", payment: "UPI after confirmation" });

  const allCategories = ["All", ...Object.keys(categoryMeta)];

  const displayOffers = offers.map((offer) => {
    const product = products.find((item) => item.id === offer.productId) || products[0];
    return { ...offer, image: product.image, unit: product.unit, price: Number(offer.price || product.price) };
  });

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const textMatch = [product.name, product.tamil, product.category, product.badge].join(" ").toLowerCase().includes(search);
      return categoryMatch && textMatch;
    });
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function saveCart(nextCart) {
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
    saveCart(nextCart);
    showToast(`${product.name} added to basket`);
  }

  function removeFromCart(productId) {
    saveCart(cart.filter((item) => item.id !== productId));
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
    saveCart([]);
    setCustomer({ name: "", phone: "", address: "", type: "Delivery", payment: "UPI after confirmation" });
    setCheckoutOpen(false);
    showToast("Order created. Opening WhatsApp.");
    window.setTimeout(() => window.open(`https://wa.me/${shopPhone}?text=${whatsappText(order)}`, "_blank", "noreferrer"), 400);
  }

  return (
    <>
      <div className="top-line">
        <span>Premium vegetables and fruits in Karur</span>
        <span>Call 075028 88200</span>
      </div>

      <header className="royal-header">
        <LogoBrand />
        <div className="header-search">
          <span>Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Tomato, fruits, organic greens..." />
        </div>
        <nav className="customer-nav" aria-label="Store navigation">
          <a href="#categories">Categories</a>
          <a href="#offers">Offers</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="basket-button" onClick={() => setCheckoutOpen(true)} type="button">
          Basket <strong>{cartCount % 1 === 0 ? cartCount : cartCount.toFixed(1)}</strong>
        </button>
      </header>

      <main id="home">
        <section className="royal-hero">
          <div className="hero-copy">
            <p>Fresh . Fine . Fair</p>
            <h1>Karur's premium fresh basket.</h1>
            <span>Order vegetables, organic products, fruits, and leafy vegetables from F3 with a clean, quick checkout experience.</span>
            <div className="hero-actions">
              <a href="#products">Start ordering</a>
              <button onClick={() => setCategory("Organic Products")} type="button">See organic picks</button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=88" alt="Premium fresh vegetables basket" />
            <div className="hero-badge">
              <strong>Open until 9 PM</strong>
              <span>Anna Nagar, Karur</span>
            </div>
          </div>
        </section>

        <section className="royal-search-band">
          <div>
            <strong>What are you looking for today?</strong>
            <span>Search fresh stock by name, Tamil name, or category.</span>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search F3 products" />
        </section>

        <section className="section-shell" id="categories">
          <div className="section-title">
            <div>
              <p>Shop by aisle</p>
              <h2>Premium categories</h2>
            </div>
          </div>
          <div className="royal-category-grid">
            {Object.entries(categoryMeta).map(([name, meta]) => (
              <button
                className={`royal-category ${category === name ? "active" : ""}`}
                type="button"
                key={name}
                onClick={() => {
                  setCategory(name);
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <img src={meta.image} alt="" />
                <span>{meta.short}</span>
                <strong>{name}</strong>
                <small>{meta.note}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="section-shell" id="offers">
          <div className="section-title">
            <div>
              <p>Today's royal picks</p>
              <h2>Daily offers with images</h2>
            </div>
            <a href="#products">View products</a>
          </div>
          <div className="royal-offers">
            {displayOffers.map((offer) => (
              <article className="royal-offer" key={`${offer.productId}-${offer.title}`}>
                <img src={offer.image} alt={offer.title} />
                <div>
                  <span>{offer.tag}</span>
                  <strong>{offer.title}</strong>
                  <p>{money(offer.price)} / {offer.unit}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell editorial-row">
          <article>
            <span>Organic Products</span>
            <strong>Clean picks for everyday cooking</strong>
          </article>
          <article>
            <span>Leafy Vegetables</span>
            <strong>Morning greens, herbs and curry leaves</strong>
          </article>
          <article>
            <span>Fruits</span>
            <strong>Seasonal sweetness for the family</strong>
          </article>
        </section>

        <section className="section-shell product-section" id="products">
          <div className="section-title product-title">
            <div>
              <p>Build your basket</p>
              <h2>Choose fresh products</h2>
            </div>
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="low">Price low to high</option>
              <option value="high">Price high to low</option>
            </select>
          </div>

          <div className="product-tabs">
            {allCategories.map((item) => (
              <button className={category === item ? "active" : ""} type="button" key={item} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="market-layout">
            <div className="market-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
            <BasketPanel cart={cart} total={cartTotal} count={cartCount} onRemove={removeFromCart} onCheckout={() => setCheckoutOpen(true)} />
          </div>
        </section>

        <section className="section-shell trust-row">
          <article><strong>Selected fresh</strong><span>Vegetables checked before billing and packing.</span></article>
          <article><strong>Fast confirmation</strong><span>Orders are shared to WhatsApp for quick response.</span></article>
          <article><strong>Fair pricing</strong><span>Final amount confirmed by exact weight and market rate.</span></article>
        </section>

        <section className="royal-contact" id="contact">
          <div>
            <p>Visit F3 Vegetables</p>
            <h2>No 1, 5th Cross Rd, Anna Nagar, Karur</h2>
            <span>Opposite to KCP House west gate, Karur, Tamil Nadu 639002</span>
          </div>
          <div>
            <a href="tel:+917502888200">Call 075028 88200</a>
            <a href="https://www.google.com/search?q=f3+vegetables+karur" target="_blank" rel="noreferrer">Open Google listing</a>
          </div>
        </section>
      </main>

      <Footer />

      <nav className="mobile-bar" aria-label="Mobile store navigation">
        <a href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#offers">Offers</a>
        <button onClick={() => setCheckoutOpen(true)} type="button">Basket</button>
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
    <article className="premium-product">
      <div className="premium-image">
        <img src={product.image} alt={product.name} />
        <span>{product.badge}</span>
      </div>
      <div className="premium-body">
        <small>{product.category}</small>
        <h3>{product.name}</h3>
        <p>{product.tamil}</p>
        <div className="product-price">
          <strong>{money(product.price)}</strong>
          <span><s>{money(product.cut)}</s> / {product.unit}</span>
        </div>
        <div className="premium-add">
          <input type="number" min="0.5" step="0.5" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} aria-label={`Quantity for ${product.name}`} />
          <button type="button" onClick={() => onAdd(product.id, quantity)}>Add to basket</button>
        </div>
      </div>
    </article>
  );
}

function BasketPanel({ cart, total, count, onRemove, onCheckout }) {
  return (
    <aside className="royal-basket">
      <div className="basket-heading">
        <span>My Basket</span>
        <strong>{count % 1 === 0 ? count : count.toFixed(1)} items</strong>
      </div>
      <div className="basket-lines">
        {cart.length ? cart.map((item) => <BasketLine item={item} onRemove={onRemove} key={item.id} />) : <div className="empty-state">Choose products to start your basket.</div>}
      </div>
      <div className="basket-total">
        <span>Total</span>
        <strong>{money(total)}</strong>
      </div>
      <button type="button" onClick={onCheckout}>Checkout</button>
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
            <button className="close-button" onClick={onClose} type="button" aria-label="Close checkout">x</button>
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

function Footer() {
  return (
    <footer className="royal-footer">
      <div className="footer-main">
        <div>
          <img src="/assets/f3-logo.png" alt="F3 Vegetables logo" />
          <strong>F3 Vegetables</strong>
          <span>Fresh . Fine . Fair vegetables, fruits, organic products and leafy vegetables in Karur.</span>
        </div>
        <div>
          <h3>Company</h3>
          <a href="#categories">Categories</a>
          <a href="#offers">Daily offers</a>
          <a href="#products">Products</a>
        </div>
        <div>
          <h3>Categories</h3>
          <a href="#products">Organic Products</a>
          <a href="#products">Vegetables</a>
          <a href="#products">Fruits</a>
          <a href="#products">Leafy Vegetables</a>
        </div>
        <div>
          <h3>Contact</h3>
          <span>075028 88200</span>
          <span>No 1, 5th Cross Rd, Anna Nagar, Karur 639002</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>F3 Vegetables Karur</span>
        <span>Fresh produce ordering experience</span>
      </div>
    </footer>
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
  const [offers, setOffers] = useState(() => readJson("f3-offers", starterOffers));
  const [offerForm, setOfferForm] = useState({ productId: "organic-tomato", title: "", tag: "", price: "" });
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
    setOfferForm({ productId: "organic-tomato", title: "", tag: "", price: "" });
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
              <label>Offer title<input value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })} placeholder="Organic Tomato Pack" /></label>
              <label>Offer tag<input value={offerForm.tag} onChange={(e) => setOfferForm({ ...offerForm, tag: e.target.value })} placeholder="Royal fresh pick" /></label>
              <label>Offer price<input value={offerForm.price} onChange={(e) => setOfferForm({ ...offerForm, price: e.target.value })} type="number" placeholder="48" /></label>
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
