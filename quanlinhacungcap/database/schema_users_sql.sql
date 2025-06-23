-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS lib4_db;
USE lib4_db;

-- Tạo bảng nhà cung cấp
CREATE TABLE Suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,          -- Tên nhà cung cấp
  receipt_code VARCHAR(20) NOT NULL    -- Mã phiếu nhập
);
INSERT INTO Suppliers (name, receipt_code) VALUES
('Kim đồng', 'A001'),
('Trần Tư', 'A002'),
('Nhật Trung', 'A003'),
('Phước Thiên', 'A004');
