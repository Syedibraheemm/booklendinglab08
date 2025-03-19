const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = [];
const books = [];
const SECRET_KEY = 'secret123';

// User Authentication (Signup/Login)
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password });
    res.json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access Denied' });
    
    // Extract the token from Bearer format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Lend a Book
app.post('/lend', authenticate, (req, res) => {
    const { title, author, borrower, dueDate, category } = req.body;
    books.push({ title, author, borrower, dueDate, category });
    res.json({ message: 'Book lent successfully' });
});

// View Borrowed Books (Filter by borrower, category, due date)
app.get('/books', authenticate, (req, res) => {
    const { borrower, category, dueDate } = req.query;
    let filteredBooks = books;
    if (borrower) filteredBooks = filteredBooks.filter(book => book.borrower === borrower);
    if (category) filteredBooks = filteredBooks.filter(book => book.category === category);
    if (dueDate) filteredBooks = filteredBooks.filter(book => book.dueDate === dueDate);
    res.json(filteredBooks);
});

// Only start the server if the file is run directly
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;