// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./AuthContext";
import ThemeModeProvider from "./ThemeContext";

// --- این ۳ خط را اضافه کنید ---
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // تمی که خودتان ساختید را وارد کنید

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* ThemeProvider را اینجا اضافه کنید و کل برنامه را داخل آن بگذارید */}
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* این خط استایل‌ها را در مرورگرهای مختلف یکسان می‌کند */}
      <ThemeModeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
