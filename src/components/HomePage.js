import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>به وبسایت ما خوش آمدید</h1>
      <p>در این سایت می‌توانید کارگاه‌ها را مشاهده و مدیریت کنید.</p>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/workshops")}
        sx={{ mt: 2 }}
      >
        مشاهده کارگاه‌ها
      </Button>
    </div>
  );
}
