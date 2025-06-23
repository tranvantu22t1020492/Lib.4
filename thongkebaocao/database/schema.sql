CREATE TABLE thong_ke (
  ten_sach VARCHAR(100),
  so_luong INT,
  da_muon INT,
  da_mat_hu INT,
  so_doc_gia INT,
  tien_phat DECIMAL(12,0),
  thoi_gian VARCHAR(50),
  PRIMARY KEY (ten_sach, thoi_gian)
);

-- Dữ liệu mẫu
INSERT INTO thong_ke (ten_sach, so_luong, da_muon, da_mat_hu, so_doc_gia, tien_phat, thoi_gian) VALUES
('O.O.P', 100, 54, 32, 534, 865000, '2024-2025'),
('Java', 120, 100, 64, 612, 1865000, '2023-2024'),
('Giải tích', 200, 342, 98, 769, 2865000, '2024-2025'),
('Hóa vô cơ', 100, 32, 10, 50, 3865000, '2024-2025');
