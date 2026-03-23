// backend/tests/answer.test.js
const request = require('supertest')
const app = require('../../app') // make sure this points to your Express app
const { resetTestDB } = require('./config')

describe('answers API Endpoints', () => {
  let api

  // Reset DB before each test
  beforeEach(async () => {
    await resetTestDB()
  })

  // Start test server
  beforeAll(() => {
    api = app.listen(4001, () => {
      console.log('Test server running on port 4001')
    })
  })

  // Close server after tests
  afterAll((done) => {
    console.log('Closing server')
    api.close(done)
  })

  describe('GET /answers', () => {
    it('should return all answers with status code 200', async () => {
      const response = await request(api).get('/answers')

      expect(response.status).toBe(200)
      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)
      
      // Check structure of first answer
      const firstAnswer = response.body.data[0]
      expect(firstAnswer).toHaveProperty('id')
      expect(firstAnswer).toHaveProperty('question_number')
      expect(firstAnswer).toHaveProperty('option_text')
      expect(firstAnswer).toHaveProperty('correct')
    })
  })

  describe('GET /answers/:question_number', () => {
    it('should return answers for a specific question', async () => {
      const questionNumber = 1 // assuming this exists in test DB
      const response = await request(api).get(`/answers/${questionNumber}`)

      expect(response.status).toBe(200)
      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)

      // Ensure all answers belong to that question
      response.body.data.forEach(ans => {
        expect(ans.question_number).toBe(questionNumber)
      })
    })

    it('should return 404 if question does not exist', async () => {
      const response = await request(api).get('/answers/9999')
      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })
})