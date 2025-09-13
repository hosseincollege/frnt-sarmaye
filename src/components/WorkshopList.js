import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
  Box,
  CircularProgress,
  Stack,
  CardActionArea,
  Divider,
  Paper,
} from "@mui/material";
// آیکون‌ها برای نمایش اطلاعات روی کارت
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

export default function WorkshopList() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/workshops/`)
      .then((res) => {
        setWorkshops(res.data);
      })
      .catch((err) => {
        console.error("❌ خطا در گرفتن لیست:", err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این کارگاه را حذف کنید؟")) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/workshops/${id}/`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${localStorage.getItem("access")}` },
        });
        setWorkshops(workshops.filter((w) => w.id !== id));
      } catch (err) {
        console.error("❌ خطا در حذف کارگاه:", err);
      }
    }
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${process.env.REACT_APP_API_URL}${path}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>در حال بارگذاری کارگاه‌ها...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, direction: "rtl" }}>
      {/* ===== بخش هدر لیست با چیدمان کاملا اصلاح شده ===== */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        
        {/* بخش دکمه‌ها در سمت چپ */}
        <Stack direction="row" spacing={1.5} sx={{ direction: 'ltr', minWidth: 220, justifyContent: 'flex-start' }}>
          {!currentUser ? (
            <>
              {/* دکمه‌های ورود و ثبت‌نام برای کاربر مهمان */}
              <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
                ورود
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate("/register")}>
                ثبت‌نام
              </Button>
            </>
          ) : (
            <>
              {/* دکمه ایجاد کارگاه برای کاربر لاگین کرده */}
              <Button variant="contained" color="success" onClick={() => navigate("/create")}>
                ایجاد کارگاه جدید
              </Button>
            </>
          )}
        </Stack>
        
        {/* عنوان "لیست کارگاه‌ها" در مرکز */}
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center' }}>
          لیست کارگاه‌ها
        </Typography>

        {/* یک Box خالی در سمت راست برای حفظ تقارن و وسط‌چین ماندن عنوان */}
        {/* عرض آن باید با عرض بخش دکمه‌ها یکی باشد */}
        <Box sx={{ minWidth: 220 }} /> 
      </Box>

      {workshops.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            هیچ کارگاهی برای نمایش وجود ندارد.
          </Typography>
          {currentUser && (
            <Button variant="contained" color="success" onClick={() => navigate("/create")} sx={{ mt: 2 }}>
              ایجاد اولین کارگاه
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {workshops.map((workshop) => (
            // ===== حل مشکل ارتفاع: اضافه کردن display: 'flex' به Grid item =====
            <Grid item xs={12} sm={6} md={4} key={workshop.id} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column', // چیدمان ستونی برای کارت
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                  }
                }}
              >
                {/* CardActionArea باید تمام فضای باقی‌مانده را بگیرد */}
                <CardActionArea 
                    onClick={() => navigate(`/workshops/${workshop.id}`)} 
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={getImageUrl(workshop.cover_image) || 'https://via.placeholder.com/300x180.png?text=No+Image'}
                    alt={`کاور کارگاه ${workshop.name}`}
                  />
                  {/* ===== حل مشکل ارتفاع: اضافه کردن flexGrow: 1 به CardContent ===== */}
                  <CardContent sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h5" component="h2" color="primary.main" fontWeight="bold">
                      {workshop.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {workshop.description?.length > 120 ? `${workshop.description.substring(0, 120)}...` : workshop.description}
                    </Typography>

                    {/* این بخش به لطف flexGrow بالا، به پایین کارت هل داده می‌شود */}
                    <Stack spacing={1.5} mt="auto" pt={1}>
                      <Divider />
                      <Stack direction="row" alignItems="center" spacing={1} color="text.secondary" sx={{ pt: 1 }}>
                        <CategoryOutlinedIcon fontSize="small" />
                        <Typography variant="body2">
                          {/*  !!! مهم: 'product_type' را با نام فیلد واقعی خود جایگزین کنید */}
                          نوع محصول: {workshop.product_type || 'نامشخص'}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                        <TrendingUpOutlinedIcon fontSize="small" />
                        <Typography variant="body2">
                          {/*  !!! مهم: 'profit_percentage' را با نام فیلد واقعی خود جایگزین کنید */}
                          درصد سود: {workshop.profit_percentage ? `${workshop.profit_percentage}%` : 'نامشخص'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>

                {/* دکمه‌های ویرایش و حذف در پایین‌ترین قسمت کارت قرار می‌گیرند */}
                {currentUser?.username === workshop.owner?.username && (
                  <Box sx={{ p: 1.5, display: 'flex', gap: 1, backgroundColor: 'grey.50', borderTop: '1px solid #eee' }}>
                    <Button size="small" variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); navigate(`/edit/${workshop.id}`); }}>
                      ویرایش
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={(e) => handleDelete(workshop.id, e)}>
                      حذف
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
