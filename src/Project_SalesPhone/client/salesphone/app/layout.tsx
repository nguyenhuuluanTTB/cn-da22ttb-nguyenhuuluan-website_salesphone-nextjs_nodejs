import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "./components/BootstrapClient";
import AuthProvider from "./components/AuthProvider/AuthProvider";

export const metadata = {
  title: "SalesPhone",
  description: "Website bán điện thoại",
};

import BackToTop from "./components/BackToTop/BackToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <BackToTop />
          <Footer />
          <BootstrapClient />
        </AuthProvider>
      </body>
    </html>
  );
}