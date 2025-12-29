# Tích hợp Giao Hàng Nhanh (GHN)

## 🎯 Chức năng
- Tự động tạo đơn hàng trên GHN khi khách đặt hàng COD
- Nhận webhook từ GHN để tự động cập nhật trạng thái đơn hàng
- Đồng bộ trạng thái: delivered → completed, cancelled → cancelled, etc.

## 📋 Các file đã tạo/cập nhật

### Backend
1. **server/config/ghn.js** - Cấu hình GHN API
   - Token: 819c66e3-d8ca-11f0-913b-82522731f745
   - Shop ID: 6165531

2. **server/service/ghnService.js** - Service xử lý GHN
   - `createGHNOrder()` - Tạo đơn trên GHN
   - `updateOrderStatusFromGHN()` - Parse webhook data
   - `getGHNOrderInfo()` - Lấy thông tin đơn

3. **server/controller/orderController.js** - Cập nhật
   - Tích hợp tạo đơn GHN sau khi commit transaction
   - Thêm handler `ghnWebhook()` để nhận callback

4. **server/route/orderRoute.js** - Thêm route
   - POST `/api/order/ghn-webhook` - Webhook endpoint

### Frontend
5. **client/salesphone/app/cart/page.tsx** - Cập nhật
   - Gửi thêm provinceId, districtId, wardCode trong shippingAddress

### Database
6. **database/add_ghn_order_code.sql** - Migration
   - Thêm cột `ghn_order_code` vào bảng orders

## 🚀 Cách sử dụng

### 1. Chạy Migration Database
Mở phpMyAdmin và chạy file `database/add_ghn_order_code.sql`:
```sql
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS ghn_order_code VARCHAR(50) DEFAULT NULL AFTER shipping_fee,
ADD INDEX idx_ghn_order (ghn_order_code);
```

### 2. Cấu hình Webhook trên GHN
1. Đăng nhập vào https://5sao.ghn.dev/
2. Vào mục **Cài đặt** → **Webhook**
3. Thêm webhook URL: `http://your-domain.com/api/order/ghn-webhook`
4. Chọn các event cần nhận:
   - `ready_to_pick` - Chờ lấy hàng
   - `picked` - Đã lấy hàng
   - `delivering` - Đang giao
   - `delivered` - Đã giao (quan trọng!)
   - `cancel` - Đã hủy
   - `return` - Hoàn trả

### 3. Luồng hoạt động

#### Khi tạo đơn COD:
1. User điền thông tin → Bấm "Tiến hành đặt hàng"
2. Backend tạo đơn trong database
3. Backend gọi GHN API để tạo đơn vận chuyển
4. GHN trả về `order_code` (mã vận đơn)
5. Backend lưu `ghn_order_code` vào bảng orders
6. User nhận thông báo "Đặt hàng thành công. Đơn hàng đã được đồng bộ với GHN"

#### Khi GHN cập nhật trạng thái:
1. Shipper cập nhật trạng thái trên app GHN (VD: "Đã giao hàng")
2. GHN gửi webhook đến `/api/order/ghn-webhook`
3. Backend nhận webhook, parse trạng thái
4. Backend cập nhật `status` và `payment_status` trong database
5. Log ghi nhận: "Order DH123456 updated to status: completed"

### 4. Mapping trạng thái GHN → Database

| GHN Status | Order Status | Payment Status |
|-----------|--------------|----------------|
| ready_to_pick | confirmed | pending |
| picking | processing | pending |
| picked | shipping | pending |
| delivering | shipping | pending |
| **delivered** | **completed** | **paid** |
| cancel | cancelled | pending |
| return | cancelled | pending |
| delivery_fail | failed | pending |

## 🔧 Troubleshooting

### Lỗi tạo đơn GHN
- Kiểm tra Token và Shop ID trong `server/config/ghn.js`
- Xem console log: "GHN order created: GHxxx" (thành công)
- Nếu fail: "Failed to create GHN order: [message]"

### Webhook không nhận được
- Kiểm tra URL webhook trên GHN dashboard
- Server phải có public domain hoặc dùng ngrok
- Kiểm tra logs: "GHN Webhook received: {...}"

### Test webhook locally với ngrok:
```bash
ngrok http 5000
# Copy URL: https://abc123.ngrok.io
# Webhook URL: https://abc123.ngrok.io/api/order/ghn-webhook
```

## 📝 Notes
- Chỉ tạo đơn GHN cho phương thức COD
- Bank transfer không tạo đơn GHN (chờ thanh toán trước)
- Webhook không cần authentication (từ GHN server)
- Có thể thêm validation webhook signature nếu GHN cung cấp
