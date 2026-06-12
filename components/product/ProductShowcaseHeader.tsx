"use client";

import React, { useState } from 'react';
import LoginModal from "../auth/LoginModal";
import { useSession, signOut } from "../auth/NextAuthProvider";
import CartDrawer from "./CartDrawer";
import type { CartItem } from "./ProductShowcase";

type ProductShowcaseHeaderProps = {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  cartCount: number;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartPopping: boolean;
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ProductShowcaseHeader({
  theme,
  setTheme,
  cartCount,
  cartItems,
  setCartItems,
  cartPopping,
  isLoginOpen,
  setIsLoginOpen,
}: ProductShowcaseHeaderProps) {
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProfileMenuClosing, setIsProfileMenuClosing] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const closeProfileMenu = (callback?: () => void) => {
    setIsProfileMenuClosing(true);
    setTimeout(() => {
      setIsProfileMenuOpen(false);
      setIsProfileMenuClosing(false);
      if (callback) callback();
    }, 200);
  };

  const toggleProfileMenu = () => {
    if (isProfileMenuOpen) {
      closeProfileMenu();
    } else {
      setIsProfileMenuOpen(true);
    }
  };

  return (
    <>
      <header className="ps-header">
        <a href="/" className="ps-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ 
            background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            fontWeight: 900
          }}>C4C</span> <span style={{ fontSize: '1.4rem' }}>2026</span>
        </a>
        <div className="ps-header-right">
          <button
            className="ps-hbtn"
            aria-label="สลับธีม"
            onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? (
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <button
            className={`ps-hbtn${cartPopping ? " cart-pop" : ""}`}
            aria-label="ตะกร้าสินค้า"
            onClick={() => setIsCartOpen(true)}
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="ps-badge">{cartCount}</span>
          </button>
          {session?.user ? (
            <div style={{ position: 'relative' }}>
              <button
                className="ps-hbtn"
                style={{ padding: 0, overflow: 'hidden', border: '2px solid transparent' }}
                aria-label="โปรไฟล์ผู้ใช้"
                onClick={toggleProfileMenu}
              >
                {session.user.image ? (
                  <img src={session.user.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#ec4899', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {session.user.name?.[0] || 'U'}
                  </div>
                )}
              </button>

              {isProfileMenuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 16px)', right: '-4px',
                  background: theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 8, 20, 0.85)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '12px', minWidth: '220px', zIndex: 100,
                  boxShadow: theme === 'light' ? '0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)' : '0 20px 40px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.2)',
                  color: theme === 'light' ? '#1f2937' : '#f9fafb',
                  transformOrigin: 'top right',
                  animation: isProfileMenuClosing ? 'fadeOutScale 0.2s ease-in forwards' : 'fadeInScale 0.2s ease-out forwards'
                }}>
                  {/* ลูกศรชี้ขึ้นไปที่รูปโปรไฟล์ */}
                  <div style={{
                    position: 'absolute', top: '-6px', right: '16px',
                    width: '12px', height: '12px',
                    background: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 8, 20, 0.95)',
                    borderLeft: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)',
                    borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)',
                    transform: 'rotate(45deg)',
                    zIndex: -1
                  }} />

                  <div style={{
                    padding: '4px 8px 12px 8px',
                    borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {session.user.name}
                    </div>
                    {session.user.email && (
                      <div style={{ fontSize: '0.8rem', opacity: 0.6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
                        {session.user.email}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      closeProfileMenu(() => signOut());
                    }}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '10px',
                      background: 'transparent',
                      border: 'none',
                      color: theme === 'light' ? '#e11d48' : '#fb7185',
                      cursor: 'pointer', textAlign: 'left',
                      fontSize: '0.9rem', transition: 'all 0.2s',
                      fontWeight: 500,
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme === 'light' ? 'rgba(225, 29, 72, 0.08)' : 'rgba(251, 113, 133, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    ออกจากระบบ
                  </button>
                  <style>{`
                    @keyframes fadeInScale {
                      from { opacity: 0; transform: scale(0.95) translateY(-10px); }
                      to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    @keyframes fadeOutScale {
                      from { opacity: 1; transform: scale(1) translateY(0); }
                      to { opacity: 0; transform: scale(0.95) translateY(-10px); }
                    }
                  `}</style>
                </div>
              )}
            </div>
          ) : (
            <button
              className="ps-hbtn"
              aria-label="บัญชีผู้ใช้"
              onClick={() => setIsLoginOpen(true)}
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        theme={theme}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
