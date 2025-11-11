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

delete from user_account WHERE name = 'test';

drop TABLE user_information;
ALTER TABLE user_account AUTO_INCREMENT = 1;
