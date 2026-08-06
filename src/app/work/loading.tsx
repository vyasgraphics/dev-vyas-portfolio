export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <div className="route-loading-spinner" />
      <style>{`
        .route-loading-spinner {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.12);
          border-top-color: #00C853;
          animation: routeLoadingSpin 0.8s linear infinite;
        }
        @keyframes routeLoadingSpin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .route-loading-spinner { animation: none; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
