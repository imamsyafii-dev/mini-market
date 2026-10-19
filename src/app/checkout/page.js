"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { saveLastOrder } from "@/lib/orderStorage";
import {
  clearCart,
  selectCartHydrated,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotalQuantity,
} from "@/store/features/cart/cartSlice";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const allowedPaymentMethods = new Set([
  "bank-transfer",
  "cod",
]);

function validateCheckout(values) {
  const errors = {};

  if (values.name.length < 3) {
    errors.name = "Nama minimal terdiri dari 3 karakter.";
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = "Masukkan alamat email yang valid.";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");

  if (phoneDigits.length < 9) {
    errors.phone =
      "Nomor telepon minimal terdiri dari 9 angka.";
  }

  if (values.address.length < 10) {
    errors.address =
      "Alamat minimal terdiri dari 10 karakter.";
  }

  if (
    !allowedPaymentMethods.has(values.paymentMethod)
  ) {
    errors.paymentMethod =
      "Pilih metode pembayaran.";
  }

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const isHydrated = useSelector(selectCartHydrated);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const totalQuantity = useSelector(
    selectCartTotalQuantity
  );

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const submitLockRef = useRef(false);
  const submitTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current !== null) {
        window.clearTimeout(
          submitTimeoutRef.current
        );

        submitTimeoutRef.current = null;
      }

      submitLockRef.current = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitLockRef.current) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      address: String(
        formData.get("address") ?? ""
      ).trim(),
      paymentMethod: String(
        formData.get("paymentMethod") ?? ""
      ),
    };

    const validationErrors =
      validateCheckout(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    submitLockRef.current = true;
    setErrors({});
    setIsSubmitting(true);

    await new Promise((resolve) => {
      submitTimeoutRef.current = window.setTimeout(
        () => {
          submitTimeoutRef.current = null;
          resolve();
        },
        800
      );
    });

    const order = {
      orderNumber:
        `MM-${Date.now().toString().slice(-8)}`,
      customerName: values.name,
      totalQuantity,
      subtotal,
      paymentMethod: values.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const wasSaved = saveLastOrder(order);

    if (!wasSaved) {
      submitLockRef.current = false;

      setErrors({
        form:
          "Browser tidak dapat menyimpan konfirmasi pesanan. Coba lagi.",
      });
      setIsSubmitting(false);
      return;
    }

    dispatch(clearCart());
    router.push("/checkout-success");
  }

  if (!isHydrated) {
    return (
      <section
        className="checkout-status"
        aria-live="polite"
      >
        <p>Memuat keranjang...</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="checkout-status">
        <p className="eyebrow">Checkout</p>
        <h1>Keranjang masih kosong</h1>

        <p>
          Tambahkan produk terlebih dahulu sebelum
          melanjutkan ke checkout.
        </p>

        <Link href="/" className="primary-link">
          Lihat produk
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <p className="eyebrow">Checkout</p>
        <h1>Selesaikan pesanan</h1>

        <p>
          Ini adalah simulasi. Tidak ada pembayaran nyata
          yang diproses.
        </p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2>Data pembeli</h2>
          {Object.keys(errors).length > 0 &&
          !errors.form && (
            <p
              className="form-error form-error-summary"
              role="alert"
            >
              Periksa kembali data checkout yang belum valid.
            </p>
          )}

          {errors.form && (
            <p
              className="form-error form-error-summary"
              role="alert"
            >
              {errors.form}
            </p>
          )}

          <div className="checkout-field">
            <label htmlFor="checkout-name">
              Nama lengkap
            </label>

            <input
              id="checkout-name"
              name="name"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name
                  ? "checkout-name-error"
                  : undefined
              }
            />

            {errors.name && (
              <p
                id="checkout-name-error"
                className="form-error"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className="checkout-field">
            <label htmlFor="checkout-email">
              Email
            </label>

            <input
              id="checkout-email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email
                  ? "checkout-email-error"
                  : undefined
              }
            />

            {errors.email && (
              <p
                id="checkout-email-error"
                className="form-error"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="checkout-field">
            <label htmlFor="checkout-phone">
              Nomor telepon
            </label>

            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone
                  ? "checkout-phone-error"
                  : undefined
              }
            />

            {errors.phone && (
              <p
                id="checkout-phone-error"
                className="form-error"
              >
                {errors.phone}
              </p>
            )}
          </div>

          <div className="checkout-field">
            <label htmlFor="checkout-address">
              Alamat
            </label>

            <textarea
              id="checkout-address"
              name="address"
              rows="4"
              autoComplete="street-address"
              aria-invalid={Boolean(errors.address)}
              aria-describedby={
                errors.address
                  ? "checkout-address-error"
                  : undefined
              }
            />

            {errors.address && (
              <p
                id="checkout-address-error"
                className="form-error"
              >
                {errors.address}
              </p>
            )}
          </div>

          <div className="checkout-field">
            <label htmlFor="checkout-payment">
              Metode pembayaran
            </label>

            <select
              id="checkout-payment"
              name="paymentMethod"
              defaultValue=""
              aria-invalid={Boolean(
                errors.paymentMethod
              )}
              aria-describedby={
                errors.paymentMethod
                  ? "checkout-payment-error"
                  : undefined
              }
            >
              <option value="" disabled>
                Pilih metode
              </option>

              <option value="bank-transfer">
                Transfer bank
              </option>

              <option value="cod">
                Bayar di tempat (COD)
              </option>
            </select>

            {errors.paymentMethod && (
              <p
                id="checkout-payment-error"
                className="form-error"
              >
                {errors.paymentMethod}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="place-order-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Memproses..."
              : "Buat pesanan"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Ringkasan pesanan</h2>

          <ul className="checkout-items">
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.title} × {item.quantity}
                </span>

                <strong>
                  {usdFormatter.format(
                    item.price * item.quantity
                  )}
                </strong>
              </li>
            ))}
          </ul>

          <div className="checkout-summary-row">
            <span>Total barang</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="checkout-summary-row total">
            <span>Subtotal</span>

            <strong>
              {usdFormatter.format(subtotal)}
            </strong>
          </div>

          <Link
            href="/cart"
            className="back-to-cart-link"
          >
            ← Kembali ke keranjang
          </Link>
        </aside>
      </div>
    </section>
  );
}