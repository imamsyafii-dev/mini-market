import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
}