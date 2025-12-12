
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


import 'bootstrap/dist/css/bootstrap.min.css';



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
        {/* Thêm Header ở đây */}
        <Header />
        
        {/* Nội dung trang */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
