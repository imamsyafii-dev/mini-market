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
import { makeStore } from "./store";

export default function StoreProvider({ children }) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    const persistedItems = loadCart();

    const unsubscribe = store.subscribe(() => {
      const items = store.getState().cart.items;
      saveCart(items);
    });

    store.dispatch(hydrateCart(persistedItems));

    return unsubscribe;
  }, [store]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}