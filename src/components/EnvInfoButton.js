import { useState } from "react";

export default function EnvInfoButton({ backendInfo }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    // دیو مادر جدید با position: fixed و رویدادهای hover
    <div
      style={{ position: "fixed", top: 10, left: 100, zIndex: 9999 }}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* آیکون ℹ️ */}
      <div
        style={{
          background: "#ffffffff",
          color: "white",
          padding: "0px 0px",
          borderRadius: "30%",
          cursor: "pointer",
        }}
      >
        ℹ️
      </div>

      {/* پنجره اطلاعات */}
      {showInfo && (
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <p><b>Frontend:</b> {process.env.NODE_ENV.toUpperCase()}</p>
          <p><b>Backend:</b> {backendInfo.backend_env}</p>
          {backendInfo?.is_superuser && (
            <>
              <p><b>API URL:</b> {process.env.REACT_APP_API_URL}</p>
              <p><b>your IP:</b> {backendInfo.ip}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
