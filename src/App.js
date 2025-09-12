import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "./AuthContext";


export default function App() {
  const { currentUser } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [backendInfo, setBackendInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");

    fetch(`${process.env.REACT_APP_API_URL}/api/backend-info/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => res.json())
      .then(data => setBackendInfo(prev => ({ ...prev, ...data })))
      .catch(err => console.error("Backend info fetch error:", err));

    // 🔹 دیگر لازم نیست /api/user/me/ و حذفش می‌کنیم چون backend_info حالا is_superuser رو میده
  }, [currentUser]); // وابسته به تغییر کاربر








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
