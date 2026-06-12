import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { sizeChart } from '@/constants/sizeChart';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

export function SizeGuideModal({ isOpen, onClose, selectedSize, setSelectedSize }: SizeGuideModalProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const chunk1 = sizeChart.slice(0, 10);
  const chunk2 = sizeChart.slice(10);

  return createPortal(
    <>
      <style>{`
        /* ─── OVERLAY & ANIMATIONS ─── */
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .sg-overlay {
          position: fixed; inset: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .sg-backdrop {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: fade-in 0.3s ease-out forwards;
        }

        /* ─── MODAL CONTAINER ─── */
        .sg-modal {
          position: relative; width: 100%; max-width: 960px; max-height: 90vh;
          overflow-y: auto; scrollbar-width: none;
          border-radius: 24px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 30px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1);
          padding: 2.5rem;
          font-family: 'Inter', sans-serif;
          animation: modal-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .dark .sg-modal {
          background: rgba(23, 23, 23, 0.85); /* Sleek dark gray */
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        /* ─── HEADER ─── */
        .sg-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2rem;
        }
        .sg-title {
          font-size: 1.5rem; font-weight: 900; color: #111827; letter-spacing: -0.03em;
          margin: 0;
        }
        .dark .sg-title { color: #f9fafb; }
        .sg-close-btn {
          width: 36px; height: 36px; border-radius: 50%; border: none;
          background: rgba(0,0,0,0.05); color: #4b5563;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.2s;
        }
        .dark .sg-close-btn { background: rgba(255,255,255,0.08); color: #9ca3af; }
        .sg-close-btn:hover { background: rgba(0,0,0,0.1); transform: rotate(90deg); }
        .dark .sg-close-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }

        /* ─── SIZE CHIPS (Horizontal Scroll) ─── */
        .sg-chips-container {
          display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 1.5rem;
          scrollbar-width: none; scroll-snap-type: x mandatory;
        }
        .sg-chip {
          scroll-snap-align: center; flex-shrink: 0;
          min-width: 44px; height: 36px; padding: 0 14px;
          border-radius: 999px; font-weight: 700; font-size: 0.8rem;
          background: transparent; color: #4b5563;
          border: 1px solid rgba(0,0,0,0.2);
          cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark .sg-chip { border-color: rgba(255,255,255,0.15); color: #9ca3af; }
        .sg-chip:hover, .sg-chip.hovered { border-color: #111827; color: #111827; }
        .dark .sg-chip:hover, .dark .sg-chip.hovered { border-color: #fff; color: #fff; }
        .sg-chip.active {
          background: #111827; color: #fff; border-color: #111827;
          box-shadow: 0 4px 12px rgba(17, 24, 39, 0.3);
        }
        .dark .sg-chip.active {
          background: #fff; color: #111827; border-color: #fff;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }

        /* ─── TRANSPOSED TABLE DESIGN ─── */
        .sg-tables-wrapper {
          margin-bottom: 2.5rem;
        }
        .sg-table-label-row {
          font-size: 0.75rem; color: #6b7280; font-weight: 600; margin-bottom: 0.75rem;
        }
        .dark .sg-table-label-row { color: #9ca3af; }
        .sg-table {
          width: 100%; border-collapse: separate; border-spacing: 0;
          margin-bottom: 1.5rem;
          background: rgba(255,255,255,0.4);
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .dark .sg-table {
          background: rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.05);
        }
        .sg-table tr:first-child td {
          font-weight: 800; font-size: 0.85rem; color: #111827;
          background: rgba(0,0,0,0.02);
          padding-top: 1rem; padding-bottom: 1rem;
        }
        .dark .sg-table tr:first-child td { color: #fff; background: rgba(255,255,255,0.02); }
        .sg-table td {
          padding: 0.875rem 0.5rem; text-align: center;
          font-size: 0.875rem; font-weight: 600; color: #4b5563;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          transition: background 0.3s;
        }
        .dark .sg-table td { color: #d1d5db; border-bottom-color: rgba(255,255,255,0.03); }
        .sg-table tr:last-child td { border-bottom: none; }
        .sg-td-label {
          text-align: left !important; padding-left: 1.5rem !important;
          color: #9ca3af !important; font-weight: 700 !important; font-size: 0.75rem !important;
          text-transform: uppercase; letter-spacing: 0.05em;
          width: 120px;
        }
        .dark .sg-td-label { color: #6b7280 !important; }
        
        /* Highlight Column */
        .sg-td-val {
          transition: background 0.2s, color 0.2s;
        }
        .sg-td-val.active {
          background: rgba(184, 140, 160, 0.35); /* Noticeable premium pinkish tint */
          color: #831843 !important;
          font-weight: 800;
        }
        .sg-td-val.hovered {
          background: rgba(184, 140, 160, 0.2); /* Clear hover tint */
          color: #831843;
        }
        .dark .sg-td-val.active {
          background: rgba(255, 255, 255, 0.25);
          color: #fff !important;
          font-weight: 800;
        }
        .dark .sg-td-val.hovered {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        /* ─── FABRIC DETAILS ─── */
        .sg-section-title {
          font-size: 0.8rem; font-weight: 700; color: #6b7280; margin-bottom: 1rem;
        }
        .dark .sg-section-title { color: #9ca3af; }
        .sg-fabric-box {
          background: rgba(0,0,0,0.02); border-radius: 16px; padding: 1.5rem;
          margin-bottom: 1.5rem; border: 1px solid rgba(0,0,0,0.05);
        }
        .dark .sg-fabric-box { background: rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.05); }
        .sg-fabric-tags { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .sg-fabric-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 0.4rem 0.85rem; font-size: 0.75rem; font-weight: 600; border-radius: 999px;
          background: rgba(255,255,255,0.8); border: 1px solid rgba(0,0,0,0.08); color: #374151;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .dark .sg-fabric-tag { 
          background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); 
          color: #e5e7eb; box-shadow: none;
        }

        /* ─── WARNING BANNER ─── */
        .sg-warning {
          border-radius: 12px; background: rgba(220, 38, 38, 0.08); 
          border: 1px solid rgba(220, 38, 38, 0.2);
          padding: 1.25rem 1.5rem; display: flex; gap: 1rem;
          align-items: flex-start;
        }
        .dark .sg-warning { background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.25); }
        .sg-warn-icon { color: #dc2626; margin-top: 0.125rem; }
        .dark .sg-warn-icon { color: #f87171; }
        .sg-warn-title { font-size: 0.9rem; font-weight: 800; color: #b91c1c; margin-bottom: 0.35rem; }
        .dark .sg-warn-title { color: #fca5a5; }
        .sg-warn-text { font-size: 0.8rem; color: #991b1b; line-height: 1.6; margin: 0; font-weight: 500; }
        .dark .sg-warn-text { color: rgba(254, 226, 226, 0.9); }

        @media (max-width: 768px) {
          .sg-modal { padding: 1.5rem; border-radius: 20px; }
          .sg-table { min-width: 600px; }
          .sg-table-container { overflow-x: auto; }
          .sg-td-label { width: 90px; padding-left: 1rem !important; }
        }
      `}</style>

      <div className="sg-overlay">
        <div className="sg-backdrop" onClick={onClose} />

        <div className="sg-modal">
          {/* Header */}
          <div className="sg-header">
            <h2 className="sg-title">เลือกไซส์</h2>
            <button onClick={onClose} className="sg-close-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Size Selection Chips */}
          <div className="sg-chips-container">
            {sizeChart.map((s) => (
              <button
                key={s.size}
                onClick={() => { setSelectedSize(s.size); onClose(); }}
                onMouseEnter={() => setHoveredSize(s.size)}
                onMouseLeave={() => setHoveredSize(null)}
                className={`sg-chip ${selectedSize === s.size ? 'active' : ''} ${hoveredSize === s.size && selectedSize !== s.size ? 'hovered' : ''}`}
              >
                {s.size}
              </button>
            ))}
          </div>

          {/* Transposed Tables */}
          <div className="sg-tables-wrapper">
            <div className="sg-table-label-row">ตารางไซส์ (นิ้ว)</div>

            <div className="sg-table-container">
              {/* Table 1: SS to 6XL */}
              <table className="sg-table">
                <tbody>
                  <tr>
                    <td className="sg-td-label">SIZE</td>
                    {chunk1.map(s => <td key={`size-${s.size}`} onMouseEnter={() => setHoveredSize(s.size)} onMouseLeave={() => setHoveredSize(null)} onClick={() => { setSelectedSize(s.size); onClose(); }} className={`sg-td-val ${selectedSize === s.size ? 'active' : ''} ${hoveredSize === s.size && selectedSize !== s.size ? 'hovered' : ''}`} style={{ cursor: 'pointer' }}>{s.size}</td>)}
                  </tr>
                  <tr>
                    <td className="sg-td-label">รอบอก</td>
                    {chunk1.map(s => <td key={`chest-${s.size}`} onMouseEnter={() => setHoveredSize(s.size)} onMouseLeave={() => setHoveredSize(null)} onClick={() => { setSelectedSize(s.size); onClose(); }} className={`sg-td-val ${selectedSize === s.size ? 'active' : ''} ${hoveredSize === s.size && selectedSize !== s.size ? 'hovered' : ''}`} style={{ cursor: 'pointer' }}>{s.chest}</td>)}
                  </tr>
                  <tr>
                    <td className="sg-td-label">ความยาว</td>
                    {chunk1.map(s => <td key={`len-${s.size}`} onMouseEnter={() => setHoveredSize(s.size)} onMouseLeave={() => setHoveredSize(null)} onClick={() => { setSelectedSize(s.size); onClose(); }} className={`sg-td-val ${selectedSize === s.size ? 'active' : ''} ${hoveredSize === s.size && selectedSize !== s.size ? 'hovered' : ''}`} style={{ cursor: 'pointer' }}>{s.length}</td>)}
                  </tr>
                </tbody>
              </table>

              {/* Table 2: 7XL to 10XL */}
              <table className="sg-table">
                <tbody>
                  <tr>
                    <td className="sg-td-label">SIZE</td>
                    {chunk2.map(s => <td key={`size-${s.size}`} onMouseEnter={() => setHoveredSize(s.size)} onMouseLeave={() => setHoveredSize(null)} onClick={() => { setSelectedSize(s.size); onClose(); }} className={`sg-td-val ${selectedSize === s.size ? 'active' : ''} ${hoveredSize === s.size && selectedSize !== s.size ? 'hovered' : ''}`} style={{ cursor: 'pointer' }}>{s.size}</td>)}
                  </tr>
                  <tr>
                    <td className="sg-td-label">รอบอก</td>
                    {chunk2.map(s => <td key={`chest-${s.size}`} onMouseEnter={() => setHoveredSize(s.size)} onMouseLeave={() => setHoveredSize(null)} onClick={() => { setSelectedSize(s.size); onClose(); }} className={`sg-td-val ${selectedSize === s.size ? 'active' : ''} ${hoveredSize === s.size && selectedSize !== s.size ? 'hovered' : ''}`} style={{ cursor: 'pointer' }}>{s.chest}</td>)}
                  </tr>
                  <tr>
                    <td className="sg-td-label">ความยาว</td>
                    {chunk2.map(s => <td key={`len-${s.size}`} onMouseEnter={() => setHoveredSize(s.size)} onMouseLeave={() => setHoveredSize(null)} onClick={() => { setSelectedSize(s.size); onClose(); }} className={`sg-td-val ${selectedSize === s.size ? 'active' : ''} ${hoveredSize === s.size && selectedSize !== s.size ? 'hovered' : ''}`} style={{ cursor: 'pointer' }}>{s.length}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fabric Details */}
          <div className="sg-fabric-box">
            <h3 className="sg-section-title">รายละเอียดเนื้อผ้า</h3>
            <div className="sg-fabric-tags">
              {['✨ ตารางเงา', '🌟 ผิวสัมผัสมีความเงา', '🍃 เนื้อผ้าเบา สบาย', '🚫 ไม่แนบเนื้อ', '💨 ระบายอากาศยอดเยี่ยม'].map(tag => (
                <span key={tag} className="sg-fabric-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Warning Banner */}
          <div className="sg-warning">
            <div className="sg-warn-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <h4 className="sg-warn-title">หมายเหตุสำคัญ</h4>
              <p className="sg-warn-text">
                เสื้อตัวนี้ออกแบบมาเพื่อ <strong>แทนเสื้อคอกลม</strong> ที่ใช้ในค่าย — มีเนื้อผ้า แตกต่างจากโปโลทั่วไป บางกว่า เบากว่า ระบายอากาศดีกว่า เหมาะกับสภาพอากาศร้อน
              </p>
            </div>
          </div>

        </div>
      </div>
    </>,
    document.body
  );
}
