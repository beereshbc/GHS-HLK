import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GeminiContextProvider from "./context/GeminiContext.jsx";
import { AppProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GeminiContextProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </GeminiContextProvider>
  </BrowserRouter>
);
