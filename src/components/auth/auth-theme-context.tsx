"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type AuthTheme = "dark" | "light";

interface AuthThemeContextType {
  theme: AuthTheme;
  toggleTheme: () => void;
  setTheme: (theme: AuthTheme) => void;
}

const AuthThemeContext = createContext<AuthThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function AuthThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AuthTheme>("dark");

  useEffect(() => {
    try {
      const stored = (localStorage.getItem("campusfix_auth_theme") ||
        localStorage.getItem("campusfix_landing_theme")) as AuthTheme | null;
      if (stored === "dark" || stored === "light") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(stored);
      }
    } catch (e) {
      console.warn("Could not read auth theme from localStorage", e);
    }
  }, []);

  const setTheme = (newTheme: AuthTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("campusfix_auth_theme", newTheme);
      localStorage.setItem("campusfix_landing_theme", newTheme);
    } catch (e) {
      console.warn("Could not write auth theme to localStorage", e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AuthThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div
        className={
          theme === "dark"
            ? "dark bg-[#030407] text-[#f1f0f7] antialiased selection:bg-[#C5EA32] selection:text-[#030407]"
            : "light bg-[#F4F5EB] text-[#1A1D15] antialiased selection:bg-[#1558C9] selection:text-white"
        }
        data-theme={theme}
        style={{
          minHeight: "100vh",
          transition: "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
        }}
      >
        {children}
      </div>
    </AuthThemeContext.Provider>
  );
}

export function useAuthTheme() {
  return useContext(AuthThemeContext);
}

