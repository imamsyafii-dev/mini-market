"use client";

import {
  useEffect,
  useState,
} from "react";
import { Provider } from "react-redux";

import {
  loadCart,
  saveCart,
} from "./features/cart/cartStorage";
import { hydrateCart } from "./features/cart/cartSlice";
import {
  loadWishlist,
  saveWishlist,
} from "./features/wishlist/wishlistStorage";
import {
  hydrateWishlist,
} from "./features/wishlist/wishlistSlice";
import { makeStore } from "./store";

export default function StoreProvider({ children }) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    const persistedCartItems = loadCart();
    const persistedWishlistItems = loadWishlist();

    store.dispatch(
      hydrateCart(persistedCartItems)
    );

    store.dispatch(
      hydrateWishlist(persistedWishlistItems)
    );

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      saveCart(state.cart.items);
      saveWishlist(state.wishlist.items);
    });

    return unsubscribe;
  }, [store]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}