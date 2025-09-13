import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Typography,
  Box,
  Button,
  Container,
  CircularProgress,
  Grid,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AuthContext } from "../AuthContext";

// آیکون‌ها
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InfoIcon from '@mui/icons-material/Info';

// ================== این کد را اینجا اضافه کنید ==================
    const ImageModal = ({ imageUrl, onClose }) => {
      if (!imageUrl) return null; // اگر عکسی نبود، پنجره را نشان نده

      return (
        // این یک لایه تیره تمام‌صفحه است
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1301,
            cursor: 'pointer'
          }}
          onClick={onClose} // با کلیک روی این لایه تیره، پنجره بسته می‌شود
        >
          {/* این هم خود عکس بزرگ است */}
          <img
            src={imageUrl} alt="بزرگنمایی"
            style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '8px' }}
            onClick={(e) => e.stopPropagation()} // این خط باعث می‌شود با کلیک روی خود عکس، پنجره بسته نشود
          />
        </div>
      );
    };
    // ===============================================================

export default function WorkshopDetail() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // --- مدیریت مودال ---
  const [modalImage, setModalImage] = useState(null);
  const openModal = (imageUrl) => { setModalImage(imageUrl); };
  const closeModal = () => { setModalImage(null); };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/workshops/${id}/`)
      .then((res) => {
        console.log("📥 جزئیات کارگاه:", res.data); // این لاگ خیلی مهمه
        setWorkshop(res.data);
      })
      .catch((err) => {
        console.error("❌ خطا در گرفتن جزئیات:", err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  
  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/400x250.png?text=No+Image';
    return path.startsWith("http") ? path : `${process.env.REACT_APP_API_URL}${path}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2, direction: "rtl" }}>در حال بارگذاری جزئیات...</Typography>
      </Box>
    );
  }

  if (!workshop) {
    return (
      <Container sx={{ textAlign: 'center', py: 5, direction: 'rtl' }}>
        <Typography variant="h5" color="error">کارگاه مورد نظر یافت نشد.</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          بازگشت به لیست
        </Button>
      </Container>
    );
  }

// فایل WorkshopDetail.js

// ... تمام کدهای قبل از return ...

  return (
    <> {/* <<<<<<<<<<<<<<<<<<<< 1. این را اضافه کنید */}

      {/* ================================================================ */}
      {/* تمام کدی که فرستادید، بدون هیچ تغییری، اینجا قرار می‌گیرد */}
      {/* ================================================================ */}
      <Container maxWidth="lg" sx={{ py: 4, direction: "rtl" }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {workshop.name}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              بازگشت
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={4}>
            {/* ستون راست: تصاویر */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={getImageUrl(workshop.cover_image)}
                alt={`کاور ${workshop.name}`}
                sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 2, boxShadow: 3 }}
              />
              {/* این بخش حیاتی برای نمایش تصاویر گالری است */}
              {workshop.images && workshop.images.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom>گالری تصاویر</Typography>
                  <Grid container spacing={1}>
                    {workshop.images.map((img) => (
                      <Grid item xs={4} sm={3} key={img.id}>
                        <Box
                          component="img"
                          src={getImageUrl(img.image)}
                          alt="تصویر اضافی"
                          sx={{
                            width: '100%',
                            height: '70px',
                            objectFit: 'cover',
                            borderRadius: 1.5,
                            cursor: 'pointer',
                            transition: 'transform .2s',
                            '&:hover': { transform: 'scale(1.1)', boxShadow: 2 }
                          }}
                          onClick={() => openModal(getImageUrl(img.image))}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
            
            {/* ستون چپ: اطلاعات */}
            <Grid item xs={12} md={7}>
              <Typography variant="body1" paragraph color="text.secondary">
                {workshop.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon><BusinessIcon /></ListItemIcon>
                  <ListItemText primary="نمایندگی" secondary={workshop.representative || 'ثبت نشده'} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PhoneIcon /></ListItemIcon>
                  <ListItemText primary="شماره تماس" secondary={workshop.phone || 'ثبت نشده'} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><LocationOnIcon /></ListItemIcon>
                  <ListItemText primary="مکان" secondary={workshop.location || 'ثبت نشده'} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CategoryIcon /></ListItemIcon>
                  <ListItemText primary="نوع محصول" secondary={
                    <Chip label={workshop.product_type || 'نامشخص'} size="small" />
                  } />
                </ListItem>
                <ListItem>
                  <ListItemIcon><MonetizationOnIcon color="success" /></ListItemIcon>
                  <ListItemText primary="سرمایه لازم" secondary={`${Number(workshop.investment_needed).toLocaleString()} تومان`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><EventNoteIcon /></ListItemIcon>
                  <ListItemText primary="مدت قرارداد" secondary={`${workshop.duration_months} ماه`} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip label={`پوشش سرمایه: ${workshop.funded_percentage}%`} color="warning" />
                <Chip label={`سود شما: ${workshop.profit_percentage}%`} color="info" />
              </Box>
              {workshop.contract_details && (
                  <Box mt={3}>
                      <Typography variant="h6"><InfoIcon sx={{verticalAlign: 'middle', mr: 1}}/>جزئیات قرارداد</Typography>
                      <Typography variant="body2" color="text.secondary">{workshop.contract_details}</Typography>
                  </Box>
              )}

              {currentUser?.username === workshop.owner?.username && (
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/edit/${workshop.id}`)}>
                    ویرایش کارگاه
                  </Button>
                  <Button variant="outlined" color="error">
                    حذف کارگاه
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      {/* =================== پایان کد شما ================== */}

      {/* <<<<<<<<<< 3. این خط را برای نمایش "پنجره" بزرگنمایی اضافه کنید >>>>>>>> */}
      <ImageModal imageUrl={modalImage} onClose={closeModal} />
      
    </> // <<<<<<<<<<<<<<<<<<<< 2. این را هم اضافه کنید
  );
}
