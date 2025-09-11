import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext"; // 👈 اضافه شده برای استفاده از Context
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Grid, Button } from "@mui/material";

export default function WorkshopList() {
  const [workshops, setWorkshops] = useState([]);
  const { currentUser } = useContext(AuthContext); // 👈 گرفتن کاربر از Context
  const navigate = useNavigate();

  // گرفتن لیست کارگاه‌ها
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/workshops/`)
      .then((res) => {
        console.log("📥 داده‌های دریافتی:", res.data);
        setWorkshops(res.data);
      })
      .catch((err) => {
        console.error("❌ خطا در گرفتن لیست:", err.response?.data || err.message);
      });
  }, []);

  // تابع حذف کارگاه
  const handleDelete = async (id) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این کارگاه را حذف کنید؟")) {
      await fetch(`${process.env.REACT_APP_API_URL}/api/workshops/${id}/`, {
        method: "DELETE",
      });
      setWorkshops(workshops.filter((w) => w.id !== id));
    }
  };

  if (!workshops.length) return <p>هیچ کارگاهی ثبت نشده است</p>;

  return (
    <>
      <div style={{ width: "100%" }}>
        {/* دکمه‌ها */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            direction: "ltr", // ترتیب لفت‌تو-رایت برای دکمه‌ها
            paddingRight: "20px", // فاصله از لبه راست
          }}
        >
          {!currentUser ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/login")}
              >
                ورود
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/register")}
              >
                ثبت‌نام
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/create")}
            >
              ایجاد کارگاه جدید
            </Button>
          )}
        </div>

        {/* گرید کارگاه‌ها */}
        <Grid container spacing={2} sx={{ direction: "rtl" }}>
          {workshops.map((workshop) => (
            <Grid item xs={12} sm={6} md={4} key={workshop.id}>
              {/* کارت */}
            </Grid>
          ))}
        </Grid>
      </div>

      <div>
        <Grid container spacing={2} sx={{ direction: "rtl" }}>
          {workshops.map((workshop) => (
            <Grid item xs={12} sm={6} md={4} key={workshop.id}>
              {/* بقیه کد کارت */}
              <Card sx={{ p: 1 }}>
                {workshop.cover_image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      workshop.cover_image.startsWith("http")
                        ? workshop.cover_image
                        : `${process.env.REACT_APP_API_URL}${workshop.cover_image}`
                    }
                    alt="کاور"
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/workshops/${workshop.id}`}
                    sx={{ textDecoration: "none", color: "primary.main" }}
                  >
                    {workshop.name}
                  </Typography>
                  {workshop.uploaded_images_urls &&
                    workshop.uploaded_images_urls.map((img) => (
                      <img
                        key={img.id}
                        src={`${process.env.REACT_APP_API_URL}${img.image}`}
                        alt="تصویر اضافی"
                        style={{
                          maxWidth: "150px",
                          marginLeft: "5px",
                          marginBottom: "5px",
                        }}
                      />
                    ))}
                  <Typography variant="body2">{workshop.description}</Typography>

                  {/* دکمه‌های عملیات */}
                  {currentUser?.username === workshop.owner?.username && (
                    <Grid container spacing={1} mt={1}>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/edit/${workshop.id}`)}
                        >
                          ویرایش
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(workshop.id)}
                        >
                          حذف
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
