-- Thêm cột shipping_fee vào bảng orders nếu chưa có
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS shipping_fee DECIMAL(10,2) DEFAULT 0.00 AFTER total_amount;
