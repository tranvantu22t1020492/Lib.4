const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

let docgia = [
  { id: 1, ma: 'DG01', ten: 'TDK01', sdt: '0123456789', email: 'tkk01@gmail.com', cap_do: 'Bạc' },
  { id: 2, ma: 'DG02', ten: 'TDG02', sdt: '0876543219', email: 'tkk02@gmail.com', cap_do: 'Vàng' },
  { id: 3, ma: 'DG03', ten: 'TDG03', sdt: '0597384261', email: 'tkk03@gmail.com', cap_do: 'Kim cương' },
  { id: 4, ma: 'DG04', ten: 'TDG04', sdt: '0987643194', email: 'tkk04@gmail.com', cap_do: 'Đồng' }
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

router.get('/', auth, librarianOnly, (req, res) => {
  res.json(docgia);
});

router.post('/', auth, librarianOnly, (req, res) => {
  const { ma, ten, sdt, email, cap_do } = req.body;
  docgia.push({ id: docgia.length + 1, ma, ten, sdt, email, cap_do });
  res.status(201).json({ message: 'Thêm độc giả thành công!' });
});

router.put('/:id', auth, librarianOnly, (req, res) => {
  const id = parseInt(req.params.id);
  const doc = docgia.find(d => d.id === id);
  if (!doc) return res.sendStatus(404);
  Object.assign(doc, req.body);
  res.json({ message: 'Cập nhật thành công!' });
});

router.delete('/:id', auth, librarianOnly, (req, res) => {
  docgia = docgia.filter(d => d.id !== parseInt(req.params.id));
  res.json({ message: 'Xóa độc giả thành công!' });
});

module.exports = router;