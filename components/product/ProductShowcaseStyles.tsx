export function ProductShowcaseStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
      a { -webkit-tap-highlight-color: transparent; }

      .ps-root {
        font-family: 'Inter', sans-serif;
        width: 100%;
        max-width: 100vw;
        min-height: 100dvh; height: 100dvh;
        display: flex; flex-direction: column;
        overflow: hidden;
        background: linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%);
        color: #831843;
        position: relative;
      }
      @keyframes ps-mount {
        0% { opacity: 0; transform: translateY(30px) scale(0.98); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      /* background wrapper to prevent iOS zoom out */
      .ps-bg-wrapper {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      
      /* huge background text */
      .ps-bg-text {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        font-size: clamp(60rem, 80vw, 110rem);
        font-weight: 900;
        color: rgba(131, 24, 67, 0.06);
        mix-blend-mode: multiply;
        z-index: 0;
        pointer-events: none;
        white-space: nowrap;
        user-select: none;
        line-height: 1;
        letter-spacing: -0.080em;
      }

      /* ─── glowing background blobs (Lava Lamp Effect) ─── */
      .ps-bg-blob {
        position: absolute;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
        opacity: 0.38;
      }
      @keyframes ps-blob-spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      .ps-bg-blob.blob-1 {
        width: 50vw; height: 50vw;
        background: radial-gradient(ellipse at 40% 40%, rgba(200, 149, 167, 0.25) 0%, transparent 70%);
        top: -15%; left: -10%;
        animation: ps-blob-spin 25s linear infinite;
      }
      .ps-bg-blob.blob-2 {
        width: 45vw; height: 45vw;
        background: radial-gradient(ellipse at 60% 30%, rgba(164, 127, 169, 0.25) 0%, transparent 70%);
        bottom: -15%; right: 10%;
        animation: ps-blob-spin 30s linear infinite reverse;
      }
      .ps-bg-blob.blob-3 {
        width: 35vw; height: 35vw;
        background: radial-gradient(ellipse at 30% 60%, rgba(180, 160, 185, 0.25) 0%, transparent 70%);
        top: 35%; left: 25%;
        animation: ps-blob-spin 20s linear infinite;
      }

      /* ─── HEADER ─── */
      .ps-header {
        position: relative; z-index: 30;
        display: flex; align-items: center; justify-content: space-between;
        padding: 1.1rem 2rem;
        flex-shrink: 0;
        opacity: 0;
        animation: ps-mount 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .ps-logo {
        font-size: 2rem; font-weight: 900;
        letter-spacing: 0.15em; text-transform: uppercase;
        color: #3a2d3c; text-decoration: none;
        transition: opacity .2s;
      }
      .ps-logo:hover { opacity: .7; }
      .ps-header-right { display: flex; gap: 10px; }
      .ps-hbtn {
        width: 38px; height: 38px; border-radius: 50%;
        border: 1px solid rgba(74, 62, 77, 0.15);
        background: rgba(74, 62, 77, 0.05);
        color: #4a3e4d; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: background .2s, transform .15s; position: relative;
        touch-action: manipulation;
      }
      .ps-hbtn:hover { background: rgba(74, 62, 77, 0.12); transform: scale(1.07); }
      .ps-badge {
        position: absolute; top: -3px; right: -3px;
        width: 16px; height: 16px; border-radius: 50%;
        background: #ef4444; color: #fff;
        font-size: 9px; font-weight: 900;
        display: flex; align-items: center; justify-content: center;
      }

      /* ─── BODY SPLIT ─── */
      .ps-body {
        flex: 1; display: flex; flex-direction: column; justify-content: center;
        overflow-y: auto; overflow-x: hidden;
        position: relative; z-index: 10; min-height: 0;
        width: 100%;
      }
      .ps-content-wrap {
        display: flex; flex-direction: row; align-items: stretch;
        width: 100%; max-width: 1440px; margin: 0 auto;
        min-height: 0;
      }

      /* ─── LEFT PANEL (image) ─── */
      .ps-left {
        position: relative;
        width: 50%; flex-shrink: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: space-between;
        padding: 2rem;
        z-index: 10;
        opacity: 0;
        animation: ps-mount 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
      }
      /* soft glow blob behind image */
      .ps-left::after {
        content: '';
        position: absolute;
        top: 50%; left: 50%;
        width: 65%; height: 65%;
        border-radius: 50%;
        background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #0ea5e9 100%);
        opacity: 0.45;
        filter: blur(60px);
        pointer-events: none;
        z-index: 0;
        animation: ps-holo-spin 15s linear infinite;
      }
      @keyframes ps-holo-spin {
        0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
        50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.05); }
        100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
      }
      .ps-img-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 0;
        position: relative;
        z-index: 10;
        pointer-events: none;
      }
      .ps-img-container > * {
        pointer-events: auto;
      }
      .ps-img-wrap {
        position: relative;
        width: 85%;
        max-width: 440px;
        height: 85%;
        max-height: 440px;
        aspect-ratio: 1 / 1;
        z-index: 2;
        transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1), transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
        animation: ps-float 6s ease-in-out infinite;
        will-change: transform;
      }
      .ps-fake-shadow {
        position: absolute;
        bottom: -12%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 25px;
        background: radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%);
        z-index: 1;
        pointer-events: none;
        animation: ps-shadow-float 6s ease-in-out infinite;
        will-change: transform, opacity;
      }
      .ps-img-wrap.fading {
        opacity: 0;
      }
      .ps-img-wrap.flipping {
        animation: ps-flip 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      @keyframes ps-flip {
        0% { transform: perspective(1000px) rotateY(0deg) scale(1); }
        50% { transform: perspective(1000px) rotateY(90deg) scale(0.8); }
        50.001% { transform: perspective(1000px) rotateY(-90deg) scale(0.8); }
        100% { transform: perspective(1000px) rotateY(0deg) scale(1); }
      }
      
      /* Image hover scale & rotate */
      .ps-img-wrap img {
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      .ps-img-wrap:hover img {
        transform: scale(1.1);
      }
      .ps-flip-btn {
        position: absolute;
        top: 2rem; right: 2rem;
        background: rgba(255,255,255,0.6);
        border: 1px solid rgba(0,0,0,0.08);
        border-radius: 30px;
        color: #1f2937;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 8px 14px;
        display: flex; align-items: center; gap: 6px;
        cursor: pointer;
        z-index: 30;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ps-flip-btn svg {
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .ps-flip-btn:hover {
        background: rgba(255,255,255,0.9);
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      }
      .ps-flip-btn:hover svg {
        transform: rotate(180deg);
      }
      @keyframes ps-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes ps-shadow-float {
        0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
        50% { transform: translateX(-50%) scale(0.85); opacity: 0.5; }
      }

      /* bottom bar container */
      .ps-left-bottom {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        margin-top: 1rem;
        z-index: 10;
      }
      .ps-left-bottom.centered {
        justify-content: center;
      }

      /* counter indicator: "01 / 04" */
      .ps-counter {
        z-index: 5;
        display: flex; align-items: center; gap: 12px;
      }
      .ps-counter-text {
        font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em;
        color: rgba(0,0,0,0.45);
      }
      .ps-counter-dots {
        display: flex; gap: 5px;
      }
      .ps-cdot {
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(0,0,0,0.15);
        border: none; padding: 0; cursor: pointer;
        transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
        touch-action: manipulation;
      }
      .ps-cdot.active {
        background: #111827; width: 20px; border-radius: 3px;
        box-shadow: 0 0 8px rgba(17, 24, 39, 0.4);
      }

      /* thumbnail strip bottom-left */
      .ps-thumbs {
        z-index: 5; display: flex; gap: 8px;
      }
      .ps-thumb {
        width: 52px; height: 52px; border-radius: 12px;
        overflow: hidden; position: relative;
        border: 2px solid rgba(0,0,0,0.05);
        background: rgba(0,0,0,0.03);
        cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        touch-action: manipulation;
      }
      .ps-thumb.active {
        border-color: #111827;
        box-shadow: 0 0 15px rgba(17, 24, 39, 0.15);
        transform: scale(1.05);
      }
      .ps-thumb:hover:not(.active) {
        transform: translateY(-2px);
        border-color: rgba(0,0,0,0.2);
      }

      /* ─── RIGHT PANEL (info) ─── */
      .ps-right {
        flex: 1; min-width: 0;
        display: flex; flex-direction: column; justify-content: center;
        padding: 3rem;
        margin: 2rem 2rem 2rem 0;
        position: relative;
        z-index: 20;
        opacity: 0;
        animation: ps-mount 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ps-right:hover {
        transform: translateY(-4px);
      }
      /* frosted glass floating card on the right */
      .ps-right::before {
        content: '';
        position: absolute; inset: 0;
        background: rgba(255,255,255,0.3);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: 40px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6);
        pointer-events: none;
        transition: box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ps-right:hover::before {
        box-shadow: 0 30px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
      }
      .ps-right > * { position: relative; z-index: 1; }

      /* edition tag */
      .ps-tag {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 0.65rem; font-weight: 700;
        letter-spacing: 0.2em; text-transform: uppercase;
        color: rgba(0,0,0,0.5);
        margin-bottom: 1rem;
      }
      .ps-tag-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: #111827;
        box-shadow: 0 0 6px rgba(17,24,39,0.5);
      }

      /* big editorial title */
      .ps-title {
        font-size: clamp(1.8rem, 3.2vw, 3rem);
        font-weight: 900;
        line-height: 1.05;
        letter-spacing: -0.03em;
        margin-bottom: 0.75rem;
        color: #3a2d3c;
      }
      .ps-desc {
        font-size: 0.82rem; line-height: 1.75;
        color: rgba(0,0,0,0.6);
        max-width: 340px;
        margin-bottom: 1.75rem;
      }

      /* divider */
      .ps-divider {
        width: 40px; height: 2px;
        background: rgba(0,0,0,0.1);
        border-radius: 2px;
        margin-bottom: 1.75rem;
      }

      /* price block */
      .ps-price-block { margin-bottom: 2rem; }
      .ps-price-old {
        font-size: 0.82rem; color: rgba(0,0,0,0.35);
        text-decoration: line-through; margin-bottom: 2px;
      }
      .ps-price-row { display: flex; align-items: flex-end; gap: 12px; }
      .ps-price {
        font-size: clamp(2.4rem, 4vw, 3.4rem);
        font-weight: 900; letter-spacing: -0.04em; line-height: 1;
        color: #3a2d3c;
      }
      .ps-save {
        font-size: 0.65rem; font-weight: 800;
        letter-spacing: 0.1em; text-transform: uppercase;
        color: #be123c;
        background: rgba(190,18,60,0.12);
        border: 1px solid rgba(190,18,60,0.25);
        border-radius: 999px;
        padding: 3px 10px;
        margin-bottom: 6px;
      }

      /* ─── ACTIONS ─── */
      .ps-actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
      .ps-qty {
        display: flex; align-items: center;
        background: rgba(255, 255, 255, 0.45);
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 999px; overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      }
      .ps-qbtn {
        width: 42px; height: 42px; background: none; border: none;
        color: #831843; cursor: pointer; font-size: 1.2rem;
        display: flex; align-items: center; justify-content: center;
        transition: all .2s;
        touch-action: manipulation;
      }
      .ps-qbtn:hover { background: rgba(255, 255, 255, 0.4); color: #be123c; }
      .ps-qbtn:disabled { color: rgba(131, 24, 67, 0.3); cursor: not-allowed; }
      .ps-qnum {
        min-width: 36px; text-align: center;
        font-size: 0.95rem; font-weight: 800; color: #831843;
        user-select: none;
      }
      .ps-size-btn {
        display: inline-flex; height: 44px; min-width: 110px; flex-shrink: 0;
        align-items: center; justify-content: space-between; padding: 0 16px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(255, 255, 255, 0.6);
        color: #831843; font-size: 0.85rem; font-weight: 800; letter-spacing: 0.02em;
        cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.03), inset 0 1px 1px rgba(255,255,255,0.8);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      }
      .ps-size-btn:hover {
        background: rgba(255, 255, 255, 0.65);
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,1);
        color: #be123c;
      }
      .ps-buy {
        flex: 1; min-width: 140px;
        height: 44px;
        background: linear-gradient(135deg, #c895a7 0%, #a47fa9 100%);
        color: #fff;
        border: 1px solid #916c96;
        border-radius: 999px;
        font-size: 0.85rem; font-weight: 800;
        letter-spacing: 0.04em; cursor: pointer;
        display: flex; align-items: center; justify-content: center; gap: 8px;
        box-shadow: 0 8px 24px rgba(164, 127, 169, 0.3);
        position: relative;
        overflow: hidden;
        transition: transform .15s, box-shadow .15s;
        touch-action: manipulation;
      }
      .ps-buy::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
        transform: skewX(-25deg) translateX(-300%);
        animation: ps-shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        will-change: transform;
      }
      @keyframes ps-shine {
        0%, 75% { transform: skewX(-25deg) translateX(-300%); }
        100% { transform: skewX(-25deg) translateX(300%); }
      }
      .ps-buy:hover::before {
        animation: none;
        transform: skewX(-25deg) translateX(300%);
        transition: transform 0.6s ease;
      }
      .ps-buy:hover { transform: scale(1.03); box-shadow: 0 12px 36px rgba(0,0,0,0.32); }
      .ps-buy:active { transform: scale(0.98); }

      /* info badge row */
      .ps-badges {
        display: flex; gap: 8px; flex-wrap: wrap;
        margin-bottom: 1.5rem;
      }
      .ps-badge-pill {
        font-size: 0.67rem; font-weight: 600;
        letter-spacing: 0.06em;
        color: #111827;
        background: rgba(17, 24, 39, 0.05);
        border: 1px solid rgba(17, 24, 39, 0.1);
        border-radius: 999px; padding: 4px 12px;
        transition: background .2s, transform .15s;
      }
      .ps-badge-pill:hover {
        background: rgba(17, 24, 39, 0.08);
        transform: translateY(-1px);
      }

      /* ─── NAV ARROWS (floating on left/right of left panel) ─── */
      .ps-nav-btn {
        width: 44px; height: 44px; border-radius: 50%;
        border: 1.5px solid rgba(0,0,0,0.1);
        background: rgba(255,255,255,0.6);
        color: #111827; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 30;
        touch-action: manipulation;
      }
      .ps-nav-btn svg {
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .ps-nav-btn:hover {
        background: rgba(255,255,255,0.9);
        border-color: rgba(0,0,0,0.2);
        transform: translateY(-50%) scale(1.08);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      }
      .ps-nav-btn.prev:hover svg {
        transform: translateX(-3px);
      }
      .ps-nav-btn.next:hover svg {
        transform: translateX(3px);
      }
      .ps-nav-btn:active {
        transform: translateY(-50%) scale(0.95);
      }
      .ps-nav-btn.prev {
        left: 2rem;
      }
      .ps-nav-btn.next {
        right: 2rem;
      }

      /* ─── RESPONSIVE STYLES ─── */
      @media (max-height: 800px) and (min-width: 769px) {
        .ps-right {
          padding: 2rem;
        }
        .ps-tag { margin-bottom: 0.5rem; }
        .ps-title { margin-bottom: 0.5rem; }
        .ps-desc { margin-bottom: 1rem; }
        .ps-badges { margin-bottom: 1rem; }
        .ps-divider { margin-bottom: 1rem; }
        .ps-price-block { margin-bottom: 1.25rem; }
      }

      @media (max-width: 768px) {
        .ps-root {
          height: auto !important;
          min-height: 100dvh;
          overflow: visible !important;
        }
        .ps-content-wrap {
          flex-direction: column;
        }
        .ps-body {
          justify-content: flex-start;
          height: auto !important;
          overflow: visible !important;
        }
        .ps-left {
          width: 100%;
          height: auto;
          padding: 3rem 1.5rem 2rem 1.5rem;
          min-height: 420px;
        }
        .ps-img-wrap {
          width: 70%;
          max-width: 320px;
          aspect-ratio: 1 / 1;
        }
        .ps-left-bottom {
          margin-top: 1.5rem;
        }
        .ps-nav-btn.prev {
          left: 1rem;
        }
        .ps-nav-btn.next {
          right: 1rem;
        }
        .ps-right {
          width: 100%;
          padding: 2.5rem 1.5rem 4rem 1.5rem;
          margin: 0;
        }
        .ps-right::before {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.3);
          border-radius: 40px;
          background: rgba(255,255,255,0.25);
        }
        .ps-footer {
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          gap: 0.75rem;
        }
        .ps-footer-total {
          font-size: 0.9rem;
        }
      }

      @media (max-width: 480px) {
        .ps-title, .ps-desc {
          text-align: center;
        }
        .ps-tag, .ps-badges {
          justify-content: center;
        }
        .ps-tag {
          display: flex;
        }
        .ps-price-block {
          text-align: center;
        }
        .ps-price-row {
          justify-content: center;
        }
        .ps-actions {
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 1rem;
        }
        .ps-qty {
          justify-content: space-between;
          width: 100%;
          max-width: 320px;
        }
        .ps-size-btn {
          width: 100%;
          max-width: 320px;
        }
        .ps-buy {
          width: 100%;
          max-width: 320px;
          min-height: 48px;
          flex-shrink: 0;
          font-size: 1rem;
        }
        .ps-left-bottom {
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
        }
      }

      /* ─── FOOTER STRIP ─── */
      .ps-footer {
        position: relative; z-index: 30; flex-shrink: 0;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.85rem 2rem;
        background: rgba(255,255,255,0.4);
        border-top: 1px solid rgba(0,0,0,0.05);
        gap: 1rem;
        opacity: 0;
        animation: ps-mount 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
      }
      .ps-footer-note {
        font-size: 0.68rem; color: rgba(0,0,0,0.5);
        line-height: 1.5;
      }
      .ps-footer-total {
        font-size: 0.8rem; color: rgba(0,0,0,0.6);
        white-space: nowrap;
      }
      .ps-footer-total strong {
        color: #111827; font-size: 1rem; font-weight: 800; letter-spacing: -0.02em;
      }

      /* ─── STAGGERED ENTRANCE TRANSITION FOR DETAILS ─── */
      .ps-right.text-fading > * {
        opacity: 0;
        transform: translateY(15px) scale(0.98);
      }
      .ps-right > * {
        transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ps-right > *:nth-child(1) { transition-delay: 0ms; }
      .ps-right > *:nth-child(2) { transition-delay: 50ms; }
      .ps-right > *:nth-child(3) { transition-delay: 100ms; }
      .ps-right > *:nth-child(4) { transition-delay: 150ms; }
      .ps-right > *:nth-child(5) { transition-delay: 200ms; }
      .ps-right > *:nth-child(6) { transition-delay: 250ms; }
      .ps-right > *:nth-child(7) { transition-delay: 300ms; }

      /* ─── ADD TO CART & SPINNER INTERACTION ─── */
      @keyframes ps-spin {
        100% { transform: rotate(360deg); }
      }
      .ps-spinner {
        animation: ps-spin 0.8s linear infinite;
      }
      .ps-buy.loading {
        cursor: wait;
        opacity: 0.85;
        background: #fff;
        color: #111827;
      }
      .ps-buy.success {
        background: #10b981 !important;
        color: #fff !important;
        border-color: #059669 !important;
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4) !important;
      }
      @keyframes cart-bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.25); }
      }
      .cart-pop {
        animation: cart-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        background: rgba(17, 24, 39, 0.1) !important;
        border-color: #111827 !important;
      }
      .cart-pop .ps-badge {
        background: #111827 !important;
        color: #fff !important;
        transform: scale(1.2);
        box-shadow: 0 0 8px rgba(17, 24, 39, 0.4);
      }

      /* ─── BADGE TOOLTIP INTERACTION ─── */
      .ps-badge-pill {
        position: relative;
        cursor: pointer;
      }
      .ps-badge-pill::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 125%; left: 50%;
        transform: translateX(-50%) translateY(4px);
        background: rgba(0, 0, 0, 0.85);
        color: #fff;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 0.65rem;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        z-index: 100;
      }
      .ps-badge-pill:hover::after {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      /* ─── MOBILE RESPONSIVENESS ─── */
      @media (max-width: 900px) {
        .ps-root { height: auto !important; min-height: 100dvh; overflow: visible !important; }
        .ps-content-wrap { flex-direction: column; }
        .ps-body { justify-content: flex-start; height: auto !important; overflow: visible !important; flex: 1; }
        .ps-left { width: 100%; flex: none; padding: 1rem; min-height: 45vh; justify-content: center; }
        .ps-right { width: 100%; flex: 1; padding: 2.5rem 1.5rem; margin: 0; }
        .ps-right::before {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.3);
          border-radius: 40px;
          background: rgba(255,255,255,0.25);
        }
        .ps-img-wrap { max-width: 280px; max-height: 280px; }
        .ps-footer { flex-direction: column; text-align: center; gap: 0.5rem; padding: 1rem; margin-top: auto; }
        .ps-header { padding: 1rem; }
        .ps-nav-btn { width: 38px; height: 38px; }
        .ps-title { font-size: 2rem; }
      }

      /* ─── 2K / 4K LARGE SCREENS ─── */
      @media (min-width: 1921px) {
        .ps-content-wrap { max-width: 2100px; }
        .ps-img-wrap { max-width: 700px; max-height: 700px; }
        .ps-right { padding: 4.5rem; margin: 3rem 3rem 3rem 0; }
        .ps-left { padding: 3rem; }
        .ps-flip-btn { top: 3rem; right: 3rem; padding: 12px 20px; font-size: 0.95rem; }
        .ps-title { font-size: 3.5rem; margin-bottom: 1rem; }
        .ps-desc { font-size: 1.1rem; max-width: 480px; margin-bottom: 2.5rem; }
        .ps-price { font-size: 4.5rem; }
        .ps-buy { height: 60px; font-size: 1.1rem; }
        .ps-thumb { width: 72px; height: 72px; border-radius: 16px; }
        .ps-nav-btn { width: 64px; height: 64px; }
        .ps-nav-btn.prev { left: 3rem; }
        .ps-nav-btn.next { right: 3rem; }
        .ps-qbtn { width: 60px; height: 60px; font-size: 1.3rem; }
        .ps-qnum { font-size: 1.2rem; min-width: 48px; }
        .ps-tag { font-size: 0.8rem; margin-bottom: 1.5rem; }
        .ps-badges { margin-bottom: 2.5rem; }
        .ps-badge-pill { font-size: 0.8rem; padding: 8px 18px; }
        .ps-price-block { margin-bottom: 3rem; }
        .ps-left-bottom { margin-top: 2rem; }
        .ps-counter-text { font-size: 0.95rem; }
        .ps-cdot { width: 8px; height: 8px; }
        .ps-cdot.active { width: 28px; }
      }

      /* ─── DARK THEME OVERRIDES ─── */
      .dark .ps-root {
        background: linear-gradient(135deg, #374151 0%, #111827 100%);
        color: #fff;
      }
      .dark .ps-bg-text { color: rgba(255,255,255, 0.03); mix-blend-mode: overlay; }
      .dark .ps-bg-blob.blob-1 { background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%); }
      .dark .ps-bg-blob.blob-2 { background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%); }
      .dark .ps-bg-blob.blob-3 { background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%); }
      .dark .ps-logo { color: #fff; }
      .dark .ps-hbtn { border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.12); color: #fff; }
      .dark .ps-hbtn:hover { background: rgba(255,255,255,0.18); }
      .dark .ps-badge { background: #ef4444; color: #fff; }
      .dark .ps-left::after { background: #ffffff; opacity: 0.18; filter: blur(60px); }
      .dark .ps-fake-shadow { background: radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 70%); }
      .dark .ps-flip-btn { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.15); color: #fff; }
      .dark .ps-flip-btn:hover { background: rgba(0,0,0,0.5); }
      .dark .ps-counter-text { color: rgba(255,255,255,0.55); }
      .dark .ps-cdot { background: rgba(255,255,255,0.25); }
      .dark .ps-cdot.active { background: #fff; box-shadow: 0 0 8px rgba(255, 255, 255, 0.6); }
      .dark .ps-thumb { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); }
      .dark .ps-thumb.active { border-color: #fff; box-shadow: 0 0 15px rgba(255, 255, 255, 0.2); }
      .dark .ps-thumb:hover:not(.active) { border-color: rgba(255,255,255,0.4); }
      .dark .ps-right::before { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05); }
      .dark .ps-tag { color: rgba(255,255,255,0.5); }
      .dark .ps-tag-dot { background: #fff; box-shadow: 0 0 6px rgba(255, 255, 255, 0.6); }
      .dark .ps-title { color: #fff; }
      .dark .ps-desc { color: rgba(255,255,255,0.6); }
      .dark .ps-divider { background: rgba(255,255,255,0.2); }
      .dark .ps-price-old { color: rgba(255,255,255,0.4); }
      .dark .ps-price { color: #fff; text-shadow: 0 0 20px rgba(255,255,255,0.1); }
      .dark .ps-save { color: #fbbf24; background: rgba(251,191,36,0.12); border-color: rgba(251,191,36,0.25); }
      .dark .ps-qty { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); }
      .dark .ps-size-btn {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
        color: #fff;
      }
      .dark .ps-size-btn:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
      }
      .dark .ps-qbtn { color: #fff; }
      .dark .ps-qbtn:hover { background: rgba(255,255,255,0.12); }
      .dark .ps-qbtn:disabled { color: rgba(255,255,255,0.2); }
      .dark .ps-qnum { color: #fff; }
      .dark .ps-buy { background: linear-gradient(135deg, #f8fafc 0%, #64748b 100%); color: #0f172a; border-color: #94a3b8; box-shadow: 0 8px 28px rgba(100,116,139,0.3); }
      .dark .ps-buy:hover { box-shadow: 0 12px 36px rgba(100,116,139,0.5); transform: translateY(-2px); filter: brightness(1.1); }
      .dark .ps-buy.loading { background: linear-gradient(135deg, #cbd5e1 0%, #64748b 100%); color: #0f172a; }
      .dark .cart-pop { background: rgba(255, 255, 255, 0.15) !important; border-color: #fff !important; }
      .dark .cart-pop .ps-badge { background: #fff !important; color: #000 !important; box-shadow: 0 0 8px rgba(255, 255, 255, 0.6); }
      .dark .ps-badge-pill { color: #fff; background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2); }
      .dark .ps-badge-pill:hover { background: rgba(255, 255, 255, 0.15); }
      .dark .ps-nav-btn { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.15); color: #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
      .dark .ps-nav-btn:hover { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.5); }
      .dark .ps-footer { background: rgba(0,0,0,0.25); border-top-color: rgba(255,255,255,0.08); }
      .dark .ps-footer-note { color: rgba(255,255,255,0.3); }
      .dark .ps-footer-total { color: rgba(255,255,255,0.5); }
      .dark .ps-footer-total strong { color: #fff; }
      @media (max-width: 900px) {
        .dark .ps-right::before { border-top-color: rgba(255,255,255,0.12); border-left: none; border-right: none; border-bottom: none; }
        .dark .ps-mobile-size-label {
          color: rgba(255,255,255,0.9);
        }
        .dark .ps-fabric-btn {
          color: rgba(255,255,255,0.8);
        }
      }
    `}</style>
  );
}
