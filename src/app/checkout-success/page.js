"use client";

import Link from "next/link";
import {
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  getLastOrderSnapshot,
  parseLastOrder,
} from "@/lib/orderStorage";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const subscribe = () => () => {};

export default function CheckoutSuccessPage() {
  const serializedOrder = useSyncExternalStore(
    subscribe,
    getLastOrderSnapshot,
    () => null
  );

  const order = useMemo(
    () => parseLastOrder(serializedOrder),
    [serializedOrder]
  );

  if (!order) {
    return (
      <section className="checkout-status">
        <p className="eyebrow">Pesanan</p>

        <h1>
          Konfirmasi pesanan tidak tersedia
        </h1>

        <p>
          Buat pesanan baru dari katalog untuk melihat
          konfirmasinya.
        </p>

        <Link href="/" className="primary-link">
          Kembali ke katalog
        </Link>
      </section>
    );
  }

  const paymentMethod =
    order.paymentMethod === "cod"
      ? "Bayar di tempat (COD)"
      : "Transfer bank";

  return (
    <section className="checkout-status">
      <p className="success-mark" aria-hidden="true">
        ✓
      </p>

      <p className="eyebrow">Pesanan berhasil</p>

      <h1>
        Terima kasih, {order.customerName}!
      </h1>

      <p>
        Pesanan dummy sudah dibuat. Tidak ada pembayaran
        nyata yang diproses.
      </p>

      <dl className="order-confirmation">
        <div>
          <dt>Nomor pesanan</dt>
          <dd>{order.orderNumber}</dd>
        </div>

        <div>
          <dt>Total barang</dt>
          <dd>{order.totalQuantity}</dd>
        </div>

        <div>
          <dt>Subtotal</dt>
          <dd>
            {usdFormatter.format(order.subtotal)}
          </dd>
        </div>

        <div>
          <dt>Pembayaran</dt>
          <dd>{paymentMethod}</dd>
        </div>
      </dl>

      <Link href="/" className="primary-link">
        Kembali belanja
      </Link>
    </section>
  );
}