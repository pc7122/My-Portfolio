import { createTheme, ThemeOptions } from "@mui/material/styles";

export const getMuiThemeOptions = (mode: "light" | "dark"): ThemeOptions => {
  const isDark = mode === "dark";
  return {
    palette: {
      mode,
      primary: {
        main: isDark ? "#6366f1" : "#3b3fcc", // HSL 244 75% 60% vs 244 70% 48%
        contrastText: "#ffffff",
      },
      secondary: {
        main: isDark ? "#1e2135" : "#cfd2e3", // HSL 235 30% 16% vs 235 25% 82%
      },
      background: {
        default: isDark ? "#05050a" : "#f9f9fb", // HSL 240 47% 4% vs 230 40% 98%
        paper: isDark ? "#0b0c15" : "#ffffff", // HSL 235 40% 7% vs 0 0% 100%
      },
      text: {
        primary: isDark ? "#f1f1f6" : "#0b0c14", // HSL 230 30% 96% vs 240 47% 8%
        secondary: isDark ? "#9fa2b4" : "#43475d", // HSL 230 15% 65% vs 235 18% 32%
      },
      divider: isDark ? "#1e2135" : "#cfd2e3",
    },
    typography: {
      fontFamily: "Manrope, system-ui, sans-serif",
      h1: { fontFamily: "Sora, system-ui, sans-serif", fontWeight: 700 },
      h2: { fontFamily: "Sora, system-ui, sans-serif", fontWeight: 700 },
      h3: { fontFamily: "Sora, system-ui, sans-serif", fontWeight: 700 },
      h4: { fontFamily: "Sora, system-ui, sans-serif", fontWeight: 700 },
      h5: { fontFamily: "Sora, system-ui, sans-serif", fontWeight: 700 },
      h6: { fontFamily: "Sora, system-ui, sans-serif", fontWeight: 700 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "0.75rem",
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "1rem",
            backgroundImage: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  };
};

export const getMuiTheme = (mode: "light" | "dark") => {
  return createTheme(getMuiThemeOptions(mode));
};
