import "./styles.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Store } from "./context/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Store>
      <App />
    </Store>
  </StrictMode>
);
