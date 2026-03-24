const request = require('supertest')
const app = require('../../app')
const db = require('../../db/connect');
const { resetTestDB } = require('./config')
const port = process.env.PORT

describe('Questions API Endpoints', () => {

  beforeEach(async () => {
    await resetTestDB();
  });
})

  // -----------------------------
  // Root route
  // -----------------------------
  describe('GET /', () => {
    test('should return API info', async () => {
      const response = await request(app).get('/');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('welcome');
      expect(response.body.description).toBe('History Quiz API');
    });
  });

  // -----------------------------
  // Get questions by category
  // -----------------------------
  describe('GET /questions/home/Tudor England', () => {

    test('should return all Tudor England questions and answers', async () => {
      const response = await request(app).get('/questions/home/Tudor England');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  })
describe('GET /questions/home/Tudor England', () => {
  test('should return all Tudor England questions and answers', async () => {
    const response = await request(app).get('/questions/home/Tudor England');

      expect(response.category).toBe('Tudor England');

      expect(Array.isArray(response.answers)).toBe(true);
  })

  test('should return questions with answers', async () => {
  const response = await request(app).get('/questions/home/Tudor England');

      expect(answer).toHaveProperty('id');
      expect(answer).toHaveProperty('option_text');
      expect(answer).toHaveProperty('correct');
    });

    test('should include correct answer (Henry VIII)', async () => {
      const response = await request(app).get('/questions/home/Tudor England');

      const question = response.body[0];

      const hasCorrectAnswer = question.answers.some(
        a => a.option_text === 'Henry VIII' && a.correct === true
      );

      expect(hasCorrectAnswer).toBe(true);
    });

  });


  describe('GET /questions/home/INVALID_CATEGORY', () => {
    test('should return 404 for invalid category', async () => {
      const response = await request(app).get('/questions/home/INVALID_CATEGORY');

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
