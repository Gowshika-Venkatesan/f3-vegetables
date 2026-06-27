import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../styles.css";

const shopPhone = "917502888200";
const adminCredentials = { username: "f3admin", password: "Fresh@88200" };

function photo(query, size = "800x800") {
  const photos = [
    ["coriander|cilantro", "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=86"],
    ["mint", "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=900&q=86"],
    ["curry", "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=86"],
    ["spinach|leafy|greens|amaranth", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=86"],
    ["tomato", "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=86"],
    ["carrot", "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=900&q=86"],
    ["coconut", "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=900&q=86"],
    ["banana chips", "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=86"],
    ["banana", "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=86"],
    ["lemon", "https://images.unsplash.com/photo-1587496679742-bad502958fbf?auto=format&fit=crop&w=900&q=86"],
    ["eggplant|brinjal", "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=86"],
    ["drumstick|moringa", "https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?auto=format&fit=crop&w=900&q=86"],
    ["small red onions|shallots", "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=86"],
    ["onion", "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&w=900&q=86"],
    ["potato", "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=86"],
    ["beans", "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=900&q=86"],
    ["cucumber", "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=900&q=86"],
    ["beetroot", "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=900&q=86"],
    ["pepper|capsicum", "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=900&q=86"],
    ["cauliflower", "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=900&q=86"],
    ["apple", "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=86"],
    ["orange", "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=900&q=86"],
    ["pomegranate", "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=900&q=86"],
    ["grapes", "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=900&q=86"],
    ["watermelon", "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=900&q=86"],
    ["mango", "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=86"],
    ["oil", "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=86"],
    ["sesame", "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=900&q=86"],
    ["cookies", "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=86"],
    ["cut mixed|cut vegetables", "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=86"],
    ["jasmine|marigold|flowers", "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=86"],
    ["snacks|nuts|chips", "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=86"],
    ["fruits", "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=86"],
    ["organic|vegetables|market|basket|grocery", "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=86"]
  ];
  const normalized = query.toLowerCase();
  const match = photos.find(([keys]) => keys.split("|").some((key) => normalized.includes(key)));
  return match ? match[1] : "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=86";
}

const categories = [
  { name: "Vegetables", label: "Fresh Vegetables", image: photo("fresh vegetables market basket", "900x900"), note: "Daily cooking" },
  { name: "Leafy Vegetables", label: "Leafy and Seasonings", image: photo("fresh leafy greens coriander spinach", "900x900"), note: "Morning bunches" },
  { name: "Fruits", label: "Fruits", image: photo("fresh fruits basket indian market", "900x900"), note: "Seasonal stock" },
  { name: "Oils", label: "Oils", image: photo("cold pressed cooking oil bottles", "900x900"), note: "Kitchen essentials" },
  { name: "Organic Snacks", label: "Organic Snacks", image: photo("healthy organic snacks nuts chips", "900x900"), note: "Healthy bites" },
  { name: "Organic Products", label: "Organic Products", image: photo("organic vegetables grocery store", "900x900"), note: "Farm sorted" },
  { name: "Fresh Cuts", label: "Fresh Cuts", image: photo("cut vegetables ready to cook", "900x900"), note: "Ready to cook" },
  { name: "Flowers", label: "Flowers", image: photo("fresh jasmine marigold flowers indian market", "900x900"), note: "Pooja daily" }
];

const storeSteps = [
  { code: "01", title: "Morning market selection", text: "Vegetables are picked for daily cooking needs, not for photo-show only." },
  { code: "02", title: "Sorted before packing", text: "Damaged pieces can be removed and the final quantity is confirmed before billing." },
  { code: "03", title: "WhatsApp confirmation", text: "F3 confirms rate, availability and delivery or pickup timing with the customer." },
  { code: "04", title: "Karur local support", text: "Direct shop contact for urgent family orders, functions and bulk vegetable lists." }
];

const products = [
  { id: "organic-tomato", name: "Organic Tomato", tamil: "Organic Thakkali", category: "Organic Products", unit: "kg", price: 48, cut: 58, badge: "Organic", image: photo("organic tomato vegetable close up", "700x700") },
  { id: "organic-carrot", name: "Organic Carrot", tamil: "Organic Carrot", category: "Organic Products", unit: "kg", price: 76, cut: 90, badge: "Organic", image: photo("organic carrots bunch", "700x700") },
  { id: "organic-coconut", name: "Organic Coconut", tamil: "Organic Thengai", category: "Organic Products", unit: "piece", price: 42, cut: 52, badge: "Natural", image: photo("fresh coconut grocery", "700x700") },
  { id: "organic-banana", name: "Organic Banana", tamil: "Organic Vazhai Pazham", category: "Organic Products", unit: "dozen", price: 88, cut: 105, badge: "Sweet", image: photo("organic bananas bunch", "700x700") },
  { id: "organic-lemon", name: "Organic Lemon", tamil: "Organic Elumichai", category: "Organic Products", unit: "piece", price: 8, cut: 11, badge: "Fresh", image: photo("fresh lemons market", "700x700") },
  { id: "tomato", name: "Indian Tomato", tamil: "Thakkali", category: "Vegetables", unit: "kg", price: 32, cut: 40, badge: "8 mins", image: photo("fresh indian tomatoes", "700x700") },
  { id: "brinjal", name: "Brinjal", tamil: "Kathirikai", category: "Vegetables", unit: "kg", price: 44, cut: 54, badge: "8 mins", image: photo("purple eggplant brinjal", "700x700") },
  { id: "drumstick", name: "Drumstick", tamil: "Murungakkai", category: "Vegetables", unit: "bundle", price: 38, cut: 48, badge: "8 mins", image: photo("moringa drumstick vegetable", "700x700") },
  { id: "small-onion", name: "Small Onion", tamil: "Chinna Vengayam", category: "Vegetables", unit: "kg", price: 72, cut: 88, badge: "Kitchen", image: photo("small red onions shallots", "700x700") },
  { id: "big-onion", name: "Onion", tamil: "Vengayam", category: "Vegetables", unit: "kg", price: 42, cut: 52, badge: "8 mins", image: photo("red onion grocery", "700x700") },
  { id: "potato", name: "Potato", tamil: "Urulai Kizhangu", category: "Vegetables", unit: "kg", price: 36, cut: 44, badge: "8 mins", image: photo("fresh potatoes market", "700x700") },
  { id: "carrot", name: "Carrot", tamil: "Carrot", category: "Vegetables", unit: "kg", price: 58, cut: 70, badge: "Fresh", image: photo("fresh carrots bunch market", "700x700") },
  { id: "beans", name: "Beans", tamil: "Beans", category: "Vegetables", unit: "kg", price: 68, cut: 84, badge: "Tender", image: photo("fresh green beans", "700x700") },
  { id: "cucumber", name: "Cucumber", tamil: "Vellarikkai", category: "Vegetables", unit: "kg", price: 34, cut: 42, badge: "Cool", image: photo("fresh cucumbers market", "700x700") },
  { id: "beetroot", name: "Beetroot", tamil: "Beetroot", category: "Vegetables", unit: "kg", price: 54, cut: 66, badge: "Fresh", image: photo("fresh beetroot bunch", "700x700") },
  { id: "capsicum", name: "Capsicum", tamil: "Kudai Milagai", category: "Vegetables", unit: "kg", price: 82, cut: 98, badge: "Premium", image: photo("green bell pepper capsicum", "700x700") },
  { id: "cauliflower", name: "Cauliflower", tamil: "Cauliflower", category: "Vegetables", unit: "piece", price: 46, cut: 58, badge: "Fresh", image: photo("fresh cauliflower grocery", "700x700") },
  { id: "banana", name: "Banana", tamil: "Vazhai Pazham", category: "Fruits", unit: "dozen", price: 64, cut: 78, badge: "Sweet", image: photo("fresh bananas bunch", "700x700") },
  { id: "apple", name: "Apple", tamil: "Apple", category: "Fruits", unit: "kg", price: 180, cut: 220, badge: "Premium", image: photo("fresh red apples", "700x700") },
  { id: "orange", name: "Orange", tamil: "Orange", category: "Fruits", unit: "kg", price: 110, cut: 135, badge: "Juicy", image: photo("fresh oranges fruit", "700x700") },
  { id: "pomegranate", name: "Pomegranate", tamil: "Mathulai", category: "Fruits", unit: "kg", price: 210, cut: 250, badge: "Premium", image: photo("fresh pomegranate fruit", "700x700") },
  { id: "grapes", name: "Grapes", tamil: "Thiratchai", category: "Fruits", unit: "kg", price: 120, cut: 145, badge: "Fresh", image: photo("fresh grapes bunch", "700x700") },
  { id: "watermelon", name: "Watermelon", tamil: "Tharpoosani", category: "Fruits", unit: "kg", price: 28, cut: 36, badge: "Seasonal", image: photo("fresh watermelon slices", "700x700") },
  { id: "mango", name: "Mango", tamil: "Mambazham", category: "Fruits", unit: "kg", price: 140, cut: 170, badge: "Seasonal", image: photo("fresh mangoes market", "700x700") },
  { id: "keerai", name: "Fresh Greens", tamil: "Keerai", category: "Leafy Vegetables", unit: "bunch", price: 18, cut: 24, badge: "8 mins", image: photo("amaranth spinach greens bunch", "700x700") },
  { id: "coriander", name: "Coriander Leaves", tamil: "Kothamalli", category: "Leafy Vegetables", unit: "bunch", price: 12, cut: 16, badge: "8 mins", image: photo("fresh coriander cilantro bunch", "700x700") },
  { id: "mint", name: "Mint Leaves", tamil: "Pudina", category: "Leafy Vegetables", unit: "bunch", price: 14, cut: 18, badge: "8 mins", image: photo("fresh mint leaves bunch", "700x700") },
  { id: "curry-leaves", name: "Curry Leaves", tamil: "Karuveppilai", category: "Leafy Vegetables", unit: "pack", price: 10, cut: 14, badge: "8 mins", image: photo("fresh curry leaves", "700x700") },
  { id: "spinach", name: "Spinach", tamil: "Pasalai Keerai", category: "Leafy Vegetables", unit: "bunch", price: 22, cut: 28, badge: "Healthy", image: photo("fresh spinach bunch", "700x700") },
  { id: "groundnut-oil", name: "Groundnut Oil", tamil: "Kadalai Ennai", category: "Oils", unit: "litre", price: 210, cut: 235, badge: "Cold press", image: photo("groundnut peanut oil bottle", "700x700") },
  { id: "gingelly-oil", name: "Gingelly Oil", tamil: "Nallennai", category: "Oils", unit: "litre", price: 260, cut: 290, badge: "Kitchen", image: photo("sesame oil bottle", "700x700") },
  { id: "banana-chips", name: "Banana Chips", tamil: "Vazhai Chips", category: "Organic Snacks", unit: "pack", price: 85, cut: 100, badge: "Snack", image: photo("banana chips snack", "700x700") },
  { id: "millet-cookies", name: "Millet Cookies", tamil: "Thinai Cookies", category: "Organic Snacks", unit: "pack", price: 120, cut: 145, badge: "Organic", image: photo("millet cookies healthy snack", "700x700") },
  { id: "cut-veg-mix", name: "Cut Veg Mix", tamil: "Cut Kai Mix", category: "Fresh Cuts", unit: "pack", price: 65, cut: 80, badge: "Ready", image: photo("cut mixed vegetables pack", "700x700") },
  { id: "pooja-flowers", name: "Pooja Flowers", tamil: "Poo Malai", category: "Flowers", unit: "pack", price: 45, cut: 55, badge: "Morning", image: photo("jasmine marigold flowers market", "700x700") }
];

const defaultOffers = [
  { productId: "organic-tomato", title: "Get 15% off on organic basket", tag: "Harvest direct", price: 48, code: "F3FRESH" },
  { productId: "keerai", title: "Morning greens from Rs. 18", tag: "Leafy vegetables", price: 18, code: "GREENS" },
  { productId: "banana", title: "Family fruit basket offer", tag: "Sweet stock", price: 64, code: "FRUIT" }
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

function TopIcon({ name }) {
  const icons = {
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 10v6" /><path d="M12 7.5h.01" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    phone: <><path d="M6.6 4.8 9 4.2l1.4 4-1.5.9c.8 1.8 2.2 3.2 4 4l.9-1.5 4 1.4-.6 2.4c-.2.9-1 1.5-1.9 1.4C9.8 16.5 5.5 12.2 5.2 6.7c-.1-.9.5-1.7 1.4-1.9Z" /></>,
    sale: <><path d="M13 2 5 13h6l-1 9 8-12h-6l1-8Z" /></>,
    facebook: <><path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.3l.7-3h-3V9c0-.6.4-1 1-1Z" /></>,
    instagram: <><rect x="5" y="5" width="14" height="14" rx="4" /><circle cx="12" cy="12" r="3.2" /><path d="M16.5 7.5h.01" /></>,
    youtube: <><rect x="3.5" y="6.5" width="17" height="11" rx="3" /><path d="m10.5 9.5 5 2.5-5 2.5Z" /></>
  };
  return <svg className="top-svg" viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}

function App() {
  const [cart, setCart] = useState(() => readJson("f3-cart", []));
  const [orders, setOrders] = useState(() => readJson("f3-orders", []));
  const [offers, setOffers] = useState(() => readJson("f3-offers", defaultOffers));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState("");

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
    showToast(`${product.name} added to cart`);
  }

  function removeFromCart(productId) {
    saveCart(cart.filter((item) => item.id !== productId));
  }

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q") || "");
  }, [location.search]);

  function submitSearch(event) {
    event.preventDefault();
    const clean = searchTerm.trim();
    navigate(clean ? `/products?q=${encodeURIComponent(clean)}` : "/products");
  }

  return (
    <>
      <div className="app-strip">
        <span><TopIcon name="info" />About Us</span>
        <span><TopIcon name="clock" />8:00 AM - 9:30 PM</span>
        <span><TopIcon name="phone" />+91 75028 88200</span>
        <strong><TopIcon name="sale" />Flash Sale: Fresh vegetables at best prices!</strong>
        <span className="social-icons"><TopIcon name="facebook" /><TopIcon name="instagram" /><TopIcon name="youtube" /></span>
        <span>Customer Support</span>
      </div>
      <header className="pluckk-header">
        <Link className="brand" to="/">
          <img src="/assets/f3-logo.png" alt="F3 Vegetables logo" />
          <span><strong>F3 Vegetables</strong><small>Fresh . Fine . Fair</small></span>
        </Link>
        <form className="search-box" onSubmit={submitSearch}>
          <label htmlFor="site-search">Search</label>
          <input
            id="site-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search from our fresh products"
          />
          <button type="submit" aria-label="Search products">Go</button>
        </form>
        <nav className="nav-links">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
          <Link className={location.pathname === "/products" ? "active" : ""} to="/products">Products</Link>
          <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">Contact</Link>
        </nav>
        <button className="cart-chip" type="button" onClick={onOpenCart}>Cart <strong>{cartCount % 1 === 0 ? cartCount : cartCount.toFixed(1)}</strong></button>
      </header>
      <nav className="category-nav" aria-label="Shop categories">
        {categories.slice(0, 6).map((category) => (
          <Link to={`/products?category=${encodeURIComponent(category.name)}`} key={category.name}>
            <img src={category.image} alt="" />
            <span>{category.label}</span>
          </Link>
        ))}
      </nav>
      {children}
      <Footer />
      <nav className="mobile-tabs">
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
        <section className="home-intro">
          <div>
            <p>Fresh harvest marketplace</p>
            <h1>Fresh fruits and vegetables, much closer to home.</h1>
            <span>F3 Vegetables brings organic products, daily vegetables, fruits and leafy greens to families around Anna Nagar, Karur.</span>
            <div className="hero-buttons">
              <Link to="/products">Shop now</Link>
              <Link to="/contact">Visit store</Link>
            </div>
          </div>
          <img src="/assets/vegetable-shelf.png" alt="Fresh vegetables arranged in a supermarket display" />
        </section>

        <section className="wide-shell">
          <div className="section-title">
            <div><p>Today's offers</p><h2>Fresh campaign banners</h2></div>
            <Link to="/products">View all</Link>
          </div>
          <div className="offer-carousel">
            {displayOffers.map((offer) => (
              <article className="offer-banner" key={`${offer.productId}-${offer.title}`}>
                <div>
                  <small>{offer.tag}</small>
                  <h3>{offer.title}</h3>
                  <strong>{money(offer.price)} / {offer.unit}</strong>
                  <span>Use Code: {offer.code || "F3FRESH"}</span>
                </div>
                <img src={offer.image} alt={offer.title} />
              </article>
            ))}
          </div>
        </section>

        <section className="wide-shell store-process">
          <div className="process-photo">
            <img src="/assets/vegetable-shelf.png" alt="Fresh vegetable store counter" />
            <div><strong>Fresh . Fine . Fair</strong><span>Sorted with the care of a local Karur vegetable shop.</span></div>
          </div>
          <div className="process-content">
            <p>Why customers choose F3</p>
            <h2>Built like a clean neighbourhood supermarket, run like a trusted local shop.</h2>
            <div className="process-steps">
              {storeSteps.map((step) => (
                <article key={step.code}>
                  <strong>{step.code}</strong>
                  <div><h3>{step.title}</h3><span>{step.text}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wide-shell">
          <div className="section-title"><div><p>Shop by section</p><h2>Fresh varieties at F3</h2></div></div>
          <div className="category-showcase">
            {categories.map((category) => (
              <Link className="category-round" to={`/products?category=${encodeURIComponent(category.name)}`} key={category.name}>
                <img src={category.image} alt={category.name} />
                <strong>{category.label}</strong>
                <span>{category.note}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="wide-shell harvest-story">
          <div><p>From harvest to basket</p><h2>Organic products deserve their own story.</h2></div>
          <span>On the products page, customers can browse organic items separately and learn how F3 can source selected produce from harvest partners, sort it, pack it, and confirm the order through WhatsApp.</span>
        </section>
      </main>
    </Layout>
  );
}

function ProductsPage({ cart, cartCount, cartTotal, onAdd, onRemove, onOpenCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";
  const [category, setCategory] = useState(initialQuery ? "All" : params.get("category") || "All");
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search);
    const nextQuery = nextParams.get("q") || "";
    setQuery(nextQuery);
    setCategory(nextQuery ? "All" : nextParams.get("category") || "All");
  }, [location.search]);
  const allCategories = ["All", ...categories.map((item) => item.name)];
  const activeCategory = categories.find((item) => item.name === category) || categories[0];
  const categoryTitle = category === "All" ? "Fresh Vegetables" : activeCategory.label;
  const quickFilters = ["Filters", "Gourd", "Beans", "Potato", "Type", "Brand", "Customer Ratings", "Sort By"];
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
        <section className="market-header">
          <Link to="/" className="back-link" aria-label="Back to home">&lt;</Link>
          <img src={activeCategory.image} alt={categoryTitle} />
          <div><h1>{categoryTitle}</h1><span>{filtered.length} items</span></div>
          <button type="button" aria-label="Search products">Search</button>
        </section>
        <section className="market-shell">
          <aside className="filter-panel">
            {allCategories.filter((item) => item !== "All").map((item) => {
              const detail = categories.find((entry) => entry.name === item);
              return (
                <button className={category === item ? "active" : ""} type="button" key={item} onClick={() => setCategory(item)}>
                  <img src={detail.image} alt="" />
                  <span>{detail.label}</span>
                </button>
              );
            })}
          </aside>
          <div className="market-products">
            <div className="filter-pills">
              {quickFilters.map((item) => <button type="button" key={item}>{item}</button>)}
              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
                <option value="featured">Featured</option>
                <option value="low">Price low to high</option>
                <option value="high">Price high to low</option>
              </select>
            </div>
            <div className="product-search">
              <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search tomato, coriander, potato..." />
            </div>
            <div className="product-grid">
              {filtered.map((product) => <ProductCard product={product} onAdd={onAdd} key={product.id} />)}
            </div>
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
        <section className="contact-top">
          <p>Contact</p>
          <h1>Visit F3 Vegetables in Anna Nagar, Karur.</h1>
          <span>No 1, 5th Cross Rd, opposite to KCP House west gate, Anna Nagar, Karur, Tamil Nadu 639002.</span>
        </section>
        <section className="contact-cards">
          <article><strong>Phone</strong><a href="tel:+917502888200">075028 88200</a></article>
          <article><strong>Hours</strong><span>Open until 9 PM</span></article>
          <article><strong>Maps</strong><a href="https://www.google.com/search?q=f3+vegetables+karur" target="_blank" rel="noreferrer">Open Google listing</a></article>
        </section>
      </main>
    </Layout>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
      </div>
      <button className="quick-add" type="button" onClick={() => onAdd(product.id, 1)} aria-label={`Add ${product.name}`}>+</button>
      <div className="product-info">
        <small>{product.badge}</small>
        <h3>{product.name} ({product.tamil})</h3>
        <p>Fresh stock selected for daily home cooking</p>
        <span>{product.unit}</span>
        <div className="price-line"><strong>{money(product.price)}</strong><span><s>{money(product.cut)}</s> / {product.unit}</span></div>
      </div>
    </article>
  );
}

function BasketPanel({ cart, total, count, onRemove, onCheckout }) {
  return (
    <aside className="basket-panel">
      <div className="basket-title"><span>My Basket</span><strong>{count % 1 === 0 ? count : count.toFixed(1)} items</strong></div>
      <div className="basket-list">{cart.length ? cart.map((item) => <BasketLine item={item} onRemove={onRemove} key={item.id} />) : <div className="empty-state">Add products to start your basket.</div>}</div>
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
        <div><h3>Categories</h3>{categories.map((item) => <Link key={item.name} to={`/products?category=${encodeURIComponent(item.name)}`}>{item.name}</Link>)}</div>
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
