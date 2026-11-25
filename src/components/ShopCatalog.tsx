import React, { useEffect, useMemo, useState } from 'react';
import { Search, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { P, whatsappUrl } from '../data/catalog.js';

interface CartEntry {
  price: number;
  qty: number;
}

const CART_KEY = 'elite-spa-apothecary-cart-v2';
const CATEGORIES = ['All Essentials', ...Array.from(new Set(P.map((p) => p.category)))];

export default function ShopCatalog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Essentials');
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [cartNotice, setCartNotice] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') setCart(parsed);
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const persistCart = (next: Record<string, CartEntry>) => {
    setCart(next);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage write errors
    }
  };

  const addItem = (name: string, price: number) => {
    const existing = cart[name];
    const next = {
      ...cart,
      [name]: { price, qty: existing ? existing.qty + 1 : 1 },
    };
    persistCart(next);
    setCartNotice('');
  };

  const updateQty = (name: string, delta: number) => {
    const existing = cart[name];
    if (!existing) return;
    const nextQty = existing.qty + delta;
    const next = { ...cart };
    if (nextQty <= 0) {
      delete next[name];
    } else {
      next[name] = { ...existing, qty: nextQty };
    }
    persistCart(next);
  };

  const clearCart = () => {
    persistCart({});
  };

  const cartItems = Object.entries(cart);
  const totalCount = cartItems.reduce((sum, [, item]) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, [, item]) => sum + item.price * item.qty, 0);

  const checkoutWhatsApp = () => {
    if (!cartItems.length) {
      setCartNotice('Add at least one item to your luxury basket before checking out.');
      return;
    }
    const rows = cartItems
      .map(([name, item]) => `• ${name} × ${item.qty} — ₹${(item.price * item.qty).toLocaleString('en-IN')}`)
      .join('\n');
    const msg = `Hello The Elite Spa Centre, I would like to order from The Elite Wellness Shop:\n${rows}\n\nTotal: ₹${totalPrice.toLocaleString('en-IN')}`;
    window.location.assign(whatsappUrl(msg));
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return P.filter((item) => {
      const catOk = category === 'All Essentials' || item.category === category;
      const qOk = !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [search, category]);

  return (
    <div className="space-y-10">
      {/* Search + Basket Bar */}
      <div className="glass-panel rounded-3xl p-5 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search massage oils, diffusers, bath salts..."
              aria-label="Search wellness products"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#09090B] border border-[#F5F5F0]/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] placeholder:text-[#B0AEA6]/60 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#09090B] border border-[#D4AF37]/30 text-xs font-semibold text-[#F5F5F0]">
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span className="tabular-nums">{totalCount} Items · ₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            {totalCount > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="px-4 py-2.5 rounded-full border border-[#F5F5F0]/15 hover:border-[#F5F5F0]/40 text-xs font-medium text-[#B0AEA6] hover:text-[#F5F5F0] transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={checkoutWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>

        {cartNotice && (
          <p className="text-xs text-[#D4AF37]">{cartNotice}</p>
        )}

        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-[#F5F5F0]/10 space-y-2.5">
            {cartItems.map(([name, item]) => (
              <div
                key={name}
                className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-[#F5F5F0]/5 last:border-0 text-sm"
              >
                <span className="text-[#F5F5F0] font-medium">{name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#D4AF37] font-serif text-lg tabular-nums">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-full border border-[#F5F5F0]/15 bg-[#09090B] px-1.5 py-1">
                    <button
                      type="button"
                      onClick={() => updateQty(name, -1)}
                      aria-label={`Decrease quantity of ${name}`}
                      className="w-6 h-6 rounded-full hover:bg-[#1A1A1F] flex items-center justify-center text-[#F5F5F0] cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-semibold tabular-nums">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(name, 1)}
                      aria-label={`Increase quantity of ${name}`}
                      className="w-6 h-6 rounded-full hover:bg-[#1A1A1F] flex items-center justify-center text-[#F5F5F0] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateQty(name, -item.qty)}
                    aria-label={`Remove ${name}`}
                    className="text-[#B0AEA6] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                active
                  ? 'bg-[#D4AF37] text-[#09090B]'
                  : 'bg-[#121215] text-[#F5F5F0]/75 border border-[#F5F5F0]/10 hover:border-[#D4AF37]/45'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 glass-panel-subtle rounded-2xl">
          <p className="font-serif text-2xl text-[#F5F5F0] mb-2">No essentials matched your search.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCategory('All Essentials');
            }}
            className="text-xs font-semibold tracking-[0.14em] uppercase text-[#D4AF37] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const directMsg = `Hello The Elite Spa Centre, I would like to order "${product.name}" (₹${product.price.toLocaleString('en-IN')}).`;
            return (
              <article
                key={product.id}
                className="group rounded-2xl bg-[#121215] border border-[#F5F5F0]/10 hover:border-[#D4AF37]/45 overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden bg-[#1A1A1F]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-[#D4AF37]/90 mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#F5F5F0] leading-snug mb-4">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between gap-2">
                    <span className="font-serif text-2xl font-semibold text-[#F5F5F0] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addItem(product.name, product.price)}
                        className="px-3.5 py-2 rounded-full bg-[#D4AF37] hover:bg-[#E8CB6D] text-[#09090B] text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Add +
                      </button>
                      <a
                        href={whatsappUrl(directMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Order ${product.name} on WhatsApp`}
                        className="w-8 h-8 rounded-full border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] flex items-center justify-center transition-colors"
                        title="Order directly on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
