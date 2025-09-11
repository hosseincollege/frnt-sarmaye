import React, { useState, useEffect, useRef, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../AuthContext"; // 👈 مسیر متناسب با پوشه‌ها
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, fetchUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // بستن منوی کاربر با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setCurrentUser(null);
    setUserMenuOpen(false);
  };

  return (
    <header
      style={{
        direction: "rtl",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* منوی همبرگری */}
      <div style={{ position: "relative" }}>
        <span style={{ cursor: "pointer" }} onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </span>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "30px",
              right: 0,
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              minWidth: "120px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            }}
          >
            <p style={{ margin: "5px 0" }}>دسته ۱</p>
            <p style={{ margin: "5px 0" }}>دسته ۲</p>
            <p style={{ margin: "5px 0" }}>دسته ۳</p>
          </div>
        )}
      </div>

      <div
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          cursor: "pointer",
          color: "#3207e0ff", // رنگ
          transition: "color 0.3s ease",
        }}
        onClick={() => navigate("/")}
        onMouseEnter={(e) => (e.target.style.color = "#5e0375ff")} // رنگ تیره‌تر موقع هاور
        onMouseLeave={(e) => (e.target.style.color = "#a30fddff")} // برگشت به رنگ اصلی
      >
        سرمایه گذاری در تولید
      </div>



      {/* جستجو */}
      <div
        style={{
          flex: 1,
          maxWidth: "500px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          padding: "0 10px",
          margin: "0 20px",
        }}
      >
        <input
          type="text"
          placeholder="جستجو ..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            padding: "8px",
            fontSize: "14px",
          }}
        />
      </div>

      {/* آدمک */}
      <div style={{ position: "relative" }} ref={userMenuRef}>
        <span style={{ cursor: "pointer" }} onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <AccountCircleIcon />
        </span>

        {userMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "35px",
              left: 0,
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              minWidth: "50px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              textAlign: "right",
            }}
          >
            {currentUser ? (
              <>
                <p style={{ margin: "5px 0" }}>👋 سلام، {currentUser.username}</p>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "5px",
                    background: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <p
                  style={{ margin: "5px 0", cursor: "pointer" }}
                  onClick={() => (window.location.href = "/login")}
                >
                  ورود
                </p>
                <p
                  style={{ margin: "5px 0", cursor: "pointer" }}
                  onClick={() => (window.location.href = "/register")}
                >
                  ثبت‌نام
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
