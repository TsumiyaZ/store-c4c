import React from 'react';
import Image from 'next/image';

const IMAGE_BASE = 'https://store.c4c2026.xyz/images';

type ProductShowcaseImageProps = {
  product: any; // Ideally we use the proper type here later
  validProducts: any[];
  idx: number;
  imgIdx: number;
  entering: boolean;
  flipping: boolean;
  setImgIdx: (idx: number) => void;
  toggleFlip: () => void;
  flipTo: (idx: number) => void;
  prev: () => void;
  next: () => void;
  goTo: (idx: number) => void;
};

export function ProductShowcaseImage({
  product,
  validProducts,
  idx,
  imgIdx,
  entering,
  flipping,
  setImgIdx,
  toggleFlip,
  flipTo,
  prev,
  next,
  goTo,
}: ProductShowcaseImageProps) {
  const toUrl = (path: string) => `${IMAGE_BASE}/${path.replace(/^\//, '')}`;
  const imgSrc = product.images[imgIdx] ? toUrl(product.images[imgIdx]) : '';

  return (
    <div className="ps-left">
      {/* flip button aligned with top-right of left panel */}
      {product.images.length > 1 && (
        <button className="ps-flip-btn" onClick={toggleFlip} aria-label="หมุนดูด้านหลัง">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{imgIdx === 0 ? 'ดูด้านหลัง' : 'ดูด้านหน้า'}</span>
        </button>
      )}

      {/* navigation arrows */}
      <button className="ps-nav-btn prev" aria-label="ก่อนหน้า" onClick={prev}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5l-7 7 7 7" />
        </svg>
      </button>
      <button className="ps-nav-btn next" aria-label="ถัดไป" onClick={next}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l7-7-7-7" />
        </svg>
      </button>

      {/* hero image container */}
      <div className="ps-img-container">
        <div className="ps-fake-shadow" />
        <div className={`ps-img-wrap${entering ? ' fading' : ''}${flipping ? ' flipping' : ''}`}>
          {imgSrc && (
            <Image
              key={imgSrc}
              src={imgSrc}
              alt={product.title || 'Product Image'}
              fill
              priority
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 90vw, 50vw"
            />
          )}
        </div>
      </div>

      {/* bottom bar */}
      <div className={`ps-left-bottom${product.images.length <= 1 ? ' centered' : ''}`}>
        {/* thumbnail strip */}
        {product.images.length > 1 && (
          <div className="ps-thumbs">
            {product.images.map((img: string, i: number) => (
              <button
                key={img}
                className={`ps-thumb${i === imgIdx ? ' active' : ''}`}
                onClick={() => flipTo(i)}
                aria-label={`มุมมองที่ ${i + 1}`}
              >
                <Image src={toUrl(img)} alt="" fill style={{ objectFit: 'cover' }} sizes="48px" />
              </button>
            ))}
          </div>
        )}

        {/* dot / counter */}
        <div className="ps-counter">
          <div className="ps-counter-dots">
            {validProducts.map((_, i) => (
              <button
                key={i}
                className={`ps-cdot${i === idx ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`สินค้า ${i + 1}`}
              />
            ))}
          </div>
          <span className="ps-counter-text">
            {String(idx + 1).padStart(2, '0')} / {String(validProducts.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
