"use client";

import React, { useEffect, useState } from 'react';
import type { CartItem } from './ProductShowcase';

const IMAGE_BASE = 'https://store.c4c2026.xyz/images';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  theme: 'light' | 'dark';
};

export default function CartDrawer({ isOpen, onClose, cartItems, setCartItems, theme }: CartDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShow(true);
        });
      });
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      setTimeout(() => setMounted(false), 400);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  const isLight = theme === 'light';
  const toUrl = (path: string) => `${IMAGE_BASE}/${path.replace(/^\//, '')}`;

  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const updateQty = (index: number, delta: number) => {
    setCartItems(prev => {
      const updated = [...prev];
      const newQty = updated[index].qty + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...updated[index], qty: Math.min(99, newQty) };
      }
      return updated;
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: show ? 'auto' : 'none',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: isLight ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.6)',
          opacity: show ? 1 : 0,
          transition: `opacity 0.4s ${show ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.4, 0, 1, 1)'}`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '420px',
          background: isLight
            ? 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)'
            : 'linear-gradient(145deg, rgba(20,15,25,0.95) 0%, rgba(10,5,15,0.98) 100%)',
          color: isLight ? '#2d1b2e' : '#f9fafb',
          transform: show ? 'translateX(0)' : 'translateX(100%)',
          opacity: show ? 1 : 0,
          transition: `transform 0.4s ${show ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.4, 0, 1, 1)'}, opacity 0.4s ${show ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.4, 0, 1, 1)'}`,
          boxShadow: isLight ? '-10px 0 40px rgba(236,72,153,0.1)' : '-10px 0 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: isLight ? '1px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: isLight ? '1px solid rgba(236,72,153,0.15)' : '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)',
        }}>
          <h2 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            margin: 0,
            background: 'linear-gradient(90deg, #ec4899, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>ตะกร้าสินค้า</h2>
          <button
            onClick={onClose}
            style={{
              background: isLight ? 'rgba(236,72,153,0.1)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              cursor: 'pointer',
              color: isLight ? '#ec4899' : '#fff',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              marginRight: '-10px',
              transition: 'transform 0.2s ease, background 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = isLight ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = isLight ? 'rgba(236,72,153,0.1)' : 'rgba(255,255,255,0.1)';
            }}
            aria-label="ปิดตะกร้า"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', opacity: 0.7, textAlign: 'center'
            }}>
              <div style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: isLight ? 'rgba(236,72,153,0.1)' : 'rgba(236,72,153,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: isLight ? '0 0 40px rgba(236,72,153,0.2)' : '0 0 40px rgba(236,72,153,0.4)'
              }}>
                <svg width="48" height="48" fill="none" stroke={isLight ? '#ec4899' : '#f472b6'} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0', color: isLight ? '#4b5563' : '#d1d5db' }}>ตะกร้าว่างเปล่า</h3>
              <p style={{ fontSize: '0.95rem', margin: 0, color: isLight ? '#6b7280' : '#9ca3af' }}>ดูเหมือนว่าคุณจะยังไม่ได้เพิ่มสินค้าใดๆ</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item, index) => (
                <div key={`${item.product.id}-${item.size}`} style={{
                  display: 'flex',
                  gap: '0',
                  borderRadius: '20px',
                  background: isLight
                    ? 'linear-gradient(135deg, #ffffff 0%, #fefcfd 100%)'
                    : 'linear-gradient(135deg, #1e1b2e 0%, #191624 100%)',
                  border: isLight ? '1px solid rgba(236,72,153,0.08)' : '1px solid rgba(139,92,246,0.15)',
                  boxShadow: isLight
                    ? '0 4px 24px rgba(236,72,153,0.06), 0 1px 3px rgba(0,0,0,0.04)'
                    : '0 4px 24px rgba(139,92,246,0.08), 0 1px 3px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease',
                  position: 'relative'
                }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = isLight
                      ? '0 8px 32px rgba(236,72,153,0.12), 0 2px 6px rgba(0,0,0,0.06)'
                      : '0 8px 32px rgba(139,92,246,0.15), 0 2px 6px rgba(0,0,0,0.4)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isLight
                      ? '0 4px 24px rgba(236,72,153,0.06), 0 1px 3px rgba(0,0,0,0.04)'
                      : '0 4px 24px rgba(139,92,246,0.08), 0 1px 3px rgba(0,0,0,0.3)';
                  }}
                >
                  {/* Accent bar */}
                  <div style={{
                    width: '4px', flexShrink: 0,
                    background: 'linear-gradient(180deg, #ec4899, #8b5cf6)',
                    borderRadius: '4px 0 0 4px'
                  }} />

                  {/* Image */}
                  <div style={{
                    width: '90px', height: '100px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    margin: '12px 4px 12px 12px',
                    background: isLight
                      ? 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%)'
                      : 'linear-gradient(135deg, #1f1624 0%, #1a1530 100%)',
                    borderRadius: '14px',
                    padding: '8px'
                  }}>
                    <img
                      src={item.product.images?.[0] ? toUrl(item.product.images[0]) : ''}
                      alt={item.product.title || 'Product'}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '14px 16px 14px 8px', minWidth: 0, justifyContent: 'center' }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <h4 style={{
                        fontWeight: 800, fontSize: '0.95rem', margin: 0, letterSpacing: '-0.01em',
                        color: isLight ? '#1f2937' : '#f3f4f6',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        flex: 1
                      }}>{item.product.title || 'Standard Package'}</h4>

                      {/* Delete button */}
                      <button
                        onClick={() => setCartItems(prev => prev.filter((_, i) => i !== index))}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: isLight ? '#d1d5db' : '#4b5563',
                          padding: '2px', display: 'flex', flexShrink: 0,
                          transition: 'color 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseOut={e => e.currentTarget.style.color = isLight ? '#d1d5db' : '#4b5563'}
                        aria-label="ลบสินค้า"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Size + Stepper row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.02em',
                        background: isLight
                          ? 'linear-gradient(135deg, #ede9fe, #fce7f3)'
                          : 'linear-gradient(135deg, #312e81, #831843)',
                        color: isLight ? '#7c3aed' : '#e9d5ff',
                        padding: '4px 10px', borderRadius: '8px',
                        border: isLight ? '1px solid rgba(124,58,237,0.1)' : '1px solid rgba(139,92,246,0.2)'
                      }}>Size {item.size || '-'}</span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => updateQty(index, -1)}
                          style={{
                            width: '30px', height: '30px', borderRadius: '10px',
                            border: isLight ? '1.5px solid #e5e7eb' : '1.5px solid #374151',
                            background: isLight ? '#f9fafb' : '#1f2937',
                            color: isLight ? '#374151' : '#d1d5db',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.borderColor = '#ec4899';
                            e.currentTarget.style.color = '#ec4899';
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.borderColor = isLight ? '#e5e7eb' : '#374151';
                            e.currentTarget.style.color = isLight ? '#374151' : '#d1d5db';
                          }}
                          aria-label="ลดจำนวน"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                        </button>

                        <span style={{
                          fontSize: '1rem', fontWeight: 800,
                          minWidth: '20px', textAlign: 'center',
                          color: isLight ? '#1f2937' : '#f9fafb'
                        }}>{item.qty}</span>

                        <button
                          onClick={() => updateQty(index, 1)}
                          style={{
                            width: '30px', height: '30px', borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                            color: '#fff',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(236,72,153,0.3)'
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(236,72,153,0.5)';
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(236,72,153,0.3)';
                          }}
                          aria-label="เพิ่มจำนวน"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <p style={{
                        fontWeight: 900, fontSize: '1.05rem', margin: 0,
                        background: isLight ? 'linear-gradient(90deg, #ec4899, #8b5cf6)' : 'linear-gradient(90deg, #f472b6, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        ฿{(item.product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      {item.qty > 1 && (
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600,
                          color: isLight ? '#9ca3af' : '#6b7280',
                        }}>
                          รวม ฿{(item.product.price * item.qty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '24px 28px',
            borderTop: isLight ? '1px solid rgba(236,72,153,0.15)' : '1px solid rgba(255,255,255,0.08)',
            background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(10,5,15,0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
              <span style={{ fontWeight: 600, fontSize: '1rem', color: isLight ? '#6b7280' : '#9ca3af' }}>ยอดรวมทั้งหมด ({totalCount} ชิ้น)</span>
              <span style={{ fontWeight: 900, fontSize: '1.5rem', color: isLight ? '#ec4899' : '#f472b6', lineHeight: 1 }}>
                ฿{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(236, 72, 153, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(236, 72, 153, 0.4)';
              }}
              onClick={() => alert('ดำเนินการสั่งซื้อ...')}
            >
              ดำเนินการสั่งซื้อ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
