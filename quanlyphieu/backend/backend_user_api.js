// File: server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dữ liệu mẫu (tạm lưu trong bộ nhớ)
let phieuList = [
  {
    id: 1,
    tenPhieu: "Phiếu nhận",
    chuThich: "Đơn hàng vừa được nhà cung cấp..."
  },
  {
    id: 2,
    tenPhieu: "Phiếu trả",
    chuThich: "Độc giả A vừa trả..."
  },
  {
    id: 3,
    tenPhieu: "Phiếu phạt",
    chuThich: "Độc giả C làm hỏng sách..."
  },
  {
    id: 4,
    tenPhieu: "Phiếu mượn",
    chuThich: "Độc giả B vừa mượn sách..."
  }
];

// API: Lấy tất cả phiếu
app.get('/api/phieu', (req, res) => {
  res.json(phieuList);
});

// API: Thêm phiếu mới
app.post('/api/phieu', (req, res) => {
  const newPhieu = {
    id: Date.now(),
    tenPhieu: req.body.tenPhieu,
    chuThich: req.body.chuThich
  };
  phieuList.push(newPhieu);
  res.status(201).json(newPhieu);
});

// API: Sửa phiếu
app.put('/api/phieu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = phieuList.findIndex(p => p.id === id);
  if (index !== -1) {
    phieuList[index] = { ...phieuList[index], ...req.body };
    res.json(phieuList[index]);
  } else {
    res.status(404).json({ error: 'Phiếu không tồn tại' });
  }
});

// API: Xóa phiếu
app.delete('/api/phieu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  phieuList = phieuList.filter(p => p.id !== id);
  res.status(204).end();
});

// Start server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
