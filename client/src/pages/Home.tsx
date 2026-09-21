import { useMemo, useState } from "react";
import { Minus, Plus, Search, ShoppingBag, Star, ArrowRight, Clock3, MapPin, X, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = "All" | "Burgers" | "Chicken" | "Sides" | "Drinks";
type MenuItem = { id: number; name: string; description: string; price: number; category: Exclude<Category, "All">; rating: string; image: string; tag?: string };
type CartLine = MenuItem & { quantity: number };

const menu: MenuItem[] = [
  { id: 1, name: "The Big Crave", description: "Double smash, American cheese, pickles, crave sauce.", price: 10.9, category: "Burgers", rating: "4.9", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85", tag: "Fan favorite" },
  { id: 2, name: "Crispy Heat", description: "Buttermilk chicken, hot honey, slaw, toasted brioche.", price: 11.5, category: "Chicken", rating: "4.8", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85", tag: "New" },
  { id: 3, name: "Crinkle Stack", description: "Golden crinkle fries, seasoning salt, garlic aioli.", price: 5.2, category: "Sides", rating: "4.7", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Pickle Pop", description: "Beer-battered pickles with cool ranch dip.", price: 6.4, category: "Sides", rating: "4.6", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Strawberry Cloud", description: "Thick strawberry shake, whipped cream, cherry.", price: 6.8, category: "Drinks", rating: "4.9", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=85", tag: "Sweet pick" },
  { id: 6, name: "Fizzy Cola", description: "Classic fountain cola, extra cold, no ice melt.", price: 3.2, category: "Drinks", rating: "4.5", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=85" },
];

const categories: { label: Category; icon: string }[] = [
  { label: "All", icon: "✦" }, { label: "Burgers", icon: "♨" }, { label: "Chicken", icon: "✹" }, { label: "Sides", icon: "▦" }, { label: "Drinks", icon: "◒" },
];

export default function Home() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([{ ...menu[0], quantity: 1 }]);
  const [service, setService] = useState<"Delivery" | "Pickup">("Delivery");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => menu.filter((item) => (category === "All" || item.category === category) && `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const deliveryFee = service === "Delivery" ? (subtotal >= 25 ? 0 : 2.5) : 0;
  const total = subtotal - discount + deliveryFee;

  function addToCart(item: MenuItem) {
    setCart((current) => current.some((line) => line.id === item.id) ? current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { ...item, quantity: 1 }]);
    setNotice(`${item.name} added to your order`);
    window.setTimeout(() => setNotice(""), 2200);
  }
  function changeQuantity(id: number, delta: number) { setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line).filter((line) => line.quantity > 0)); }
  function applyPromo() { if (promo.trim().toUpperCase() === "CRAVE10") { setPromoApplied(true); setNotice("Promo applied — 10% off your order"); } else { setNotice("Try CRAVE10 for 10% off"); } window.setTimeout(() => setNotice(""), 2400); }

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1d1d1b] selection:bg-[#f4b740] selection:text-[#1d1d1b]">
      <div className="top-strip"><span>Free delivery over $25</span><span className="hidden sm:inline">•</span><span>Open today until 11:30 PM</span><span className="hidden sm:inline">•</span><span>Made fresh, never boring</span></div>
      <header className="sticky top-0 z-30 border-b border-[#1d1d1b]/10 bg-[#f7f2e8]/90 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between gap-5">
          <a href="#top" className="flex items-center gap-3" aria-label="CraveRush home"><span className="brand-mark">CR</span><span className="text-[19px] font-black tracking-[-0.06em]">CraveRush<span className="text-[#e6452d]">.</span></span></a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#1d1d1b]/65 md:flex"><a href="#menu" className="transition-colors hover:text-[#e6452d]">Menu</a><a href="#why" className="transition-colors hover:text-[#e6452d]">Why CraveRush</a><a href="#locations" className="transition-colors hover:text-[#e6452d]">Locations</a></nav>
          <a href="#order" className="flex items-center gap-2 rounded-full bg-[#1d1d1b] px-4 py-2.5 text-sm font-bold text-[#fffaf0] transition hover:-translate-y-0.5 hover:bg-[#e6452d]"><ShoppingBag size={16} /> <span className="hidden sm:inline">Your order</span><span className="cart-count">{itemCount}</span></a>
        </div>
      </header>

      <main id="top">
        <section className="container grid items-center gap-10 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
          <div className="max-w-xl"><div className="eyebrow"><Sparkles size={14} /> Good food, good mood</div><h1 className="display mt-5 text-[clamp(3.8rem,8vw,7.4rem)] leading-[0.86]">Order fast.<br /><em>Eat happy.</em></h1><p className="mt-7 max-w-md text-lg leading-7 text-[#1d1d1b]/65">Big flavor, zero fuss. Smash burgers, crispy chicken, and loaded sides made for the moment you’re in.</p><div className="mt-8 flex flex-wrap items-center gap-3"><a href="#menu" className="cta-primary">See the menu <ArrowRight size={17} /></a><div className="flex items-center gap-2 px-2 text-sm font-bold"><span className="rating-stars">★★★★★</span><span>4.9 / 5 from 2k+ cravings</span></div></div></div>
          <div className="hero-card"><div className="hero-sticker">100%<br /><span>craveable</span></div><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=90" alt="Juicy smash burger with fries" /><div className="hero-caption"><span>Today’s main character</span><strong>The Big Crave <b>$10.90</b></strong></div></div>
        </section>

        <section id="menu" className="container pb-20"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="section-kicker">Build your happy meal</div><h2 className="display text-5xl sm:text-6xl">The menu<span className="text-[#e6452d]">.</span></h2></div><div className="search-box"><Search size={17} /><input aria-label="Search menu" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cravings..." /></div></div><div className="category-row mb-8">{categories.map((item) => <button key={item.label} onClick={() => setCategory(item.label)} className={`category-chip ${category === item.label ? "active" : ""}`}><span>{item.icon}</span>{item.label}</button>)}</div><div className="menu-layout"><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <article key={item.id} className="menu-card"><div className="menu-image"><img src={item.image} alt={item.name} />{item.tag && <span className="menu-tag">{item.tag}</span>}<button className="quick-add" onClick={() => addToCart(item)} aria-label={`Add ${item.name}`}><Plus size={19} /></button></div><div className="p-5"><div className="mb-2 flex items-start justify-between gap-3"><h3 className="text-xl font-black tracking-[-0.04em]">{item.name}</h3><span className="font-black">${item.price.toFixed(2)}</span></div><p className="min-h-12 text-sm leading-5 text-[#1d1d1b]/55">{item.description}</p><div className="mt-4 flex items-center justify-between"><span className="flex items-center gap-1 text-xs font-bold"><Star size={13} fill="currentColor" className="text-[#f4b740]" /> {item.rating}</span><Button onClick={() => addToCart(item)} className="h-9 rounded-full bg-[#e6452d] px-4 text-xs font-black text-white hover:bg-[#c93220]">Add to order</Button></div></div></article>)}</div><aside id="order" className="order-panel"><div className="mb-5 flex items-center justify-between"><div><div className="section-kicker">Ready when you are</div><h2 className="mt-1 text-2xl font-black tracking-[-0.05em]">Your order</h2></div><span className="order-bag"><ShoppingBag size={17} /> {itemCount}</span></div><div className="service-toggle"><button className={service === "Delivery" ? "selected" : ""} onClick={() => setService("Delivery")}><span>⌁</span> Delivery</button><button className={service === "Pickup" ? "selected" : ""} onClick={() => setService("Pickup")}><span>↗</span> Pickup</button></div><div className="address-line"><MapPin size={15} /><span>{service === "Delivery" ? "Deliver to 124 Market Street" : "Pick up at Downtown CraveRush"}</span><button aria-label="Edit location"><ArrowRight size={14} /></button></div><div className="cart-lines">{cart.length === 0 ? <div className="empty-cart"><span>🍔</span><p>Your order is waiting<br />for a good idea.</p></div> : cart.map((line) => <div className="cart-line" key={line.id}><img src={line.image} alt="" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><strong className="truncate text-sm">{line.name}</strong><b className="text-sm">${(line.price * line.quantity).toFixed(2)}</b></div><div className="mt-2 flex items-center gap-2"><button onClick={() => changeQuantity(line.id, -1)} className="quantity-btn" aria-label="Decrease quantity"><Minus size={12} /></button><span className="w-4 text-center text-xs font-bold">{line.quantity}</span><button onClick={() => changeQuantity(line.id, 1)} className="quantity-btn" aria-label="Increase quantity"><Plus size={12} /></button></div></div></div>)}</div><div className="promo-row"><input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" /><button onClick={applyPromo}>{promoApplied ? <Check size={16} /> : "Apply"}</button></div>{promoApplied && <div className="promo-success">CRAVE10 applied · you saved ${discount.toFixed(2)}</div>}<div className="totals"><div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><div><span>{service} fee</span><b>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</b></div><div className="total-row"><span>Total</span><b>${total.toFixed(2)}</b></div></div><button onClick={() => setNotice(cart.length ? "Checkout is ready for the next step" : "Add something delicious first")} className="checkout-btn">Continue to checkout <ArrowRight size={17} /></button><p className="delivery-note"><Clock3 size={14} /> {service === "Delivery" ? "25–35 min delivery estimate" : "15–20 min pickup estimate"}</p></aside></div></section>

        <section id="why" className="brand-band"><div className="container grid gap-8 py-14 md:grid-cols-3"><div><div className="band-number">01</div><h3>Fast, not careless.</h3><p>We keep the line moving without cutting corners on the good stuff.</p></div><div><div className="band-number">02</div><h3>Made for cravings.</h3><p>Comfort food with a little extra personality in every bite.</p></div><div><div className="band-number">03</div><h3>Always in a good mood.</h3><p>Friendly service, generous portions, and zero boring beverages.</p></div></div></section>
      </main>
      {notice && <div className="toast"><Check size={16} /> {notice}<button onClick={() => setNotice("")} aria-label="Close notification"><X size={15} /></button></div>}
      <footer id="locations" className="container flex flex-col gap-4 py-8 text-sm text-[#1d1d1b]/55 sm:flex-row sm:items-center sm:justify-between"><span className="font-black tracking-[-0.04em] text-[#1d1d1b]">CraveRush<span className="text-[#e6452d]">.</span></span><span>Downtown · Riverside · Northside</span><span>© 2026 CraveRush Foods</span></footer>
    </div>
  );
}
