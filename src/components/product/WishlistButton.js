"use client";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import useClientReady from "@/hooks/useClientReady";
import {
  selectIsWishlisted,
  selectWishlistHydrated,
  toggleWishlist,
} from "@/store/features/wishlist/wishlistSlice";

export default function WishlistButton({ product }) {
  const dispatch = useDispatch();
  const isClientReady = useClientReady();

  const isHydrated = useSelector(
    selectWishlistHydrated
  );

  const isWishlisted = useSelector((state) =>
    selectIsWishlisted(state, product.id)
  );

  const isReady =
    isClientReady && isHydrated;

  const isActive =
    isReady && isWishlisted;

  function handleToggleWishlist() {
    dispatch(toggleWishlist(product));
  }

  return (
    <button
      type="button"
      className={`wishlist-button ${
        isActive ? "active" : ""
      }`}
      onClick={handleToggleWishlist}
      disabled={!isReady}
      aria-pressed={isActive}
    >
      {!isReady
        ? "Memuat favorit..."
        : isActive
          ? "♥ Hapus dari favorit"
          : "♡ Tambah ke favorit"}
    </button>
  );
}