import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../styles.css";

const shopPhone = "917502888200";
const adminCredentials = { username: "f3admin", password: "Fresh@88200" };

const categories = [
  {
    name: "Organic Products",
    short: "Organic",
    story: "Direct harvest picks from trusted growers, selected for clean everyday cooking.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=88"
  },
  {
    name: "Vegetables",
    short: "Vegetables",
    story: "Daily cooking vegetables for sambar, poriyal, kurma, rasam and lunch boxes.",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=88"
  },
  {
    name: "Fruits",
    short: "Fruits",
    story: "Seasonal fruits and family packs for breakfast, snacks and fresh juice.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=88"
  },
  {
    name: "Leafy Vegetables",
    short: "Leafy",
    story: "Morning greens, coriander, mint and curry leaves for aromatic home cooking.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=88"
  }
];

const products = [
  { id: "organic-tomato", name: "Organic Tomato", tamil: "Organic Thakkali", category: "Organic Products", unit: "kg", price: 48, cut: 58, badge: "Organic", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-carrot", name: "Organic Carrot", tamil: "Organic Carrot", category: "Organic Products", unit: "kg", price: 76, cut: 90, badge: "Organic", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-coconut", name: "Organic Coconut", tamil: "Organic Thengai", category: "Organic Products", unit: "piece", price: 42, cut: 52, badge: "Natural", image: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-banana", name: "Organic Banana", tamil: "Organic Vazhai Pazham", category: "Organic Products", unit: "dozen", price: 88, cut: 105, badge: "Sweet", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=86" },
  { id: "organic-lemon", name: "Organic Lemon", tamil: "Organic Elumichai", category: "Organic Products", unit: "piece", price: 8, cut: 11, badge: "Fresh", image: "https://images.unsplash.com/photo-1587496679742-bad502958fbf?auto=format&fit=crop&w=700&q=86" },

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

const defaultOffers = [
  { productId: "organic-tomato", title: "Organic Fresh Pack", tag: "Harvest direct", price: 48, code: "F3FRESH" },
  { productId: "keerai", title: "Leafy Morning Saver", tag: "Today only", price: 18, code: "GREENS" },
  { productId: "banana", title: "Family Fruit Basket", tag: "Sweet stock", price: 64, code: "FRUIT" }
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

function App() {
  const [cart, setCart] = useState(() => readJson("f3-cart", []));
  const [orders, setOrders] = useState(() => readJson("f3-orders", []));
  const [offers, setOffers] = useState(() => readJson("f3-offers", defaultOffers));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState("");

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

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage cartCount={cartCount} offers={offers} onOpenCart={() => setCheckoutOpen(true)} />} />
        <Route path="/products" element={<ProductsPage cart={cart} cartCount={cartCount} cartTotal={cartTotal} onAdd={addToCart} onRemove={removeFromCart} onOpenCart={() => setCheckoutOpen(true)} />} />
        <Route path="/contact" element={<ContactPage cartCount={cartCount} onOpenCart={() => setCheckoutOpen(true)} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard orders={orders} setOrders={setOrders} offers={offers} setOffers={setOffers} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CheckoutModal
        open={checkoutOpen}
        cart={cart}
        total={cartTotal}
        onClose={() => setCheckoutOpen(false)}
        onRemove={removeFromCart}
        onOrder={(order) => {
          const nextOrders = [...orders, order];
          setOrders(nextOrders);
          writeJson("f3-orders", nextOrders);
          saveCart([]);
          setCheckoutOpen(false);
          showToast("Order created. Opening WhatsApp.");
        }}
      />
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </BrowserRouter>
  );
}

function Layout({ children, cartCount, onOpenCart }) {
  const location = useLocation();
  const active = location.pathname;
  return (
    <>
      <div className="top-strip">
        <span>Fresh harvest, premium selection, Karur delivery</span>
        <span>Call 075028 88200</span>
      </div>
      <header className="site-header">
        <Link className="brand" to="/">
          <img src="/assets/f3-logo.png" alt="F3 Vegetables logo" />
          <span><strong>F3 Vegetables</strong><small>Fresh . Fine . Fair</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link className={active === "/" ? "active" : ""} to="/">Home</Link>
          <Link className={active === "/products" ? "active" : ""} to="/products">Products</Link>
          <Link className={active === "/contact" ? "active" : ""} to="/contact">Contact</Link>
        </nav>
        <button className="cart-button" type="button" onClick={onOpenCart}>Cart <strong>{cartCount % 1 === 0 ? cartCount : cartCount.toFixed(1)}</strong></button>
      </header>
      {children}
      <Footer />
      <nav className="mobile-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <button type="button" onClick={onOpenCart}>Cart</button>
      </nav>
    </>
  );
}

function HomePage({ cartCount, offers, onOpenCart }) {
  const displayOffers = offers.map((offer) => {
    const product = products.find((item) => item.id === offer.productId) || products[0];
    return { ...offer, product, image: product.image, unit: product.unit, price: Number(offer.price || product.price) };
  });

  return (
    <Layout cartCount={cartCount} onOpenCart={onOpenCart}>
      <main>
        <section className="home-hero">
          <div className="home-copy">
            <p>Premium vegetable market</p>
            <h1>Fresh produce with a royal touch.</h1>
            <span>Order organic products, vegetables, fruits and leafy vegetables from F3 Vegetables, Anna Nagar, Karur.</span>
            <div className="hero-actions">
              <Link to="/products">Shop products</Link>
              <Link to="/contact">Visit store</Link>
            </div>
          </div>
          <div className="home-visual">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1500&q=90" alt="Fresh vegetable baskets" />
            <div><strong>Open until 9 PM</strong><span>Anna Nagar, Karur</span></div>
          </div>
        </section>

        <section className="story-band">
          <div>
            <p>Harvest to home</p>
            <h2>Selected close to source, packed for your kitchen.</h2>
          </div>
          <span>For organic products, we can highlight farm sourcing, morning harvest, cleaning, sorting and fast local delivery.</span>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div><p>Today at F3</p><h2>Daily offer carousel</h2></div>
            <Link to="/products">Shop all</Link>
          </div>
          <div className="campaign-carousel">
            {displayOffers.map((offer) => (
              <article className="campaign-slide" key={`${offer.productId}-${offer.title}`}>
                <div>
                  <small>{offer.tag}</small>
                  <h3>{offer.title}</h3>
                  <strong>{money(offer.price)} / {offer.unit}</strong>
                  <span>Use code: {offer.code || "F3FRESH"}</span>
                </div>
                <img src={offer.image} alt={offer.title} />
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div><p>Shop by page</p><h2>Explore categories</h2></div>
          </div>
          <div className="home-categories">
            {categories.map((category) => (
              <Link className="category-card" to={`/products?category=${encodeURIComponent(category.name)}`} key={category.name}>
                <img src={category.image} alt={category.name} />
                <div>
                  <span>{category.short}</span>
                  <strong>{category.name}</strong>
                  <small>{category.story}</small>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="page-section process-section">
          <article><span>01</span><strong>Morning sourcing</strong><p>Products are chosen for freshness before they enter the basket.</p></article>
          <article><span>02</span><strong>Sorting and packing</strong><p>Vegetables are checked, grouped and prepared for pickup or delivery.</p></article>
          <article><span>03</span><strong>Order confirmation</strong><p>The shop confirms exact stock, weight and final bill through WhatsApp.</p></article>
        </section>
      </main>
    </Layout>
  );
}

function ProductsPage({ cart, cartCount, cartTotal, onAdd, onRemove, onOpenCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "All";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const allCategories = ["All", ...categories.map((item) => item.name)];
  const filtered = useMemo(() => {
    const search = query.toLowerCase().trim();
    const list = products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const textMatch = [product.name, product.tamil, product.category, product.badge].join(" ").toLowerCase().includes(search);
      return categoryMatch && textMatch;
    });
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <Layout cartCount={cartCount} onOpenCart={onOpenCart}>
      <main>
        <section className="products-hero">
          <div>
            <p>F3 product market</p>
            <h1>Choose products for your fresh basket.</h1>
            <span>Smaller cards, realistic product images, category filters and a basket that stays ready while you shop.</span>
          </div>
        </section>

        <section className="product-toolbar">
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search tomato, apple, keerai..." />
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price low to high</option>
            <option value="high">Price high to low</option>
          </select>
        </section>

        <section className="product-page-layout">
          <aside className="category-sidebar">
            <strong>Categories</strong>
            {allCategories.map((item) => (
              <button className={category === item ? "active" : ""} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </aside>
          <div className="compact-grid">
            {filtered.map((product) => <ProductCard product={product} onAdd={onAdd} key={product.id} />)}
          </div>
          <BasketPanel cart={cart} total={cartTotal} count={cartCount} onRemove={onRemove} onCheckout={onOpenCart} />
        </section>
      </main>
    </Layout>
  );
}

function ContactPage({ cartCount, onOpenCart }) {
  return (
    <Layout cartCount={cartCount} onOpenCart={onOpenCart}>
      <main>
        <section className="contact-hero">
          <div>
            <p>Visit F3 Vegetables</p>
            <h1>Fresh produce in Anna Nagar, Karur.</h1>
            <span>No 1, 5th Cross Rd, opposite to KCP House west gate, Anna Nagar, Karur, Tamil Nadu 639002.</span>
          </div>
        </section>
        <section className="contact-grid">
          <article><strong>Phone</strong><a href="tel:+917502888200">075028 88200</a></article>
          <article><strong>Hours</strong><span>Open until 9 PM</span></article>
          <article><strong>Map</strong><a href="https://www.google.com/search?q=f3+vegetables+karur" target="_blank" rel="noreferrer">Open Google listing</a></article>
        </section>
      </main>
    </Layout>
  );
}

function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <article className="small-product-card">
      <div className="small-product-image">
        <img src={product.image} alt={product.name} />
        <span>{product.badge}</span>
      </div>
      <div className="small-product-body">
        <small>{product.category}</small>
        <h3>{product.name}</h3>
        <p>{product.tamil}</p>
        <div className="small-price"><strong>{money(product.price)}</strong><span><s>{money(product.cut)}</s> / {product.unit}</span></div>
        <div className="small-add">
          <input value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} type="number" min="0.5" step="0.5" />
          <button type="button" onClick={() => onAdd(product.id, quantity)}>Add</button>
        </div>
      </div>
    </article>
  );
}

function BasketPanel({ cart, total, count, onRemove, onCheckout }) {
  return (
    <aside className="basket-panel">
      <div className="basket-title"><span>My Basket</span><strong>{count % 1 === 0 ? count : count.toFixed(1)} items</strong></div>
      <div className="basket-list">
        {cart.length ? cart.map((item) => <BasketLine item={item} onRemove={onRemove} key={item.id} />) : <div className="empty-state">Add products to start your basket.</div>}
      </div>
      <div className="basket-total"><span>Total</span><strong>{money(total)}</strong></div>
      <button type="button" onClick={onCheckout}>Checkout</button>
    </aside>
  );
}

function BasketLine({ item, onRemove }) {
  return (
    <div className="basket-line">
      <div><strong>{item.name}</strong><small>{item.quantity} {item.unit} x {money(item.price)}</small></div>
      <div><strong>{money(item.quantity * item.price)}</strong><button type="button" onClick={() => onRemove(item.id)}>Remove</button></div>
    </div>
  );
}

function CheckoutModal({ open, cart, total, onClose, onRemove, onOrder }) {
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", type: "Delivery", payment: "UPI after confirmation" });
  if (!open) return null;

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
    if (!cart.length || !customer.name.trim() || !customer.phone.trim()) return;
    const order = {
      id: crypto.randomUUID(),
      ...customer,
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      status: "New",
      total,
      items: cart,
      createdAt: new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date())
    };
    onOrder(order);
    window.setTimeout(() => window.open(`https://wa.me/${shopPhone}?text=${whatsappText(order)}`, "_blank", "noreferrer"), 300);
  }

  return (
    <div className="modal-backdrop">
      <section className="checkout-modal">
        <div className="modal-head"><div><p>F3 checkout</p><h2>Complete your order</h2></div><button type="button" onClick={onClose}>x</button></div>
        <div className="checkout-items">{cart.length ? cart.map((item) => <BasketLine item={item} onRemove={onRemove} key={item.id} />) : <div className="empty-state">Basket is empty.</div>}</div>
        <div className="basket-total"><span>Total</span><strong>{money(total)}</strong></div>
        <div className="checkout-form">
          <label>Name<input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></label>
          <label>Mobile<input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></label>
          <label>Order type<select value={customer.type} onChange={(e) => setCustomer({ ...customer, type: e.target.value })}><option>Delivery</option><option>Pickup</option></select></label>
          <label>Payment<select value={customer.payment} onChange={(e) => setCustomer({ ...customer, payment: e.target.value })}><option>UPI after confirmation</option><option>Cash on delivery</option><option>Pay at store</option></select></label>
          <label className="wide-field">Address<textarea rows="3" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></label>
        </div>
        <button className="place-order" type="button" onClick={placeOrder}>Place order on WhatsApp</button>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div><img src="/assets/f3-logo.png" alt="F3 Vegetables logo" /><strong>F3 Vegetables</strong><span>Fresh . Fine . Fair produce in Karur.</span></div>
        <div><h3>Pages</h3><Link to="/">Home</Link><Link to="/products">Products</Link><Link to="/contact">Contact</Link></div>
        <div><h3>Categories</h3><Link to="/products?category=Organic%20Products">Organic Products</Link><Link to="/products?category=Vegetables">Vegetables</Link><Link to="/products?category=Fruits">Fruits</Link><Link to="/products?category=Leafy%20Vegetables">Leafy Vegetables</Link></div>
        <div><h3>Contact</h3><span>075028 88200</span><span>No 1, 5th Cross Rd, Anna Nagar, Karur 639002</span></div>
      </div>
      <div className="footer-bottom"><span>F3 Vegetables Karur</span><span>Premium fresh ordering experience</span></div>
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
        <label>Username<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} onKeyDown={(e) => e.key === "Enter" && login()} /></label>
        <button onClick={login} type="button">Login</button>
        <small>{message}</small>
      </section>
    </main>
  );
}

function AdminDashboard({ orders, setOrders, offers, setOffers }) {
  const navigate = useNavigate();
  const [offerForm, setOfferForm] = useState({ productId: "organic-tomato", title: "", tag: "", price: "", code: "" });
  if (sessionStorage.getItem("f3-admin-auth") !== "yes") return <Navigate to="/admin" replace />;

  function saveOrders(nextOrders) {
    setOrders(nextOrders);
    writeJson("f3-orders", nextOrders);
  }

  function saveOffers(nextOffers) {
    setOffers(nextOffers);
    writeJson("f3-offers", nextOffers);
  }

  function publishOffer() {
    const product = products.find((item) => item.id === offerForm.productId);
    const price = Number(offerForm.price || product.price);
    if (!offerForm.title.trim() || !offerForm.tag.trim()) return;
    saveOffers([{ productId: product.id, title: offerForm.title.trim(), tag: offerForm.tag.trim(), price, code: offerForm.code || "F3FRESH" }, ...offers]);
    setOfferForm({ productId: "organic-tomato", title: "", tag: "", price: "", code: "" });
  }

  const orderValue = orders.reduce((total, order) => total + Number(order.total || 0), 0);

  return (
    <div className="admin-page">
      <header className="dashboard-header">
        <Link className="brand" to="/"><img src="/assets/f3-logo.png" alt="F3 Vegetables logo" /><span><strong>F3 Admin</strong><small>Orders and offers</small></span></Link>
        <div><Link to="/">Open Store</Link><button type="button" onClick={() => { sessionStorage.removeItem("f3-admin-auth"); navigate("/admin"); }}>Logout</button></div>
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
            <div className="card-head"><div><p>Live orders</p><h1>Customer orders</h1></div></div>
            <div className="orders-list">
              {orders.length ? orders.slice().reverse().map((order) => (
                <article className="order-row" key={order.id}>
                  <header><div><h2>{order.name}</h2><small>{order.phone} | {order.type} | {order.createdAt}</small></div><strong>{money(order.total)}</strong></header>
                  <ul>{(order.items || []).map((item) => <li key={item.id}>{item.name} - {item.quantity} {item.unit}</li>)}</ul>
                  <select value={order.status || "New"} onChange={(e) => saveOrders(orders.map((item) => item.id === order.id ? { ...item, status: e.target.value } : item))}>
                    {["New", "Confirmed", "Packed", "Out for delivery", "Completed", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
                  </select>
                </article>
              )) : <div className="empty-state">No customer orders yet.</div>}
            </div>
          </div>
          <aside className="admin-card">
            <div className="card-head"><div><p>Daily offers</p><h1>Offer slides</h1></div></div>
            <div className="offer-form">
              <label>Product<select value={offerForm.productId} onChange={(e) => setOfferForm({ ...offerForm, productId: e.target.value })}>{products.map((product) => <option value={product.id} key={product.id}>{product.name}</option>)}</select></label>
              <label>Title<input value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })} /></label>
              <label>Tag<input value={offerForm.tag} onChange={(e) => setOfferForm({ ...offerForm, tag: e.target.value })} /></label>
              <label>Price<input value={offerForm.price} onChange={(e) => setOfferForm({ ...offerForm, price: e.target.value })} type="number" /></label>
              <label>Code<input value={offerForm.code} onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value })} /></label>
              <button type="button" onClick={publishOffer}>Publish offer slide</button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
