import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
  });
}