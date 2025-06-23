const express = require('express');
const router = express.Router();
const jwt2 = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let nhanvien = [
  { id: 1, username: 'TTK01', role: 'Quản lí sách', phone: '0123456789', email: 'tkk01@gmail.com', password: bcrypt.hashSync('123456', 10) },
  { id: 2, username: 'TTK02', role: 'Thống kê', phone: '0876543219', email: 'tkk02@gmail.com', password: bcrypt.hashSync('123456', 10) },
  { id: 3, username: 'TTK03', role: 'Quản lí độc giả', phone: '0597384261', email: 'tkk03@gmail.com', password: bcrypt.hashSync('123456', 10) },
  { id: 4, username: 'TTK04', role: 'Quản lí nhà cung cấp', phone: '0987643194', email: 'tkk04@gmail.com', password: bcrypt.hashSync('123456', 10) }
];

function auth2(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt2.verify(token, 'secret', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

function librarianOnly2(req, res, next) {
  if (req.user.role !== 'Thủ thư') return res.sendStatus(403);
  next();
}

router.get('/', auth2, librarianOnly2, (req, res) => {
  const result = nhanvien.map(({ password, ...rest }) => rest);
  res.json(result);
});

router.post('/', auth2, librarianOnly2, (req, res) => {
  const { username, role, phone, email, password } = req.body;
  nhanvien.push({ id: nhanvien.length + 1, username, role, phone, email, password: bcrypt.hashSync(password, 10) });
  res.status(201).json({ message: 'Thêm nhân viên thành công!' });
});

router.put('/:id', auth2, librarianOnly2, (req, res) => {
  const id = parseInt(req.params.id);
  const nv = nhanvien.find(n => n.id === id);
  if (!nv) return res.sendStatus(404);
  Object.assign(nv, req.body);
  res.json({ message: 'Cập nhật nhân viên thành công!' });
});

router.delete('/:id', auth2, librarianOnly2, (req, res) => {
  nhanvien = nhanvien.filter(n => n.id !== parseInt(req.params.id));
  res.json({ message: 'Xóa nhân viên thành công!' });
});

module.exports = router;