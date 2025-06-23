-- schema.sql - Tạo bảng users cho hệ thống quản lý tài khoản thư viện

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  role ENUM('Thủ thư', 'Nhân viên', 'Độc giả') NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu
INSERT INTO users (username, role, phone, email, password)
VALUES
('TTK01', 'Thủ thư', '0123456789', 'tkk01@gmail.com', 'hashed_password_1'),
('TTK02', 'Nhân viên', '0876543219', 'tkk02@gmail.com', 'hashed_password_2'),
('TTK03', 'Nhân viên', '0597384261', 'tkk03@gmail.com', 'hashed_password_3'),
('TTK04', 'Độc giả', '0987643194', 'tkk04@gmail.com', 'hashed_password_4');
