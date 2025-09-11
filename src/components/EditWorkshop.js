// src/EditWorkshop.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import axios from "axios";

export default function EditWorkshop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    phone: "",
    representative: "",
    address: "",
    product_type: "",
    contract_type: "",
    contract_duration: "",
    profit_percentage: "",
    required_investment: "",
    capital_coverage: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [files, setFiles] = useState([]);

  // گرفتن داده اولیه
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/workshops/${id}/`)
      .then((res) => {
        const d = res.data;
        setForm({
          title: d.name || "",
          description: d.description || "",
          phone: d.phone || "",
          representative: d.representative || "",
          address: d.location || "",
          product_type: d.product_type || "",
          contract_type: d.contract_details || "",
          contract_duration: d.duration_months || "",
          profit_percentage: d.profit_percentage || "",
          required_investment: d.investment_needed || "",
          capital_coverage: d.funded_percentage || "",
        });
      })
      .catch((err) => {
        console.error("خطا در گرفتن داده:", err);
        alert("❌ خطا در دریافت اطلاعات کارگاه");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.title);
    fd.append("description", form.description);
    fd.append("representative", form.representative);
    fd.append("phone", form.phone);
    fd.append("location", form.address);
    fd.append("product_type", form.product_type);
    fd.append("investment_needed", form.required_investment);
    fd.append("funded_percentage", form.capital_coverage || 0);
    fd.append("profit_percentage", form.profit_percentage);
    fd.append("duration_months", form.contract_duration);
    fd.append("contract_details", form.contract_type);

    if (coverImage) {
      fd.append("cover_image", coverImage);
    }

    files.forEach((file) => {
      fd.append("uploaded_images_files", file);
    });

    try {
      await axios.put(`http://127.0.0.1:8000/api/workshops/${id}/`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      alert("✅ ویرایش کارگاه با موفقیت انجام شد");
      navigate(-1);
    } catch (error) {
      console.error("خطای بک‌اند:", error.response?.data || error.message);
      alert(
        "❌ خطا در ویرایش کارگاه: " +
          JSON.stringify(error.response?.data || error.message)
      );
    }
  };

  return (
    <Paper
      sx={{
        direction: "rtl",
        textAlign: "right",
        p: 3,
        borderRadius: 2,
        background: "#f9f9f9",
      }}
    >
      <Typography variant="h6" gutterBottom>
        ویرایش کارگاه
      </Typography>

      {/* دکمه بازگشت */}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        بازگشت
      </Button>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="عنوان" name="title" value={form.title} onChange={handleChange} />
        <TextField label="توضیحات" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
        <TextField label="شماره تماس" name="phone" value={form.phone} onChange={handleChange} />
        <TextField label="نمایندگی" name="representative" value={form.representative} onChange={handleChange} />
        <TextField label="آدرس" name="address" value={form.address} onChange={handleChange} />
        <TextField label="نوع محصول" name="product_type" value={form.product_type} onChange={handleChange} />
        <TextField label="نوع قرارداد" name="contract_type" value={form.contract_type} onChange={handleChange} />
        <TextField label="مدت قرارداد (ماه)" name="contract_duration" value={form.contract_duration} onChange={handleChange} />
        <TextField label="درصد سود" name="profit_percentage" value={form.profit_percentage} onChange={handleChange} />
        <TextField label="سرمایه لازم" name="required_investment" value={form.required_investment} onChange={handleChange} />
        <TextField label="درصد پوشش سرمایه" name="capital_coverage" value={form.capital_coverage} onChange={handleChange} />

        <Typography>کاور جدید (اختیاری):</Typography>
        <Button variant="outlined" component="label">
          انتخاب فایل
          <input type="file" hidden onChange={(e) => setCoverImage(e.target.files[0])} />
        </Button>
        {coverImage && (
          <Typography variant="body2" color="textSecondary">
            📄 {coverImage.name}
          </Typography>
        )}

        <Typography>تصاویر اضافی جدید (اختیاری):</Typography>
        <Button variant="outlined" component="label">
          انتخاب فایل‌ها
          <input type="file" hidden multiple onChange={(e) => setFiles([...e.target.files])} />
        </Button>
        {files.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="textSecondary">
              📦 {files.length} فایل انتخاب شده:
            </Typography>
            <ul>
              {files.map((file, index) => (
                <li key={index}>📄 {file.name}</li>
              ))}
            </ul>
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary">
          ذخیره تغییرات
        </Button>
      </Box>
    </Paper>
  );
}
