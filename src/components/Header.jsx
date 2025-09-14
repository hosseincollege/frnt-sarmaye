import React, { useState, useEffect, useRef, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSubMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
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
        fontFamily: "'Vazirmatn', sans-serif",
      }}
    >
      {/* منوی همبرگری */}
      <div style={{ position: "relative" }} ref={menuRef}>
        <span style={{ cursor: "pointer" }} onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </span>

        {/* منوی اصلی همبرگر */}
        <div
          style={{
            display: menuOpen ? "block" : "none",
            position: "absolute",
            top: "30px",
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            minWidth: "150px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
          }}
        >
          {/* آیتم لیست کارگاه‌ها با زیرمنو */}
          <div
            style={{
              padding: "5px 15px",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onMouseEnter={() => setSubMenuOpen(true)}
            onMouseLeave={() => setSubMenuOpen(false)}
          >
            {/* لینک مستقیم */}
            <span onClick={() => navigate("/workshops")}>لیست کارگاه‌ها</span>

            {/* فلش فقط نمایشیه */}
            <span>◂</span>

            {/* زیرمنو */}
            <div
              style={{
                display: subMenuOpen ? "block" : "none",
                position: "absolute",
                top: 0,
                right: "100%",
                background: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "5px",
                minWidth: "140px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                padding: "5px 0",
                zIndex: 2000,
              }}
            >
              <div
                style={{ padding: "5px 15px", cursor: "pointer" }}
                onClick={() => navigate("/workshops/industrial")}
              >
                صنعتی
              </div>
              <div
                style={{ padding: "5px 15px", cursor: "pointer" }}
                onClick={() => navigate("/workshops/medical")}
              >
                پزشکی
              </div>
              <div
                style={{ padding: "5px 15px", cursor: "pointer" }}
                onClick={() => navigate("/workshops/agriculture")}
              >
                کشاورزی
              </div>
            </div>
          </div>


          {/* آیتم‌های دیگر */}
          <div style={{ padding: "5px 15px", cursor: "pointer" }} onClick={() => navigate("/crypto")}>
            رمز ارز
          </div>
          <div style={{ padding: "5px 15px", cursor: "pointer" }} onClick={() => navigate("/invest")}>
            سرمایه گذاری
          </div>
        </div>
      </div>


      {/* لوگو */}
      <div
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          cursor: "pointer",
          color: "#a30fdd",
          transition: "color 0.3s ease",
        }}
        onClick={() => navigate("/")}
        onMouseEnter={(e) => (e.target.style.color = "#5e0375")}
        onMouseLeave={(e) => (e.target.style.color = "#a30fdd")}
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
            fontFamily: "'Vazirmatn', sans-serif",
          }}
        />
      </div>

      {/* منوی کاربر */}
      <div style={{ position: "relative" }} ref={userMenuRef}>
        <span style={{ cursor: "pointer" }} onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <AccountCircleIcon />
        </span>

        <div
          style={{
            display: userMenuOpen ? "block" : "none",
            position: "absolute",
            top: "35px",
            left: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
            minWidth: "150px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            textAlign: "right",
            fontFamily: "'Vazirmatn', sans-serif",
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
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#fff",
                  color: "#2b00ff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                ورود
              </button>
              <button
                onClick={() => navigate("/register")}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#fff",
                  color: "#ff00ee",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                ثبت‌نام
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
