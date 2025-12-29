-- Thêm cột ghn_order_code vào bảng orders để lưu mã vận đơn Giao Hàng Nhanh
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS ghn_order_code VARCHAR(50) DEFAULT NULL AFTER shipping_fee,
ADD INDEX idx_ghn_order (ghn_order_code);
