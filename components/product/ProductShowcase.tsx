"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Datum } from "@/services/interface/response/product_res_get";
import { ProductShowcaseStyles } from "./ProductShowcaseStyles";
import { ProductShowcaseBackground } from "./ProductShowcaseBackground";
import { ProductShowcaseHeader } from "./ProductShowcaseHeader";
import { ProductShowcaseImage } from "./ProductShowcaseImage";
import { ProductShowcaseDetails } from "./ProductShowcaseDetails";
const IMAGE_BASE = "https://store.c4c2026.xyz/images/";

export type CartItem = {
  product: Datum;
  size: string;
  qty: number;
};

interface Props {
  products: Datum[];
}

export default function ProductShowcase({ products }: Props) {
  const valid = products.filter((p) => p && p.images?.length > 0);
  const [idx, setIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [entering, setEntering] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('c4c-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: React.SetStateAction<'light' | 'dark'>) => {
    setTheme(prev => {
      const nextTheme = typeof newTheme === 'function' ? newTheme(prev) : newTheme;
      localStorage.setItem('c4c-theme', nextTheme);
      return nextTheme;
    });
  };

  // premium interactive states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartPopping, setCartPopping] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(''); // Lifted size state

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleBuy = () => {
    if (buying || buySuccess) return;
    setBuying(true);
    // Simulate server processing for premium feel
    setTimeout(() => {
      setBuying(false);
      setBuySuccess(true);

      setCartItems(prev => {
        const existingIdx = prev.findIndex(
          item => item.product.id === product.id && item.size === selectedSize
        );
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = { ...updated[existingIdx], qty: updated[existingIdx].qty + qty };
          return updated;
        }
        console.log(product);
        return [...prev, { product, size: selectedSize, qty }];
      });

      setCartPopping(true);

      // Reset success status
      setTimeout(() => {
        setBuySuccess(false);
      }, 1500);

      // Reset cart bounce pop
      setTimeout(() => {
        setCartPopping(false);
      }, 400);
    }, 850);
  };

  const product = valid[idx];

  const goTo = (next: number) => {
    setEntering(true);
    setTimeout(() => {
      setIdx(next);
      setImgIdx(0);
      setQty(1);
    }, 400);
    setTimeout(() => {
      setEntering(false);
    }, 450);
  };

  const toggleFlip = () => {
    if (product.images.length < 2 || flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setImgIdx(prev => (prev === 0 ? 1 : 0));
    }, 250);
    setTimeout(() => {
      setFlipping(false);
    }, 500);
  };

  const flipTo = (targetIdx: number) => {
    if (targetIdx === imgIdx || flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setImgIdx(targetIdx);
    }, 250);
    setTimeout(() => {
      setFlipping(false);
    }, 500);
  };

  const prev = () => goTo((idx - 1 + valid.length) % valid.length);
  const next = () => goTo((idx + 1) % valid.length);

  // keyboard arrow support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // Fix stuck scroll when exiting mobile view
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth > 900) {
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          const bodyEl = document.querySelector('.ps-body');
          if (bodyEl) bodyEl.scrollTop = 0;
          const rootEl = document.querySelector('.ps-root');
          if (rootEl) rootEl.scrollTop = 0;
        }
      }, 50);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!product) return null;

  const total = product.price * qty;

  return (
    <>
      <ProductShowcaseStyles />

      <div className="ps-root">
        <ProductShowcaseBackground />

        <ProductShowcaseHeader
          theme={theme}
          setTheme={handleThemeChange}
          cartCount={cartCount}
          cartItems={cartItems}
          setCartItems={setCartItems}
          cartPopping={cartPopping}
        />

        <div className="ps-body">
          <div className="ps-content-wrap">
            <ProductShowcaseImage
              product={product}
              validProducts={valid}
              idx={idx}
              imgIdx={imgIdx}
              entering={entering}
              flipping={flipping}
              setImgIdx={setImgIdx}
              toggleFlip={toggleFlip}
              flipTo={flipTo}
              prev={prev}
              next={next}
              goTo={goTo}
            />

            <ProductShowcaseDetails
              product={product}
              qty={qty}
              setQty={setQty}
              buying={buying}
              buySuccess={buySuccess}
              handleBuy={handleBuy}
              entering={entering}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}></div>

        {/* ── FOOTER ── */}
        <footer className="ps-footer">
          <p className="ps-footer-note">
            จัดจำหน่ายโดยค่าย Computer for Community (C4C)
          </p>
          <p className="ps-footer-total">
            รวมทั้งหมด&nbsp;
            <strong>฿{total.toLocaleString()}</strong>
            &nbsp;({qty} ชิ้น)
          </p>
        </footer>
      </div>
    </>
  );
}
