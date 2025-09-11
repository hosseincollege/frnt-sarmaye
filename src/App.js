import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WorkshopList from "./components/WorkshopList";
import WorkshopDetail from "./components/WorkshopDetail";
import EditWorkshop from "./components/EditWorkshop";
import CreateWorkshopPage from "./components/CreateWorkshopPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/HomePage";
import "react-toastify/dist/ReactToastify.css";
import EnvInfoButton from "./components/EnvInfoButton";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [backendInfo, setBackendInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // مرحله ۱: گرفتن backend_env و ip بدون نیاز به لاگین
    fetch(`${process.env.REACT_APP_API_URL}/api/backend-info/`)
      .then(res => res.json())
      .then(data => setBackendInfo(data))
      .catch(err => console.error("Backend info fetch error:", err));

    // مرحله ۲: فقط اگر توکن داری کاربر رو هم بگیر
    const token = localStorage.getItem("access");
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/api/user/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
          return res.json();
        })
        .then(data => setBackendInfo(data))
        .catch(err => console.error("User info fetch error:", err));
    }
  }, []);


  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Header />

        {/* دکمه EnvInfoButton به همراه props اطلاعات بک‌اند */}
        <EnvInfoButton backendInfo={backendInfo} />


        {/* محتوای اصلی Routes */}
        <div style={{ maxWidth: "800px", margin: "20px auto 0 auto" }}>
          <Routes>
            <Route
              path="/"
              element={<HomePage key={refreshKey} />}
            />
            <Route path="/workshops" element={<WorkshopList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreateWorkshopPage />} />
            <Route path="/workshops/:id" element={<WorkshopDetail />} />
            <Route path="/edit/:id" element={<EditWorkshop />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
