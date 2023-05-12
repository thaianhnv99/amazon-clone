import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utils/theme";
import Router from "./_router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
