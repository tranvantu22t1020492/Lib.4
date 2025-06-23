const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

let thongke = [
  { ten_sach: 'O.O.P', so_luong: 100, da_muon: 54, da_mat_hu: 32, so_doc_gia: 534, tien_phat: 865000, thoi_gian: '2024-2025' },
  { ten_sach: 'Java', so_luong: 120, da_muon: 100, da_mat_hu: 64, so_doc_gia: 612, tien_phat: 1865000, thoi_gian: '2023-2024' },
  { ten_sach: 'Giải tích', so_luong: 200, da_muon: 342, da_mat_hu: 98, so_doc_gia: 769, tien_phat: 2865000, thoi_gian: '2024-2025' },
  { ten_sach: 'Hóa vô cơ', so_luong: 100, da_muon: 32, da_mat_hu: 10, so_doc_gia: 50, tien_phat: 3865000, thoi_gian: '2024-2025' }
];

function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

function librarianOnly(req, res, next) {
  if (req.user.role !== 'Thủ thư') return res.sendStatus(403);
  next();
}

app.get('/api/thongke', auth, librarianOnly, (req, res) => {
  res.json(thongke);
});

app.post('/api/thongke', auth, librarianOnly, (req, res) => {
  thongke.push(req.body);
  res.status(201).json({ message: 'Thêm báo cáo thành công!' });
});

app.put('/api/thongke/:ten_sach/:thoi_gian', auth, librarianOnly, (req, res) => {
  const { ten_sach, thoi_gian } = req.params;
  const index = thongke.findIndex(tk => tk.ten_sach === ten_sach && tk.thoi_gian === thoi_gian);
  if (index === -1) return res.sendStatus(404);
  thongke[index] = { ...thongke[index], ...req.body };
  res.json({ message: 'Cập nhật thành công!' });
});

app.delete('/api/thongke/:ten_sach/:thoi_gian', auth, librarianOnly, (req, res) => {
  const { ten_sach, thoi_gian } = req.params;
  thongke = thongke.filter(tk => tk.ten_sach !== ten_sach || tk.thoi_gian !== thoi_gian);
  res.json({ message: 'Xóa thành công!' });
});

app.listen(3000, () => {
  console.log('Server đang chạy ở cổng 3000');
});
