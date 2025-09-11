import { useState } from "react";

export default function EnvInfoButton({ backendInfo }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {/* آیکون ℹ️ */}
      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          background: "#1976d2",
          color: "white",
          padding: "8px 10px",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 9999,
        }}
        onClick={() => setShowInfo(!showInfo)}
      >
        ℹ️
      </div>

      {/* پنجره اطلاعات */}
      {showInfo && (
        <div
          style={{
            position: "fixed",
            top: 50,
            left: 10,
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            zIndex: 9999,
          }}
        >
          <p><b>Frontend:</b> {process.env.NODE_ENV.toUpperCase()}</p>
          <p><b>API URL:</b> {process.env.REACT_APP_API_URL}</p>
          {backendInfo && (
            <>
              <p><b>Backend:</b> {backendInfo.backend_env}</p>
              <p><b>your IP:</b> {backendInfo.ip}</p>
            </>
          )}
          <button onClick={() => setShowInfo(false)}>Close</button>
        </div>
      )}
    </>
  );
}
