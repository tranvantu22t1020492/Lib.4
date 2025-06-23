// Backend Node.js với Express.js (Mô tả chức năng quản lý tài khoản)

const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

// Mô phỏng DB
let users = [
  {
    id: 1,
    username: 'TTK01',
    role: 'Thủ thư',
    phone: '0123456789',
    email: 'tkk01@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    id: 2,
    username: 'TTK02',
    role: 'Nhân viên',
    phone: '0876543219',
    email: 'tkk02@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  }
];

// Middleware xác thực
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

// Middleware phân quyền thủ thư
function librarianOnly(req, res, next) {
  if (req.user.role !== 'Thủ thư') return res.sendStatus(403);
  next();
}

// Đăng nhập
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
  }
  const token = jwt.sign({ username: user.username, role: user.role }, 'secret', { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Lấy danh sách người dùng
app.get('/api/users', auth, librarianOnly, (req, res) => {
  const result = users.map(({ password, ...rest }) => rest);
  res.json(result);
});

// Thêm người dùng
app.post('/api/users', auth, librarianOnly, (req, res) => {
  const { username, role, phone, email, password } = req.body;
  const newUser = {
    id: users.length + 1,
    username,
    role,
    phone,
    email,
    password: bcrypt.hashSync(password, 10)
  };
  users.push(newUser);
  res.status(201).json({ message: 'Thêm thành công' });
});

// Cập nhật người dùng
app.put('/api/users/:id', auth, librarianOnly, (req, res) => {
  const id = parseInt(req.params.id);
  const { role, phone, email } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) return res.sendStatus(404);
  user.role = role;
  user.phone = phone;
  user.email = email;
  res.json({ message: 'Cập nhật thành công' });
});

// Xóa người dùng
app.delete('/api/users/:id', auth, librarianOnly, (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: 'Xóa thành công' });
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server đang chạy ở cổng 3000');
});
