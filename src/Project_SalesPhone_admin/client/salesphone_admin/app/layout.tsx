import "./globals.css";
import Header from "./components/header/header";


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
        
      </body>
    </html>
  );
}