import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SizeGuideModal } from './SizeGuideModal';

type ProductShowcaseDetailsProps = {
  product: any;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  buying: boolean;
  buySuccess: boolean;
  handleBuy: () => void;
  entering: boolean;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

export function ProductShowcaseDetails({
  product,
  qty,
  setQty,
  buying,
  buySuccess,
  handleBuy,
  entering,
  selectedSize,
  setSelectedSize,
}: ProductShowcaseDetailsProps) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`ps-right${entering ? ' text-fading' : ''}`}>
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      {/* edition tag */}
      <div className="ps-tag">
        <span className="ps-tag-dot" />
        C4C 2026 · Limited Edition
      </div>

      {/* title */}
      <h1 className="ps-title">{product.title}</h1>

      {/* desc */}
      <p className="ps-desc">{product.description}</p>

      {/* badges */}
      <div className="ps-badges">
        <span className="ps-badge-pill" data-tooltip="ตัดเย็บประณีต ทรงสวยสไตล์สปอร์ต" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ec4899' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          เสื้อโปโลคุณภาพสูง
        </span>
        <span className="ps-badge-pill" data-tooltip="ผ้านุ่ม เบาสบาย ระบายอากาศดีเยี่ยม" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#8b5cf6' }}>
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="6.5"></line>
          </svg>
          ผ้า Polyester
        </span>
        {hasDiscount && (
          <span className="ps-badge-pill" data-tooltip="ราคาสุดพิเศษประหยัดสูงสุด" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f97316' }}>
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
            </svg>
            Best Value
          </span>
        )}
      </div>

      {/* price */}
      <div className="ps-price-block">
        {hasDiscount && <p className="ps-price-old">฿{product.original_price!.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
        <div className="ps-price-row">
          <span className="ps-price">฿{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          {hasDiscount && (
            <span className="ps-save">
              ประหยัด ฿{(product.original_price! - product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>

      {/* actions */}
      <div className="ps-actions">
        {/* qty stepper */}
        <div className="ps-qty">
          <button
            className="ps-qbtn"
            id="qty-decrease"
            aria-label="ลด"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1 || buying || buySuccess}
          >
            −
          </button>
          <span className="ps-qnum">{qty}</span>
          <button
            className="ps-qbtn"
            id="qty-increase"
            aria-label="เพิ่ม"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            disabled={qty >= 99 || buying || buySuccess}
          >
            +
          </button>
        </div>

        {/* size selector button */}
        <button
          className="ps-size-btn"
          onClick={() => setIsSizeGuideOpen(true)}
        >
          <span>{selectedSize ? `Size ${selectedSize}` : 'เลือกไซส์'}</span>
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.9 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Floating Action Bar (Sticky at bottom, Portaled to body to avoid transform constraints) */}
      {mounted && createPortal(
        <div className="ps-floating-action-bar">
          {/* Price */}
          <div className="ps-fab-price">
            ฿{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          {/* Divider */}
          <div className="ps-fab-divider" />

          {/* Size Selector */}
          <button className="ps-fab-size" onClick={() => setIsSizeGuideOpen(true)}>
            {selectedSize ? `Size ${selectedSize}` : 'เลือกไซส์'}
          </button>

          {/* Buy Button */}
          <button
            className="ps-fab-buy"
            id="buy-now-fab"
            onClick={() => {
              if (!selectedSize) {
                setIsSizeGuideOpen(true);
              } else {
                handleBuy();
              }
            }}
            disabled={buying || buySuccess}
          >
            {buying ? (
              <>
                <svg className="ps-spinner" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="3" strokeDasharray="30" strokeLinecap="round" opacity="0.25" />
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5936 2.3725 15.097 3.03352 16.4269" strokeWidth="3" strokeLinecap="round" />
                </svg>
                ...
              </>
            ) : buySuccess ? (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                สำเร็จ
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                เพิ่มสินค้า
              </>
            )}
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
