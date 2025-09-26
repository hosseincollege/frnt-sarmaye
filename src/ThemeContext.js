import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeModeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (mode) => {
    let finalTheme = mode;

    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      finalTheme = prefersDark ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", finalTheme);
    localStorage.setItem("theme", mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
