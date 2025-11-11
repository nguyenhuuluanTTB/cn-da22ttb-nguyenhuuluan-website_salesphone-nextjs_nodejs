import "./globals.css";
import Header from "./components/Header/Header";

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
      </body>
    </html>
  );
}
