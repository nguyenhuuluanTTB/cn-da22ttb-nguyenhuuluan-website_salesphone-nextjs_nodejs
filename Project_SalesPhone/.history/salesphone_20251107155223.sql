create database salesphoneDB

use salesphoneDB

CREATE TABLE user_account (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role ENUM('user','admin') DEFAULT 'user',
    enable BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


CREATE TABLE user_information (
    id_user_information INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    fullname VARCHAR(100) ,
    phonenumber VARCHAR(15),
    gender ENUM('Nam', 'Nữ', 'Khác') DEFAULT 'Khác',
    address VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES user_account(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


CREATE TABLE promotion (
    id_promotion INT AUTO_INCREMENT PRIMARY KEY,
    name_promotion VARCHAR(150) NOT NULL,
    type VARCHAR(100),
    start_at DATE,
    end_at DATE,
    condition_promotion TEXT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

  -- Bảng sản phẩm
CREATE TABLE product (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name_product VARCHAR(150) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    type VARCHAR(100),
    brand VARCHAR(100),
    quantity INT DEFAULT 0,
    status ENUM('Còn hàng', 'Hết hàng', 'Ngừng kinh doanh') DEFAULT 'Còn hàng',
    id_promotion INT DEFAULT NULL, -- liên kết tới bảng khuyến mãi
    FOREIGN KEY (id_promotion) REFERENCES promotion(id_promotion)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Bảng chi tiết sản phẩm
CREATE TABLE detail_product (
    id_detail_product INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT NOT NULL,
    color VARCHAR(50),
    rom VARCHAR(50),
    ram VARCHAR(50),
    screen_size DECIMAL(4,2),
    battery INT,
    chip VARCHAR(100),
    description_phone TEXT,
    warranty VARCHAR(50),
    front_camera VARCHAR(50),
    rear_camera VARCHAR(50),
    cpu_detail VARCHAR(50),
    operating_system VARCHAR(50),
    chip_nfc BOOLEAN,
    resolution VARCHAR(50),
    screen_frequency VARCHAR(50),
    FOREIGN KEY (id_product) REFERENCES product(id_product)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Bảng lưu ảnh cho sản phẩm
CREATE TABLE product_image (
    id_image INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_main BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_product) REFERENCES product(id_product)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Bảng chi tiết khuyến mãi
CREATE TABLE promotion_detail (
    id_promotion INT NOT NULL,
    id_product INT NOT NULL,
    percent DECIMAL(5,2),
    price_after DECIMAL(15,2),
    PRIMARY KEY (id_promotion, id_product),
    FOREIGN KEY (id_promotion) REFERENCES promotion(id_promotion)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;



delete from user_account WHERE name = 'huuluan';

drop TABLE promotion_detail;
drop TABLE detail_product;
ALTER TABLE user_account AUTO_INCREMENT = 1;

#Xóa cột name_promotion, condition_promotion trong bảng promotion
ALTER TABLE promotion DROP COLUMN name_promotion;
ALTER TABLE promotion DROP COLUMN condition_promotion;
ALTER TABLE promotion DROP COLUMN type;

ALTER TABLE promotion ADD COLUMN type_promotion VARCHAR(100);

#Thêm cột name_promotion, condition_promotion cho bảng promotion_detail
ALTER TABLE promotion_detail 
ADD COLUMN name_promotion VARCHAR(150) NOT NULL,
ADD COLUMN condition_promotion TEXT; 

ALTER TABLE product ADD COLUMN product_code VARCHAR(10) UNIQUE
#Thêm dữ liệu cho bảng để test chức năng lấy ra sản phẩm mới nhất

ALTER TABLE detail_product DROP COLUMN chip

ALTER TABLE detail_product ADD COLUMN video VARCHAR(255)

# sản phẩm 1
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0001', 'OPPO Find X9 12GB 256GB', 'Smartphone', 'OPPO', 22990000, 20, 'Còn hàng', NULL);

INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(1, 'Hồng', '256 GB', '12 GB', '6.59 inches', '7025mAh (Typ)', 
'OPPO Find X9 được trang bị chip Dimensity 9500 5G tối 
đa 4.21GHz cùng RAM 12GB mang đến hiệu năng mạnh mẽ, phục 
vụ nhu cầu đa nhiệm, chơi game và quay phim. Máy sở hữu màn 
hình AMOLED 6.59 inch, độ phân giải 1.5K (1256 x 2760), 
tần số quét 120Hz, hỗ trợ hiển thị hình ảnh sắc nét. 
Kèm theo đó là thiết kế viền siêu mỏng, tạo cho người 
dùng trải nghiệm thị giác đắm chìm.', '24 tháng', 
'32MP f/2.4', '50MP OIS (Chính) + 50MP OIS (Tele) + 
50MP (Góc rộng) + 2MP (Mono)', '8 nhân', 'ColorOS 16.0', 
true, 
'1256 x 2760 pixels', 
'120Hz', 
'https://youtu.be/FQ8OET3__2Y')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(1, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1762504760/OPPO_Find_X9_12GB_256GB_kt8b5k.png', true)

#sản phẩm 2
