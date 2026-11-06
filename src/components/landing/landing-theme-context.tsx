"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type LandingTheme = "dark" | "light";

interface LandingThemeContextType {
  theme: LandingTheme;
  toggleTheme: () => void;
  setTheme: (theme: LandingTheme) => void;
}

const LandingThemeContext = createContext<LandingThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function LandingThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<LandingTheme>("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("campusfix_landing_theme") as LandingTheme | null;
      if (stored === "dark" || stored === "light") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(stored);
      }
    } catch (e) {
      console.warn("Could not read theme from localStorage", e);
    }
  }, []);

  const setTheme = (newTheme: LandingTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("campusfix_landing_theme", newTheme);
    } catch (e) {
      console.warn("Could not write theme to localStorage", e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <LandingThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div
        className={
          theme === "dark"
            ? "dark bg-[#030407] text-[#f1f0f7] antialiased selection:bg-[#C5EA32] selection:text-[#030407]"
            : "light bg-[#F9F9FC] text-[#1A1D15] antialiased selection:bg-[#1558C9] selection:text-white"
        }
        data-theme={theme}
        style={{
          minHeight: "100vh",
          transition: "background-color 0.25s ease, color 0.25s ease",
        }}
      >
        {children}
      </div>
    </LandingThemeContext.Provider>
  );
}

export function useLandingTheme() {
  return useContext(LandingThemeContext);
}

