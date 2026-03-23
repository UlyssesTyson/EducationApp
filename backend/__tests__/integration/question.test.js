const request = require('supertest')
//const app = require('../../app')
const { resetTestDB } = require('./config')

describe('questions API Endpoints', () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log('Test server running on port 3000')
    })
  })

  afterAll((done) => {
    console.log('Gracefully closing server')
    api.close(done)
  })

  describe('GET /', () => {
    it('responds to GET / with a message and a description', async () => {
      const response = await request(api).get('/')
  
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('welcome')
      expect(response.body.description).toBe('GOAT API')
    })
  });

  describe('GET /goats', () => {
    it('should return all goats with a status code 200', async () => {
      const response = await request(api).get('/goats');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });})