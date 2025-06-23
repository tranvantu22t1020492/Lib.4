// File: server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lib4_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Đã kết nối MySQL');
});

// API lấy tất cả nhà cung cấp
app.get('/suppliers', (req, res) => {
  db.query('SELECT * FROM Suppliers', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// API thêm nhà cung cấp
app.post('/suppliers', (req, res) => {
  const { name, receiptCode } = req.body;
  db.query('INSERT INTO Suppliers (name, receipt_code) VALUES (?, ?)', [name, receiptCode], (err, result) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// API cập nhật nhà cung cấp
app.put('/suppliers/:id', (req, res) => {
  const { name, receiptCode } = req.body;
  db.query('UPDATE Suppliers SET name = ?, receipt_code = ? WHERE id = ?', [name, receiptCode, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// API xóa nhà cung cấp
app.delete('/suppliers/:id', (req, res) => {
  db.query('DELETE FROM Suppliers WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('🚀 Server đang chạy tại http://localhost:3000');
});
