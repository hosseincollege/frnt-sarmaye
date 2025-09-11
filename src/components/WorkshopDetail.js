import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WorkshopDetail() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/workshops/${id}/`)
      .then((res) => {
        console.log("📥 جزئیات کارگاه:", res.data);
        setWorkshop(res.data);
      })
      .catch((err) => {
        console.error("❌ خطا در گرفتن جزئیات:", err.response?.data || err.message);
      });
  }, [id]);

  if (!workshop) return <p>در حال بارگذاری...</p>;

  return (
    <Paper sx={{ p: 3, direction: "rtl" }}>
      {/* دکمه بازگشت */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        بازگشت
      </Button>
      <Typography variant="h5" gutterBottom>{workshop.name}</Typography>
      {workshop.cover_image && (
        <img
          src={
            workshop.cover_image.startsWith("http")
              ? workshop.cover_image
              : `http://127.0.0.1:8000${workshop.cover_image}`
          }
          alt="کاور"
          style={{ maxWidth: "300px", marginBottom: "10px" }}
        />
      )}
      {workshop.uploaded_images &&
        workshop.uploaded_images.map((img) => (
          <img
            key={img.id}
            src={`http://127.0.0.1:8000${img.image}`}
            alt="تصویر اضافی"
            style={{ maxWidth: "150px", margin: "5px" }}
          />
        ))}
      <Typography>{workshop.description}</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>نمایندگی: {workshop.representative}</Typography>
        <Typography>شماره تماس: {workshop.phone}</Typography>
        <Typography>مکان: {workshop.location}</Typography>
        <Typography>نوع محصول: {workshop.product_type}</Typography>
        <Typography>مدت قرارداد: {workshop.duration_months} ماه</Typography>
        <Typography>سرمایه لازم: {workshop.investment_needed}</Typography>
        <Typography>درصد پوشش سرمایه: {workshop.funded_percentage}%</Typography>
        <Typography>درصد سود: {workshop.profit_percentage}%</Typography>
        <Typography>جزئیات قرارداد: {workshop.contract_details}</Typography>
      </Box>
    </Paper>
  );
}
