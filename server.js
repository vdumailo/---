const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Зберігання постів у пам'яті
let posts = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Отримати всі пости
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Додати новий пост
app.post('/posts', (req, res) => {
    const { title, description, author } = req.body;
    const newPost = { id: Date.now(), title, description, author };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Редагувати пост
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const postIndex = posts.findIndex(post => post.id == id);
    if (postIndex !== -1) {
        posts[postIndex] = { id: Number(id), title, description, author };
        res.json(posts[postIndex]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Видалити пост
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(post => post.id != id);
    res.status(200).json({ message: 'Post deleted successfully' });
});

// Запуск серверу
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
