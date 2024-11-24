const API_URL = 'http://localhost:3000/posts';

// Завантаження постів
const loadPosts = async () => {
    const response = await fetch(API_URL);
    const posts = await response.json();
    const container = document.getElementById('posts-container');
    container.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <small>Author: ${post.author}</small>
            <button onclick="deletePost(${post.id})">Delete</button>
            <button onclick="editPost(${post.id})">Edit</button>
        `;
        container.appendChild(postElement);
    });
};

// Додавання посту
document.getElementById('add-post').addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, author }),
    });

    loadPosts();
});

// Видалення посту
const deletePost = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadPosts();
};

// Редагування посту
const editPost = async (id) => {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    const newAuthor = prompt('Enter new author:');
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription, author: newAuthor }),
    });
    loadPosts();
};

// Завантажити пости при завантаженні сторінки
loadPosts();
