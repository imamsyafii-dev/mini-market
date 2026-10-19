import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "MiniMarket",
  description: "Mini marketplace dengan React, Next.js, dan Redux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Header />

        <main className="container page-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}