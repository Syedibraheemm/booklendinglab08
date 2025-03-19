// Import dependencies
const request = require('supertest');
const app = require('./file');

// Basic test to ensure the test suite runs
test('1+1 should equal 2', () => {
  expect(1+1).toBe(2);
});

// Book Lending System tests
describe('Book Lending System', () => {
  let token;
  let server;

  // Setup before tests
  beforeAll(async () => {
    // Start server on test port
    server = app.listen(3001);
    
    // Test user signup
    const signupRes = await request(app)
      .post('/signup')
      .send({ username: 'testuser', password: 'testpass' });
    
    // Test user login to get token
    const loginRes = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });
    
    token = loginRes.body.token;
  }, 10000); // Increase timeout for setup

  // Cleanup after tests
  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  // Test book lending
  test('User should be able to lend a book', async () => {
    const res = await request(app)
      .post('/lend')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Test Book', 
        author: 'Test Author', 
        borrower: 'Test Borrower', 
        dueDate: '2025-04-01', 
        category: 'Test' 
      });
    
    expect(res.statusCode).toBe(200);
  });

  // Test viewing books
  test('User should be able to view books', async () => {
    const res = await request(app)
      .get('/books')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});