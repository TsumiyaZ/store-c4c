import React, { useState } from 'react';
import { SizeGuideModal } from './SizeGuideModal';

type ProductShowcaseDetailsProps = {
  product: any;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  buying: boolean;
  buySuccess: boolean;
  handleBuy: () => void;
  entering: boolean;
};

export function ProductShowcaseDetails({
  product,
  qty,
  setQty,
  buying,
  buySuccess,
  handleBuy,
  entering,
}: ProductShowcaseDetailsProps) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('8XL'); // Default size as per example

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
        <span className="ps-badge-pill" data-tooltip="ตัดเย็บประณีต ทรงสวยสไตล์สปอร์ต">
          เสื้อโปโลคุณภาพสูง
        </span>
        <span className="ps-badge-pill" data-tooltip="ผ้านุ่ม เบาสบาย ระบายอากาศดีเยี่ยม">
          ผ้า Polyester
        </span>
        {hasDiscount && (
          <span className="ps-badge-pill" data-tooltip="ราคาสุดพิเศษประหยัดสูงสุด">
            🔥 Best Value
          </span>
        )}
      </div>

      {/* price */}
      <div className="ps-price-block">
        {hasDiscount && <p className="ps-price-old">฿{product.original_price!.toLocaleString()}</p>}
        <div className="ps-price-row">
          <span className="ps-price">฿{product.price.toLocaleString()}</span>
          {hasDiscount && (
            <span className="ps-save">
              ประหยัด ฿{product.original_price! - product.price}
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
          <span>Size {selectedSize}</span>
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.9 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* buy button with loaders/success states */}
        <button
          className={`ps-buy${buying ? ' loading' : ''}${buySuccess ? ' success' : ''}`}
          id="buy-now"
          onClick={handleBuy}
          disabled={buying || buySuccess}
        >
          {buying ? (
            <>
              <svg
                className="ps-spinner"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeDasharray="30"
                  strokeLinecap="round"
                  opacity="0.25"
                />
                <path
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5936 2.3725 15.097 3.03352 16.4269"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              กำลังดำเนินการ...
            </>
          ) : buySuccess ? (
            <>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              เพิ่มสำเร็จ!
            </>
          ) : (
            <>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              เพิ่มสินค้า
            </>
          )}
        </button>
      </div>
    </div>
  );
}
