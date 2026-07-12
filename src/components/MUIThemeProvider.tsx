"use client";

import { useTheme } from "@/components/ThemeProvider";
import { getMuiTheme } from "@/theme/mui-theme";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { useMemo } from "react";

export function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const muiTheme = useMemo(() => {
    return getMuiTheme(theme);
  }, [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
