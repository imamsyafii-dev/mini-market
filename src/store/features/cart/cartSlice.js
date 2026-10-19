import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state, action) {
      state.items = action.payload;
    },

    addItem(state, action) {
      const product = action.payload;

      if (product.stock <= 0) {
        return;
      }

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
        }

        return;
      }

      state.items.push({
        ...product,
        quantity: 1,
      });
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  hydrateCart,
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) =>
  state.cart.items;

export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;