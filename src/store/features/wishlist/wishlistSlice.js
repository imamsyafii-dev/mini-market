import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isHydrated: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishlist(state, action) {
      state.items = action.payload;
      state.isHydrated = true;
    },

    toggleWishlist(state, action) {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );

        return;
      }

      state.items.push(product);
    },

    removeFromWishlist(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  hydrateWishlist,
  toggleWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export const selectWishlistItems = (state) =>
  state.wishlist.items;

export const selectWishlistHydrated = (state) =>
  state.wishlist.isHydrated;

export const selectWishlistCount = (state) =>
  state.wishlist.items.length;

export const selectIsWishlisted = (state, productId) =>
  state.wishlist.items.some(
    (item) => item.id === productId
  );

export default wishlistSlice.reducer;