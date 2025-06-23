CREATE TABLE nhan_vien (
  ten_tai_khoan VARCHAR(20) PRIMARY KEY,
  quyen_han VARCHAR(100),
  so_dien_thoai VARCHAR(15),
  email VARCHAR(100)
);

-- Một số bản ghi mẫu
INSERT INTO nhan_vien (ten_tai_khoan, quyen_han, so_dien_thoai, email) VALUES
('TTK01', 'Quản lí sách', '0123456789', 'tkk01@gmail.com'),
('TTK02', 'Thống kê', '0876543219', 'tkk02@gmail.com'),
('TTK03', 'Quản lí độc giả', '0597384261', 'tkk03@gmail.com'),
('TTK04', 'Quản lí nhà cung cấp', '0987643194', 'tkk04@gmail.com');