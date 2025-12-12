import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "./components/BootstrapClient";

export const metadata = {
  title: "SalesPhone",
  description: "Website bán điện thoại",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        {children}
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
}