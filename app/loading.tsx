export default function Loading() {
    return (
        <>
            <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .sk {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.4) 25%,
            rgba(255,255,255,0.8) 50%,
            rgba(255,255,255,0.4) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite linear;
          border-radius: 8px;
        }
      `}</style>

            {/* Full-page overlay — sits above Navbar */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9999,
                    background: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)",
                    pointerEvents: "none",
                }}
            >

                {/* ── Skeleton Body ── */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 100,
                        padding: "40px 24px",
                        flexDirection: 'column',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 12.5,
                        maxWidth: 480,
                        margin: "0 auto",
                    }}
                >
                    {/* Product image skeleton */}
                    <div
                        className="sk"
                        style={{ width: 180, height: 180, borderRadius: 20 }}
                    />
                    <div className="sk" style={{ width: 250, height: 20, borderRadius: 20 }}></div>
                    <div className="sk" style={{ width: 200, height: 15, borderRadius: 20 }}></div>
                </div>
            </div>
        </>
    );
}