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

  const clearCart = () => persistCart({});

  const cartItems = Object.entries(cart);
  const totalCount = cartItems.reduce((sum, [, item]) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, [, item]) => sum + item.price * item.qty, 0);

  const checkoutWhatsApp = () => {
    if (!cartItems.length) {
      setCartNotice('Add an essential to your basket before placing your WhatsApp order.');
      return;
    }
    const rows = cartItems
      .map(([name, item]) => `• ${name} × ${item.qty} — ₹${(item.price * item.qty).toLocaleString('en-IN')}`)
      .join('\n');
    const msg = `Hello The Elite Spa Centre, I would like to order from The Wellness Apothecary:\n${rows}\n\nTotal: ₹${totalPrice.toLocaleString('en-IN')}`;
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
    <div className="space-y-12">
      {/* Search + Basket Bar */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-5 h-5 text-[#E5C158] absolute left-5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search massage oils, diffusers, bath salts..."
              aria-label="Search wellness products"
              className="w-full pl-13 pr-5 py-4 rounded-full bg-[#09090B] border border-[#F5F5F0]/20 focus:border-[#E5C158] text-[16px] text-[#F5F5F0] placeholder:text-[#F5F5F0]/55 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#09090B] border border-[#E5C158]/35 text-[16px] font-semibold text-[#F5F5F0]">
              <ShoppingBag className="w-5 h-5 text-[#E5C158]" aria-hidden="true" />
              <span className="tabular-nums">{totalCount} Items • ₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            {totalCount > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="py-3.5 px-5 rounded-full border border-[#F5F5F0]/25 hover:border-[#F5F5F0]/60 text-[16px] font-medium text-[#F5F5F0] transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={checkoutWhatsApp}
              className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full bg-[#E5C158] hover:bg-[#F2D77E] text-[#09090B] text-[16px] font-semibold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>

        {cartNotice && (
          <p className="text-[16px] text-[#E5C158] font-medium">{cartNotice}</p>
        )}

        {cartItems.length > 0 && (
          <div className="pt-5 border-t border-[#F5F5F0]/14 space-y-3">
            {cartItems.map(([name, item]) => (
              <div
                key={name}
                className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-[#F5F5F0]/8 last:border-0 text-[17px]"
              >
                <span className="text-[#F5F5F0] font-medium">{name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[#E5C158] font-bold text-[20px] tabular-nums">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </span>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F5F5F0]/20 bg-[#09090B] px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => updateQty(name, -1)}
                      aria-label={`Decrease quantity of ${name}`}
                      className="w-8 h-8 rounded-full hover:bg-[#1A1A1F] flex items-center justify-center text-[#F5F5F0] cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-2 text-[16px] font-semibold tabular-nums">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(name, 1)}
                      aria-label={`Increase quantity of ${name}`}
                      className="w-8 h-8 rounded-full hover:bg-[#1A1A1F] flex items-center justify-center text-[#F5F5F0] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateQty(name, -item.qty)}
                    aria-label={`Remove ${name}`}
                    className="text-[#F5F5F0]/75 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter Pills (16px) */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`py-3 px-6 rounded-full text-[16px] font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                active
                  ? 'bg-[#E5C158] text-[#09090B]'
                  : 'bg-[#121215] text-[#F5F5F0] border border-[#F5F5F0]/18 hover:border-[#E5C158]/55'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Clean Spacious Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 glass-panel-subtle rounded-3xl space-y-4">
          <p className="font-serif text-[28px] text-[#F5F5F0]">No essentials matched your search.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCategory('All Essentials');
            }}
            className="text-[16px] font-semibold text-[#E5C158] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const directMsg = `Hello The Elite Spa Centre, I would like to order "${product.name}" (₹${product.price.toLocaleString('en-IN')}).`;
            return (
              <article
                key={product.id}
                className="group rounded-3xl bg-[#121215] border border-[#F5F5F0]/14 hover:border-[#E5C158]/50 overflow-hidden flex flex-col justify-between transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1F]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between gap-6">
                  <h3 className="font-serif text-[24px] sm:text-[26px] font-medium text-[#F5F5F0] leading-snug">
                    {product.name}
                  </h3>

                  <div className="pt-4 border-t border-[#F5F5F0]/12 flex items-center justify-between gap-3">
                    <span className="text-[22px] sm:text-[24px] font-bold text-[#E5C158] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => addItem(product.name, product.price)}
                        className="py-3 px-5 rounded-full bg-[#E5C158] hover:bg-[#F2D77E] text-[#09090B] text-[15px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Add +
                      </button>
                      <a
                        href={whatsappUrl(directMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Order ${product.name} on WhatsApp`}
                        className="w-11 h-11 rounded-full border border-[#E5C158]/45 hover:border-[#E5C158] text-[#E5C158] flex items-center justify-center transition-colors"
                        title="Order directly on WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
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
