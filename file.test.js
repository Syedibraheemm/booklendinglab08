const request = require('supertest');
const app = require('./file');

describe('Book Lending System', () => {
    let token;
    let server;

    beforeAll(async () => {
        // Start the server on a different port for testing
        server = app.listen(3001);
        
        // User Signup
        const signupRes = await request(app)
            .post('/signup')
            .send({ username: 'testuser', password: 'testpass' });

        console.log('Signup Response:', signupRes.body);
        expect([200, 201]).toContain(signupRes.statusCode);

        // User Login
        const loginRes = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpass' });

        console.log('Login Response:', loginRes.body);
        expect(loginRes.statusCode).toBe(200);
        expect(loginRes.body).toHaveProperty('token');

        token = loginRes.body.token;
    });

    afterAll(done => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });

    // Add a simple test that will always run
    test('Server should be running', () => {
        expect(server).toBeDefined();
    });

    test('User should be able to lend a book', async () => {
        const res = await request(app)
            .post('/lend')
            .set('Authorization', `Bearer ${token}`)
            .send({ 
                title: 'Node.js Guide', 
                author: 'John Doe', 
                borrower: 'Alice', 
                dueDate: '2025-04-01', 
                category: 'Tech' 
            });

        console.log('Lend Book Response:', res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Book lent successfully');
    });

    test('User should be able to view borrowed books', async () => {
        const res = await request(app)
            .get('/books')
            .set('Authorization', `Bearer ${token}`);

        console.log('View Books Response:', res.body);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});