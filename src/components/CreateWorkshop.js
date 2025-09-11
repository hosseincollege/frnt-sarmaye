import { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

export default function CreateWorkshop({ onCreated }) {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    // ارسال مطابق با نام‌های مدل بک‌اند
    fd.append("name", form.title);
    fd.append("description", form.description);
    fd.append("representative", form.representative);
    fd.append("phone", form.phone);
    fd.append("location", form.address); // آدرس → location
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
      fd.append("uploaded_images_files", file); // هم‌نام با بک‌اند
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/workshops/`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      alert("✅ کارگاه با موفقیت ثبت شد");
      if (onCreated) onCreated();
      setForm({
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
      setCoverImage(null);
      setFiles([]);
    } catch (error) {
      console.error("خطای بک‌اند:", error.response?.data || error.message);
      alert("❌ خطا در ثبت کارگاه: " + JSON.stringify(error.response?.data || error.message));
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
        ایجاد کارگاه جدید
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography>عنوان کارگاه:</Typography>
        <TextField name="title" value={form.title} onChange={handleChange} />

        <Typography>توضیحات:</Typography>
        <TextField
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
        />

        <Typography>شماره تماس:</Typography>
        <TextField name="phone" value={form.phone} onChange={handleChange} />

        <Typography>نمایندگی:</Typography>
        <TextField
          name="representative"
          value={form.representative}
          onChange={handleChange}
        />

        <Typography>آدرس:</Typography>
        <TextField name="address" value={form.address} onChange={handleChange} />

        <Typography>نوع محصول:</Typography>
        <TextField
          name="product_type"
          value={form.product_type}
          onChange={handleChange}
        />

        <Typography>نوع قرارداد:</Typography>
        <TextField
          name="contract_type"
          value={form.contract_type}
          onChange={handleChange}
        />

        <Typography>مدت قرارداد (ماه):</Typography>
        <TextField
          name="contract_duration"
          value={form.contract_duration}
          onChange={handleChange}
        />

        <Typography>درصد سود:</Typography>
        <TextField
          name="profit_percentage"
          value={form.profit_percentage}
          onChange={handleChange}
        />

        <Typography>سرمایه لازم:</Typography>
        <TextField
          name="required_investment"
          value={form.required_investment}
          onChange={handleChange}
        />

        <Typography>درصد پوشش سرمایه:</Typography>
        <TextField
          name="capital_coverage"
          value={form.capital_coverage}
          onChange={handleChange}
        />

        {/* کاور */}
        <Typography>کاور:</Typography>
        <Button variant="outlined" component="label">
          انتخاب فایل
          <input
            type="file"
            hidden
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </Button>
        {coverImage && (
          <Typography variant="body2" color="textSecondary">
            📄 {coverImage.name}
          </Typography>
        )}

        {/* تصاویر اضافی */}
        <Typography>تصاویر اضافی:</Typography>
        <Button variant="outlined" component="label">
          انتخاب فایل‌ها
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => setFiles([...e.target.files])}
          />
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
          ایجاد کارگاه
        </Button>
      </Box>
    </Paper>
  );
}
