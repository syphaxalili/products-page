import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductsContextProvider } from "./contexts/ProductsContext.jsx";

createRoot(document.getElementById("root")).render(
  <ProductsContextProvider>
    <App />
  </ProductsContextProvider>
);
