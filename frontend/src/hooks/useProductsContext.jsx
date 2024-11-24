import { ProductsContext } from "../contexts/ProductsContext";
import { useContext } from "react";

const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProductsContext must be used inside a ProductsContextProvider"
    );
  }

  return context;
};

export default useProductsContext;
