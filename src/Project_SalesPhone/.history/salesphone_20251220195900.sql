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


--Tạo bảng cart và cart_product (quan hệ nhiều nhiều)
CREATE TABLE cart (
    id_cart INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cart_user
        FOREIGN KEY (id_user) REFERENCES user_account(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cart_product (
    id_cart INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,

    PRIMARY KEY (id_cart, id_product),

    CONSTRAINT fk_cp_cart
        FOREIGN KEY (id_cart) REFERENCES cart(id_cart)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_cp_product
        FOREIGN KEY (id_product) REFERENCES product(id_product)
        ON DELETE CASCADE ON UPDATE CASCADE
);


--Tạo bảng order


--Tạo bảng product_item


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
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0002', 'Điện thoại iPhone 16 Pro Max 256GB', 'Smartphone', 'APPLE', 27280000, 15, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(2, 'Titan Sa Mạc', '256 GB', '8 GB', '6.9 inches', '4.676 mAh', 
'Camera Ultra Wide 48MP ghi lại chi tiết sắc nét,
trong khi camera Telephoto 5x chụp xa ấn tượng.Video 4K Dolby Vision ở 120 fps cùng micrô chất
lượng studio biến iPhone thành một studio chuyên
nghiệp trong túi bạn.Ngoài ra, chip A18 Pro mang lại hiệu suất vượt trội
cho cả việc chup ảnh và chơi game.', '24 tháng', 
'12MP, ƒ/1.9, Tự động lấy nét theo pha Focus Pixels', '48MP, f/1.78, 24mm, 2µm, chống rung quang học', 
'CPU 6 lõi mới', 'iOS 18', 
true, 
'2868 x 1320 pixels', 
'120Hz', 
'https://youtu.be/70gCxCTpvBg')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(2, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763144877/%C4%90i%E1%BB%87n_tho%E1%BA%A1i_iPhone_16_Pro_Max_256GB_umqxsb.png', true)

#Sản phẩm 3
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0003', 'iPhone 15 128GB_Chính hãng VN_A', 'Smartphone', 'APPLE', 19990000, 16, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(3, 'Hồng', '128 GB', '6 GB', '6.1 inches', '3349 mAh', 
'iPhone 15 có Dynamic Island hiển thị linh hoạt các
cảnh báo và hoạt động trực tiếp, giúp bạn không
bỏ lỡ thông tin quan trọng.Thiết kế bằng kính pha màu và nhôm bền bi, cùng
khả năng chống nước và bụi,', '24 tháng', 
'12MP, ƒ/1.9', 'Chính 48 MP & Phụ 12 MP', 
'Apple A16 Bionic 6 nhân', 'iOS 17', 
true, 
'2556 x 1179 pixels', 
'60Hz', 
'https://youtu.be/Gg_ncsRWboo')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(3, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763198723/iPhone_15_128GB_Ch%C3%ADnh_h%C3%A3ng_VN_A_jb1b7u.png', true)


#Sản phẩm 4
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0004', 'iPhone 17 256GB_Chính hãng', 'Smartphone', 'APPLE', 24990000, 10, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(4, 'Tím Oải Hương', '256 GB', '8 GB', '6.3 inches', '3692 mAh', 
'Apple iPhone 17 thường nổi bật với thiết kế viền mỏng tinh tế, 
mặt trước Ceramic Shield 2 và màn hình Super Retina XDR 6.3 inch hỗ trợ ProMotion 120Hz. Hỗ trợ Apple Intelligence', '20 tháng', 
'18MP Center Stage, f/1.9, PDAF', '48MP Fusion Main f/1.6 OIS', 
'Apple A19', 'iOS 26', 
true, 
'2622 x 1206 pixels', 
'120Hz', 
'https://youtu.be/nK9Qivs4f3s')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(4, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763199295/iPhone_17_256GB_Ch%C3%ADnh_h%C3%A3ng_zkjigx.png', true)

#Sản phẩm 5
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0005', 'iPhone 17 Pro Max 256GB', 'Smartphone', 'APPLE', 37990000, 20, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(5, 'Cam Vũ Trụ', '256 GB', '12 GB', '6.9 inches', '5088 mAh', 
'Thiết kế iPhone 17 Pro Max nguyên khối nhôm rèn
nhiệt mang đến sức mạnh vượt trội và dung lượng
pin lớn hơn bao giờ hết. Ceramic Shield bền chắc bao ve mặt truớc và sau
chống nứt gấp 4 lần và chống trầy xước gấp 3 lần', '12 tháng', 
'Camera 18MP Center Stage, ƒ/1.9', '48MP khẩu độ ƒ/1.6', 
'Chip A19 Pro', 'iOS 26', 
true, 
'2868 x 1320 pixels', 
'120Hz', 
'https://youtu.be/3s49ddWEluo')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(5, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763199702/iPhone_17_Pro_Max_256GB_hlpj5x.png', true)

#Sản phẩm 6
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0006', 'iPhone Air 256GB_Chính hãng', 'Smartphone', 'APPLE', 31990000, 20, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(6, 'Xanh Da Trời', '256 GB', '12 GB', '6.5 inches', '3149 mAh', 
'Siêu mỏng nhẹ mạnh mẽ iPhone Air mỏng nhất
từng có chỉ 5,6 mm nhưng vẫn sở hữu sức mạnh
chip pro', '12 tháng', 
'18MP Center Stage f/1.6', '48MP Fusion Main f/1.6', 
'Chip A19 Pro', 'iOS 26', 
true, 
'2736 x 1260 pixels', 
'120Hz', 
'https://youtu.be/dRZjUOutObI')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(6, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763200113/iPhone_Air_256GB_Ch%C3%ADnh_h%C3%A3ng_ae8jwd.png', true)

#Sản phẩm 7
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0007', 'Samsung Galaxy S25 Ultra 12GB 256GB', 'Smartphone', 'SAMSUNG', 33380000, 15, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(7, 'Xám', '256 GB', '12 GB', '6.9 inches', '5000 mAh', 
'Samsung Galaxy S25 Ultra mạnh mẽ với chip Snapdragon 8 Elite For Galaxy mới nhất, 
RAM 12GB và bộ nhớ trong 256GB-1TB. Hệ thống 3 camera sau chất lượng gồm camera chính 200MP, 
camera tele 50MP và camera góc siêu rộng 50MP.', '12 tháng', 
'12 MP', 'Camera siêu rộng 50MP, góc rộng 200MP', 
'Snapdragon 8 Elite dành cho Galaxy (3nm)', 'Android 15', 
true, 
'3120 x 1440 pixels', 
'120Hz', 
'https://youtu.be/AaXXgn5xNeY')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(7, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763200417/Samsung_Galaxy_S25_Ultra_12GB_256GB_bjqqdg.png', true)

#Sản phẩm 8
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0008', 'Samsung Galaxy Z Flip7 12GB 256GB', 'Smartphone', 'SAMSUNG', 28990000, 5, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(8, 'Đỏ san hô', '256 GB', '12 GB', '6.9 inches', '4300 mAh', 
'Samsung Galaxy Z Flip 7 là mẫu điện thoại gập dọc mỏng mới của Samsung. Giá tốt, ưu đãi đến 12 triệu đồng. Với màn hình chính 6.9 inch FHD+, 
phụ 4.1 inch super AMOLED, tần số quét 120Hz, vi xử lý Exynos 2500 tiết kiệm điện, camera, dung lượng 4300 mAh - nhanh 25W - sạc không dây 2.0.', '12 tháng', 
'10MP, F2.2', '50 MP, F1.8 + 12 MP, F2.2', 
'10 nhân, 3.3 GHz, 2.74GHz, 2.36GHz, 1.8GHz', 'Android 15', 
true, 
'2520 x 1080 pixels', 
'120Hz', 
'https://youtu.be/JEQaDne_E94')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(8, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763200766/Samsung_Galaxy_Z_Flip7_12GB_256GB_ci8hse.png', true)

#Sản phẩm 9
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0009', 'Xiaomi 15T 5G 12GB 512GB', 'Smartphone', 'XIAOMI', 14990000, 7, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(9, 'Vàng hồng', '512 GB', '12 GB', '6.83 inches', '5500 mAh', 
'Xiaomi 15T 5G chính thức ra mắt tại thị trường Việt Nam, Với nhiều thay đổi tích cực về hiệu năng, màn hình, thời lượng pin. 
Đặt biệt là khả năng chụp ảnh, mang đến nhiều chế độ chụp và quay phim chuyên nghiệp.', '12 tháng', 
'32MP, f/2.2, tiêu cự 21mm', '50MP (23mm, f/1.7, OIS, Light Fusion 800)', 
'MediaTek Dimensity 8400-Ultra', 'Xiaomi HyperOS 2, tích hợp Xiaomi HyperAI & Google Gemini', 
true, 
'1280 x 2772 pixels', 
'120Hz', 
'https://youtu.be/sNA57YwgKJw')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(9, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763203759/Xiaomi_15T_5G_12GB_512GB_jgpauq.png', true)

#Sản phẩm 10
INSERT INTO product 
(product_code, name_product, type, brand, price, quantity, status, id_promotion)
VALUES
('P0010', 'Xiaomi 15T Pro 5G 12GB 512GB', 'Smartphone', 'XIAOMI', 19490000, 6, 'Còn hàng', NULL);


INSERT INTO detail_product 
(id_product, color, rom, ram, screen_size, battery, description_phone, warranty, front_camera, rear_camera, cpu_detail, operating_system, chip_nfc, resolution, screen_frequency, video)
VALUES
(10, 'Xám', '512 GB', '12 GB', '6.83 inches', '5500 mAh', 
'Xiaomi 15T Pro ra mắt với nhiều nâng cấp vượt trội về hiệu năng, thời lượng pin và camera. 
Bên cạnh đó, nhiều tính năng AI cũng được chú trọng tích hợp, mang đến người dùng nhiều trải nghiệm mới mẻ hơn.', '12 tháng', 
'32MP, f/2.2, tiêu cự 21mm', '50MP, f/1.62, OIS, cảm biến Light Fusion 900', 
'MediaTek Dimensity 9400+', 'Xiaomi HyperOS 2', 
true, 
'1280 x 2772 pixels', 
'120Hz', 
'https://youtu.be/sNA57YwgKJw')

INSERT INTO product_image 
(id_product, image_url, is_main) VALUES
(10, 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763204007/Xiaomi_15T_Pro_5G_12GB_512GB_wdlkhz.png', true)


 
alter table promotion_detail add column describe_promotion TEXT

#Insert dữ liệu cho promotion
/*
  start_at:1/11/2025
  end_at:1/12/2025

  id_promotion:1
  percent: 20
  name_promotion: Ưu đãi Đầu Mùa (New Season Offer)
  describe_promotion: "Khởi động phong cách mới với Ưu đãi Đầu Mùa! Sở hữu ngay các sản phẩm mới nhất, hot nhất với mức giảm 20% đặc biệt. 
  Đừng bỏ lỡ cơ hội sở hữu những điện thoại tuyệt vời của bạn ngay hôm nay!"



  percent	name_promotion	Mô tả Chương trình (Dùng để quảng bá)
20%	Ưu đãi Đầu Mùa (New Season Offer)	"Khởi động phong cách mới với Ưu đãi Đầu Mùa! Sở hữu ngay các sản phẩm mới nhất, hot nhất trong bộ sưu tập [Tên Bộ sưu tập] với mức giảm 20% đặc biệt. Đừng bỏ lỡ cơ hội làm mới tủ đồ của bạn ngay hôm nay!"

30%	Giảm giá Giữa Kỳ (Mid-Season Sale)	"Bùng nổ mua sắm với Giảm giá Giữa Kỳ lên đến 30%! Đây là cơ hội vàng để bạn sở hữu những mặt hàng đang được yêu thích mà không cần chờ đợi cuối mùa. Số lượng có hạn, nhanh tay chọn ngay!"

40%	Khuyến mãi Đặc biệt trong Tuần (Weekly Special Deal)	"Đón tuần mới, nhận ngay ưu đãi siêu HOT! Duy nhất trong [Ngày] đến [Ngày] tuần này, các sản phẩm [Tên nhóm sản phẩm] sẽ được giảm sâu 40%. Cơ hội có một không hai, chớp lấy deal khủng!"

50%	Bán Hạ Giá (Half-Price Sale)	"Cơ hội Vàng: Giảm Nửa Giá – 50% Toàn Bộ Sản phẩm Thanh lý! Mọi mặt hàng trong danh mục này được bán với mức giá không tưởng: chỉ bằng một nửa. Áp dụng cho đến khi hết hàng, mua sắm thả ga không cần nhìn giá!"

60%	Siêu Giảm giá Cuối Năm (Year-End Super Sale)	"SIÊU SALE LỚN NHẤT NĂM: Giảm SỐC lên đến 60%! Hãy tận dụng sự kiện Siêu Giảm giá Cuối Năm để mua sắm tri ân, sắm Tết hoặc tích trữ các mặt hàng yêu thích. Duy nhất [Số] ngày, đừng để lỡ cơ hội!"

35%	Giáng Sinh An Lành (Merry Christmas Sale)	SEASONAL_DISCOUNT	"Giáng Sinh An Lành - Ưu Đãi Giảm Sâu 35%! Tận hưởng mùa lễ hội với các sản phẩm ấm áp, quà tặng ý nghĩa dành cho người thân và bạn bè. Toàn bộ danh mục Quà tặng Noel được giảm 35% từ [Ngày bắt đầu] đến [Ngày kết thúc]."
*/


alter table promotion add COLUMN percent int, add COLUMN name_promotion varchar(100), add column describe_promotion text ;
ALTER TABLE promotion AUTO_INCREMENT = 1;

INSERT INTO promotion (start_at, end_at, percent, name_promotion, describe_promotion) VALUES
('2025-11-1', '2025-12-1', 20, 'Ưu đãi Đầu Mùa (New Season Offer)', 'Khởi động phong cách mới với Ưu đãi Đầu Mùa! Sở hữu ngay các sản phẩm mới nhất, hot nhất với mức giảm 20% đặc biệt. 
  Đừng bỏ lỡ cơ hội sở hữu những điện thoại tuyệt vời của bạn ngay hôm nay!' )


SELECT 
                p.id_product,
                p.name_product,
                p.price,
                p.type,
                p.brand,
                p.quantity,
                p.status,
                p.id_promotion,
                p.product_code,
                p.rate,
                d.color,
                d.rom,
                d.ram,
                d.screen_size,
                d.battery,
                d.description_phone,
                d.warranty,
                d.front_camera,
                d.rear_camera,
                d.cpu_detail,
                d.operating_system,
                d.chip_nfc,
                d.resolution,
                d.screen_frequency,
                d.video,
                i.image_url,
                j.start_at,
                j.end_at,
                j.percent,
                j.name_promotion,
                j.describe_promotion
            FROM product AS p
            LEFT JOIN detail_product AS d ON p.id_product = d.id_product
            LEFT JOIN product_image AS i ON p.id_product = i.id_product
            LEFT JOIN promotion AS j ON p.id_promotion = j.id_promotion
            WHERE p.product_code = 'P0001'


            ALTER TABLE user_account AUTO_INCREMENT = 0;

            ALTER TABLE user_information AUTO_INCREMENT = 0;



 SELECT 
                i.fullname,
                i.phonenumber,
                i.gender,
                i.address,
                u.name,
                u.email
            FROM user_information AS i
            LEFT JOIN user_account AS u ON i.id_user = u.id_user
            WHERE i.id_user = 1



--Lấy thông tin của sản phẩm trong cart
SELECT 

      cp.id_cart,
      cp.id_product,
      cp.quantity,
      p.name_product,
      p.price,
      d.rom,
      d.color,
      pr.percent,
      img.image_url

FROM cart_product AS cp
LEFT JOIN product AS p ON cp.id_product = p.id_product
LEFT JOIN detail_product AS d ON p.id_product = d.id_product
LEFT JOIN promotion AS pr ON p.id_promotion = pr.id_promotion
LEFT JOIN product_image AS img ON p.id_product = img.id_product
WHERE cp.id_cart = 2


-- ==========================================
-- BẢNG ĐỠN HÀNG (ORDERS)
-- ==========================================

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  id_user INT NOT NULL,
  total_amount DECIMAL(15, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_status VARCHAR(20) DEFAULT 'pending',
  shipping_address TEXT,
  shipping_phone VARCHAR(15),
  receiver_name VARCHAR(100),
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES user_account(id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_user (id_user),
  INDEX idx_status (status),
  INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Bảng chi tiết đơn hàng
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  id_product INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (id_product) REFERENCES product(id_product)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_order (order_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG THANH TOÁN (SEPAY INTEGRATION)
-- ==========================================

-- Tạo bảng lưu thông tin thanh toán
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50) DEFAULT 'sepay',
  transaction_code VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_order_id (order_id),
  INDEX idx_transaction_code (transaction_code)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


select 
  i.name_product,
  i.price,
  i.brand,
  i.quantity,
  i.status,
  j.name_promotion,
  i.rate
from product as i
left join promotion as j  on i.id_promotion = j.id_promotion


--Xem thông tin chi tiết của một sản phẩm 
select * from detail_product
left join product_image on detail_product.id_product = product_image.id_product
left join product on detail_product.id_product = product.id_product
 where detail_product.id_product = 1


 ALTER TABLE product AUTO_INCREMENT = 10
 
 ALTER TABLE detail_product AUTO_INCREMENT = 10
 
 ALTER TABLE product_image AUTO_INCREMENT = 10


alter table orders add COLUMN payment_method varchar(20)

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS shipping_fee DECIMAL(10,2) DEFAULT 0.00 AFTER total_amount;


SELECT 
    p.id_product,
    p.name_product,
    p.price,
    p.type,
    p.brand,
    p.quantity,
    p.status,
    p.id_promotion,
    p.product_code,
    p.rate,
    d.description_phone,
    d.screen_size,
    d.ram,
    d.rom,
    i.image_url,
    j.percent
FROM product AS p
LEFT JOIN detail_product AS d 
    ON p.id_product = d.id_product
LEFT JOIN product_image AS i
    ON p.id_product = i.id_product
LEFT JOIN promotion AS j
    ON p.id_promotion = j.id_promotion
WHERE p.brand = 'IPHONE'


--Test query lấy sản phẩm 
SELECT 
    p.id_product,
    p.name_product,
    p.price,
    p.type,
    p.brand,
    p.quantity,
    p.status,
    p.id_promotion,
    p.product_code,
    p.rate,
    d.description_phone,
    d.screen_size,
    d.ram,
    d.rom,
    i.image_url,
    j.percent
FROM product AS p
LEFT JOIN detail_product AS d 
    ON p.id_product = d.id_product
LEFT JOIN product_image AS i
    ON p.id_product = i.id_product
LEFT JOIN promotion AS j
    ON p.id_promotion = j.id_promotion
WHERE p.id_promotion IS NOT NULL 
ORDER BY j.percent DESC
LIMIT 15;