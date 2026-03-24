const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('Answers API Endpoints', () => {

  beforeEach(async () => {
    await resetTestDB();
  });

  describe('GET /answers/:question_number', () => {

    test('should return answers for a specific question', async () => {
      const response = await request(app).get('/answers/1');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // check structure
      const answer = response.body[0];

      expect(answer).toHaveProperty('id');
      expect(answer).toHaveProperty('question_number');
      expect(answer).toHaveProperty('option_text');
      expect(answer).toHaveProperty('correct');

      // ensure all belong to same question
      response.body.forEach(a => {
        expect(a.question_number).toBe(1);
      });
    });

    test('should include correct answer for question 1', async () => {
      const response = await request(app).get('/answers/1');

      const hasCorrectAnswer = response.body.some(
        a => a.option_text === '1939' && a.correct === true
      );

      expect(hasCorrectAnswer).toBe(true);
    });

    test('should return 404 if question does not exist', async () => {
      const response = await request(app).get('/answers/9999');

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

  });

});