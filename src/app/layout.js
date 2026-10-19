import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import StoreProvider from "@/store/StoreProvider";

export const metadata = {
  title: {
    default: "MiniMarket",
    template: "%s | MiniMarket",
  },
  description: "Mini marketplace dengan React, Next.js, dan Redux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <StoreProvider>
          <Header />

          <main className="container page-content">
            {children}
          </main>

          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}