-- Thêm cột receiver_name và receiver_phone vào bảng orders
ALTER TABLE orders 
ADD COLUMN receiver_name VARCHAR(100) AFTER id_user,
ADD COLUMN receiver_phone VARCHAR(20) AFTER receiver_name,
ADD COLUMN shipping_fee DECIMAL(10, 2) DEFAULT 0 AFTER total_amount,
ADD COLUMN shipping_address TEXT AFTER shipping_fee;

-- Cập nhật comment cho các cột mới
ALTER TABLE orders 
MODIFY COLUMN receiver_name VARCHAR(100) COMMENT 'Tên người nhận',
MODIFY COLUMN receiver_phone VARCHAR(20) COMMENT 'Số điện thoại người nhận',
MODIFY COLUMN shipping_fee DECIMAL(10, 2) DEFAULT 0 COMMENT 'Phí vận chuyển',
MODIFY COLUMN shipping_address TEXT COMMENT 'Địa chỉ giao hàng (JSON)';
