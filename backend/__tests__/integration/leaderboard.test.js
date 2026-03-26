// process.env.NODE_ENV = 'test';
// process.env.DB_TEST_URL = 'postgresql://postgres.xntfyssvgsmrovkioffw:greansbeanspotatoes@aws-1-eu-west-2.pooler.supabase.com:6543/postgres';
require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('Leaderboard API Endpoints', () => {
  let api;

  beforeAll(() => {
    api = app.listen(4001, () => console.log('Test server running on port 4001'));
  });

  beforeEach(async () => {
    await resetTestDB();
  });

  afterAll((done) => {
    api.close(done);
  });

  // ✅ GET leaderboard
  describe('GET /leaderboard/home', () => {
    it('should return leaderboard entries', async () => {
      const response = await request(api).get('/leaderboard/home');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);

      expect(response.body[0]).toHaveProperty('username');
      expect(response.body[0]).toHaveProperty('score');
    });
  });

  // ✅ POST leaderboard
  describe('POST /leaderboard/home', () => {
    it('should add a new leaderboard entry', async () => {
      const newEntry = { username: 'new_user', score: 5 };

      const response = await request(api)
        .post('/leaderboard/home')
        .send(newEntry);

      expect(response.status).toBe(201);
      expect(response.body.username).toBe('new_user');
      expect(response.body.score).toBe(5);
    });

    it('should return 400 if missing fields', async () => {
      const response = await request(api)
        .post('/leaderboard/home')
        .send({ username: 'bad_user' }); // missing score

      expect(response.status).toBe(400);
    });
  });

  // ✅ PATCH leaderboard (optional)
  describe('PATCH /leaderboard/home/:id', () => {
    it('should update an existing leaderboard score', async () => {
      const patchResponse = await request(api)
        .patch('/leaderboard/home/1')
        .send({ score: 10 });

      expect(patchResponse.status).toBe(200);
      expect(patchResponse.body.score).toBe(10);
    });
  });
});