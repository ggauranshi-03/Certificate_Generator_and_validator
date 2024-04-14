import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material";

export default function ThemeProvider({ children }) {
  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#000",
        contrastText: "#45474B",
      },
      background: {
        default: "#000",
        paper: "#45474B",
      },
      text: {
        primary: "#000",
        secondary: "#000",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
