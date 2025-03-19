const request = require('supertest');
const app = require('./file');

describe('Book Lending System', () => {
    let token;

    beforeAll(async () => {
        await request(app).post('/signup').send({ username: 'testuser', password: 'testpass' });
        const res = await request(app).post('/login').send({ username: 'testuser', password: 'testpass' });
        token = res.body.token;
    });

    test('User should be able to lend a book', async () => {
        const res = await request(app)
            .post('/lend')
            .set('Authorization', token)
            .send({ title: 'Node.js Guide', author: 'John Doe', borrower: 'Alice', dueDate: '2025-04-01', category: 'Tech' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Book lent successfully');
    });

    test('User should be able to view borrowed books', async () => {
        const res = await request(app)
            .get('/books')
            .set('Authorization', token);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

module.exports = app;
