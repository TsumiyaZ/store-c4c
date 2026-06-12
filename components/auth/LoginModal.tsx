"use client";

import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes lmPop {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes lmSlide {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes lmBreathe {
          0% { transform: scale(0.8) translate(0, 0); opacity: 0.3; }
          50% { transform: scale(1.1) translate(-10px, 15px); opacity: 0.6; }
          100% { transform: scale(0.9) translate(15px, -10px); opacity: 0.4; }
        }

        .lm-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          opacity: ${visible ? 1 : 0};
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lm-backdrop {
          position: absolute; inset: 0;
          background: rgba(15, 8, 20, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .lm-card {
          position: relative;
          width: 100%; max-width: 380px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 2.5rem;
          padding: 2.5rem 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transform: ${visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.9)'};
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
          color: #fff;
          font-family: 'Kanit', sans-serif !important;
          overflow: hidden; /* contain the background blobs */
        }
        html.dark .lm-card {
          background: rgba(30, 20, 40, 0.6);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .lm-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          z-index: 0;
          pointer-events: none;
          animation: lmBreathe 8s infinite alternate ease-in-out;
        }
        .lm-glow-1 {
          top: -20px; right: -20px;
          width: 150px; height: 150px;
          background: rgba(236, 72, 153, 0.4);
        }
        .lm-glow-2 {
          bottom: -20px; left: -20px;
          width: 150px; height: 150px;
          background: rgba(168, 85, 247, 0.4);
          animation-delay: -4s;
        }
        html.dark .lm-glow-1 { background: rgba(236, 72, 153, 0.25); }
        html.dark .lm-glow-2 { background: rgba(168, 85, 247, 0.25); }

        .lm-icon-wrap, .lm-title, .lm-subtitle, .lm-btn-google {
          position: relative;
          z-index: 1;
        }
        
        .lm-close {
          position: absolute; top: 1.25rem; right: 1.25rem;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: none; background: rgba(255,255,255,0.1);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .lm-close:hover { background: rgba(255,255,255,0.25); }

        .lm-icon-wrap {
          width: 60px; height: 60px;
          margin: 0 auto 1.25rem auto;
          background: linear-gradient(135deg, #831843, #ec4899);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px rgba(236, 72, 153, 0.4);
          opacity: 0;
          animation: lmPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.05s;
        }

        .lm-title {
          font-size: 1.75rem; font-weight: 900; text-align: center;
          margin-bottom: 0.25rem;
          color: #fff;
          opacity: 0;
          animation: lmSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s;
        }
        .lm-subtitle {
          font-size: 0.9rem; text-align: center; color: rgba(255,255,255,0.7);
          margin-bottom: 2rem;
          opacity: 0;
          animation: lmSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.15s;
        }

        .lm-label {
          display: block; font-size: 0.75rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.05em;
          margin-bottom: 0.5rem; color: rgba(255,255,255,0.8);
        }
        .lm-input {
          width: 100%; padding: 0.85rem 1.2rem;
          border-radius: 1rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff; font-size: 0.95rem; font-family: inherit;
          outline: none; transition: all 0.2s;
          margin-bottom: 1.25rem;
        }
        .lm-input::placeholder { color: rgba(255,255,255,0.4); }
        .lm-input:focus {
          background: rgba(255,255,255,0.15);
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2);
        }

        .lm-btn-main {
          width: 100%; padding: 0.9rem;
          border-radius: 1rem; border: none;
          background: linear-gradient(135deg, #ec4899, #831843);
          color: #fff; font-weight: 700; font-size: 1rem; font-family: inherit;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 8px 20px rgba(236, 72, 153, 0.3);
          margin-top: 0.5rem;
        }
        .lm-btn-main:hover { transform: scale(1.02); box-shadow: 0 10px 25px rgba(236, 72, 153, 0.4); }
        .lm-btn-main:active { transform: scale(0.98); }

        .lm-divider {
          display: flex; align-items: center; margin: 1.5rem 0;
        }
        .lm-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.2); }
        .lm-divider-text { padding: 0 1rem; font-size: 0.75rem; color: rgba(255,255,255,0.5); font-weight: 600; text-transform: uppercase; }

        .lm-btn-google {
          width: 100%; padding: 0.95rem;
          border-radius: 1.25rem; border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: #fff; font-weight: 600; font-size: 0.95rem; font-family: inherit;
          cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; align-items: center; justify-content: center; gap: 0.75rem;
          opacity: 0;
          animation: lmSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s;
        }
        .lm-btn-google:hover { 
          background: rgba(255,255,255,0.15); 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .lm-btn-google:active { transform: translateY(0); }

        /* Light mode overrides */
        html:not(.dark) .lm-card {
          color: #333;
          background: rgba(255, 255, 255, 0.6);
          border-color: rgba(255, 255, 255, 0.8);
        }
        html:not(.dark) .lm-title { color: #831843; }
        html:not(.dark) .lm-subtitle { color: #666; }
        html:not(.dark) .lm-close { color: #666; background: rgba(0,0,0,0.05); }
        html:not(.dark) .lm-close:hover { background: rgba(0,0,0,0.1); }
        html:not(.dark) .lm-label { color: #831843; font-weight: 700; }
        html:not(.dark) .lm-input { 
          background: rgba(255,255,255,0.8); 
          border-color: rgba(0,0,0,0.15); 
          color: #333; 
        }
        html:not(.dark) .lm-input::placeholder { color: #999; }
        html:not(.dark) .lm-divider-line { background: rgba(0,0,0,0.1); }
        html:not(.dark) .lm-divider-text { color: #999; }
        html:not(.dark) .lm-btn-google { 
          background: #fff; color: #333; border-color: rgba(0,0,0,0.1); 
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        html:not(.dark) .lm-btn-google:hover { 
          background: #fdfdfd; 
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }
        html:not(.dark) .lm-btn-google:active { transform: translateY(0); }
      `}</style>
      <div className="lm-overlay">
        <div className="lm-backdrop" onClick={onClose} />
        <div className="lm-card">
          <div className="lm-glow lm-glow-1"></div>
          <div className="lm-glow lm-glow-2"></div>
          <button className="lm-close" onClick={onClose} style={{ zIndex: 2 }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M1 1L13 13M1 13L13 1" />
            </svg>
          </button>

          <div className="lm-icon-wrap">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h2 className="lm-title">เข้าสู่ระบบ</h2>
          <p className="lm-subtitle">ยินดีต้อนรับกลับสู่ C4C 2026</p>

          <button className="lm-btn-google" onClick={() => signIn('google')}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            ดำเนินการต่อด้วย Google
          </button>
        </div>
      </div>
    </>
  );
}