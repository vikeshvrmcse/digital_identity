import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const themecolor = createTheme({
  palette: {
    primary: { main: "#113946" },
    secondary: { main: "#FFF2D8" },
    accent: { main: "#BCA37F" },
    text: { primary: "#113946" },
    background: { default: "#FFF2D8" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider theme={themecolor}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
