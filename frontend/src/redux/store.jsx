import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./reducers/productReducer";

const store = configureStore({
  reducer: productsReducer,
});

export default store;
