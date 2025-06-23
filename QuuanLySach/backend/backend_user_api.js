// File: server.js

const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());


let books = [
  {
    id: uuidv4(),
    title: 'LTHDT',
    author: 'Trần văn tư',
    genre: 'CNTT',
    year: 2021,
    status: 'mới'
  },
  {
    id: uuidv4(),
    title: 'JAVA',
    author: 'Nguyễn Nhật Trung',
    genre: 'CNTT',
    year: 2022,
    status: 'hư hỏng'
  },
  {
    id: uuidv4(),
    title: 'XSTK',
    author: 'Võ Văn Cảnh',
    genre: 'Toán',
    year: 2023,
    status: 'hết'
  },
  {
    id: uuidv4(),
    title: 'Hóa vô cơ',
    author: 'Lê Phước Thiên',
    genre: 'Hóa học',
    year: 2024,
    status: 'tốt'
  }
];


app.get('/api/books', (req, res) => {
  res.json(books);
});


app.post('/api/books', (req, res) => {
  const { title, author, genre, year, status } = req.body;
  const newBook = { id: uuidv4(), title, author, genre, year, status };
  books.push(newBook);
  res.status(201).json(newBook);
});


app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year, status } = req.body;
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = { id, title, author, genre, year, status };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});


app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter(book => book.id !== id);
  res.status(204).end();
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
