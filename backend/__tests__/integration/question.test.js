const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('./config')

describe('Goat API Endpoints', () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  }, 30000)

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log('Test server running on port 4000')
    })
  })

  afterAll((done) => {
    console.log('Closing server')
    api.close(done)
  })

    describe('GET /', () => {
    it('responds to GET / with a message and a description', async () => {
      const response = await request(api).get('/')
  
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('welcome')
      expect(response.body.description).toBe('History Quiz API')
    })
  });

  describe('getByCategoryWithAnswers', () => {
    test('should return questions with answers', async () => {
      const response = await request(api).get('/questions/home/testcategory')
      
      console.log(response.status);
      console.log(response.body);
      console.log('debug')

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});