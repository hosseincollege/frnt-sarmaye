import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import WorkshopList from "./components/WorkshopList";
import WorkshopDetail from "./components/WorkshopDetail";
import EditWorkshop from './components/EditWorkshop';
import CreateWorkshopPage from './components/CreateWorkshopPage';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage";




export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
  {/* بقیه کد */}
  <ToastContainer position="top-center" autoClose={3000} />

    <Router>
      <Header />   {/* اینجا هدر اضافه شد */}
      <div style={{ maxWidth: "800px", margin: "20px auto 0 auto" }}>
        <Routes>
          <Route path="/" element={<HomePage key={refreshKey} />} />       {/* صفحه اصلی */}
          <Route path="/workshops" element={<WorkshopList />} /> {/* لیست کارگاه‌ها */}
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

