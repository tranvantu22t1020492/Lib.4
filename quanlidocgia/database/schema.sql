CREATE TABLE doc_gia (
  ma_doc_gia VARCHAR(10) PRIMARY KEY,
  ten_doc_gia VARCHAR(100) NOT NULL,
  so_dien_thoai VARCHAR(15),
  email VARCHAR(100),
  cap_do_thanh_vien VARCHAR(50) CHECK (cap_do_thanh_vien IN ('Đồng', 'Bạc', 'Vàng', 'Kim cương'))
);

-- Một số bản ghi mẫu
INSERT INTO doc_gia (ma_doc_gia, ten_doc_gia, so_dien_thoai, email, cap_do_thanh_vien) VALUES
('DG01', 'TDK01', '0123456789', 'tkk01@gmail.com', 'Bạc'),
('DG02', 'TDG02', '0876543219', 'tkk02@gmail.com', 'Vàng'),
('DG03', 'TDG03', '0597384261', 'tkk03@gmail.com', 'Kim cương'),
('DG04', 'TDG04', '0987643194', 'tkk04@gmail.com', 'Đồng');