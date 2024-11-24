import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const ProductsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };

    case "UPDATE_PRODUCT":
      return {
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    case "DELETE_PRODUCT":
      return {
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, {
    products: [],
  });

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
