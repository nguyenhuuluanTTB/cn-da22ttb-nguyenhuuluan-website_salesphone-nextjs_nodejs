# Đồ Án Chuyên Ngành - Website Bán Điện Thoại (SalesPhone)

Chào mừng đến với dự án **SalesPhone**, một ứng dụng web thương mại điện tử chuyên kinh doanh điện thoại di động. Dự án này bao gồm đầy đủ các tính năng từ quản lý sản phẩm, giỏ hàng, đặt hàng trực tuyến, thanh toán, đến tích hợp vận chuyển và thông báo qua email.

## 🚀 Công Nghệ Sử Dụng

Dự án được xây dựng theo mô hình Client-Server (Frontend & Backend tách biệt):

### 1. Frontend (Client)
- **Framework**: [Next.js](https://nextjs.org/) (React Framework)
- **Ngôn ngữ**: TypeScript
- **Styling**: SCSS, Bootstrap, TailwindCSS
- **Icon**: React Icons

### 2. Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: MySQL
- **ORM**: [Sequelize](https://sequelize.org/)
- **Authentication**: JWT, Google OAuth

### 3. Tích Hợp (Integration)
- **Giao Hàng Nhanh (GHN)**: Tính phí ship và tạo đơn vận chuyển tự động.
- **Email**: Nodemailer (Gửi mail xác nhận, thông báo).
- **Google Generative AI**: (Nếu có sử dụng trong các tính năng gợi ý/chatbot).

---

## 🛠️ Yêu Cầu Hệ Thống

Trước khi cài đặt, hãy đảm bảo máy của bạn đã cài đặt:
- **Node.js**: Phiên bản 18.x trở lên
- **MySQL Server**: (Khuyến nghị dùng XAMPP hoặc cài riêng MySQL Workbench)
- **Git**: Để quản lý mã nguồn

---

## 📦 Hướng Dẫn Cài Đặt

### Bước 1: Chuẩn Bị Database
1. Mở công cụ quản lý MySQL (phpMyAdmin hoặc Workbench).
2. Tạo một database mới tên là `salesphone` (hoặc tên tùy chọn).
3. Import file `src/Project_SalesPhone/database/salesphone.sql` vào database vừa tạo.
4. **Quan trọng**: Nếu cần tính năng GHN, hãy chạy thêm script trong file `database/add_ghn_order_code.sql` để cập nhật bảng `orders`.

### Bước 2: Cài Đặt Backend (Server)
1. Mở terminal và di chuyển vào thư mục server:
   ```bash
   cd src/Project_SalesPhone/server
   ```
2. Cài đặt các thư viện dependencies:
   ```bash
   npm install
   ```
3. Cấu hình môi trường:
   - Tạo file `.env` trong thư mục `server` (copy từ `.env.example` nếu có).
   - Cập nhật các thông tin kết nối Database, JWT Secret, Mail Server, GHN Token, v.v.
   
   *Ví dụ file .env cơ bản:*
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=salesphone
   JWT_SECRET=your_jwt_secret
   # ... các cấu hình khác
   ```
4. Khởi chạy server:
   ```bash
   npm start
   # Hoặc chạy với nodemon để dev
   npm run dev
   ```
   Server sẽ chạy tại `http://localhost:5000`.

### Bước 3: Cài Đặt Frontend (Client)
1. Mở một terminal mới và di chuyển vào thư mục client:
   ```bash
   cd src/Project_SalesPhone/client/salesphone
   ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Khởi chạy ứng dụng:
   ```bash
   npm run dev
   ```
   Frontend sẽ chạy tại `http://localhost:3000`.

---

## 🚚 Tích Hợp Giao Hàng (GHN) & Webhook

Dự án đã tích hợp sẵn API Giao Hàng Nhanh. Để tính năng này hoạt động (nhận trạng thái đơn hàng từ GHN):

1. **Cấu hình Webhook**: Bạn cần public server ra internet hoặc dùng `ngrok` để GHN có thể gọi về localhost.
2. **Chi tiết cấu hình**: Xem hướng dẫn chi tiết tại file [GHN_INTEGRATION.md](./GHN_INTEGRATION.md) và [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md).

---

## ✨ Tính Năng Chính

- **Người dùng**:
  - Đăng ký / Đăng nhập (Local & Google).
  - Tìm kiếm, lọc sản phẩm (Theo giá, thương hiệu, specs...).
  - Xem chi tiết sản phẩm, đánh giá.
  - Thêm vào giỏ hàng, đặt hàng (COD).
  - Quản lý đơn hàng cá nhân.
  
- **Quản trị viên (Admin)**:
  - Quản lý sản phẩm (Thêm/Sửa/Xóa).
  - Quản lý đơn hàng (Xác nhận, Huỷ, Cập nhật trạng thái).
  - Đồng bộ đơn hàng sang GHN.

---

## 📞 Liên Hệ

Nếu gặp vấn đề trong quá trình cài đặt, vui lòng kiểm tra lại file log hoặc liên hệ với team phát triển.

Make with ❤️ by **Nguyen Huu Luan Team**
