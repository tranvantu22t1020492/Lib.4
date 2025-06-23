CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  year INT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, category, year, status) VALUES
('LTHDT', 'Trần Văn Tư', 'CNTT', 2021, 'mới'),
('JAVA', 'Nguyễn Nhật Trung', 'CNTT', 2022, 'hư hỏng'),
('XSTK', 'Võ Văn Cảnh', 'Toán', 2023, 'hết'),
('Hóa vô cơ', 'Lê Phước Thiên', 'Hóa học', 2024, 'tốt');
