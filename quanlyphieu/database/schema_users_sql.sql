CREATE TABLE Phieu (
    MaPhieu INT AUTO_INCREMENT PRIMARY KEY,
    TenPhieu VARCHAR(100) NOT NULL,
    ChuThich TEXT,
    NgayTao DATE DEFAULT CURRENT_DATE
);
INSERT INTO Phieu (TenPhieu, ChuThich) VALUES
('Phiếu nhận', 'Đơn hàng vừa được nhà cung cấp giao...'),
('Phiếu trả', 'Độc giả A vừa trả sách...'),
('Phiếu phạt', 'Độc giả C làm hỏng sách...'),
('Phiếu mượn', 'Độc giả B vừa mượn sách...');
