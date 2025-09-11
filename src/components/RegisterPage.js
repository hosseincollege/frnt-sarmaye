import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    boxSizing: "border-box"
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await 
      // RegisterPage.js
      fetch(`${process.env.REACT_APP_API_URL}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email
        }),
      });


      const data = await response.json();

      if (response.ok) {
        alert("✅ ثبت‌نام با موفقیت انجام شد!");
        navigate("/");
      } else {
        alert(`❌ خطا در ثبت‌نام:\n${JSON.stringify(data)}`);
      }
    } catch (err) {
      alert("⚠️ خطای اتصال به سرور!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ direction: "rtl", textAlign: "right", maxWidth: "400px", margin: "auto" }}>
      <h2>ثبت‌نام کاربر</h2>
      <form onSubmit={handleSubmit}>
        <label>نام کاربری:</label>
        <input
          style={inputStyle}
          type="text"
          name="username"
          placeholder="نام کاربری خود را وارد کنید"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>ایمیل:</label>
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="ایمیل (اختیاری)"
          value={formData.email}
          onChange={handleChange}
        />

        <label>رمز عبور:</label>
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "در حال ارسال..." : "ثبت‌نام"}
        </button>
      </form>

      <br />
      {/* دکمه بازگشت به صفحه اصلی */}
      <button type="button" onClick={() => navigate("/")}>
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
}
