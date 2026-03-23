const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('./config')
const port = process.env.PORT

describe('Questions API Endpoints', () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(() => {
    api = app.listen(port, () => {
      console.log(`Test server running on port ${port}`)
    })
  })

  afterAll((done) => {
    console.log('Closing server')
    api.close(done)
  })

describe('Question Table SQL commands', () => {

  test('should return all questions', async () => {
    const result = await db.query('SELECT * FROM question');

    expect(result.rows.length).toBe(15);
  });

  test('should return only WW2 questions', async () => {
    const result = await db.query(
      "SELECT * FROM question WHERE category = 'WW2'"
    );

    expect(result.rows.length).toBe(5);
  });

  test('should return correct question text', async () => {
    let result = await db.query(
      "SELECT * FROM question WHERE question_number = 1"
    );

    expect(result.rows[0].question_text)
      .toBe('In which year did World War II begin?');

  });

  test('should insert a new question', async () => {
    const result = await db.query(`
      INSERT INTO question (question_number, question_text, category)
      VALUES (16, 'Test question?', 'Test')
      RETURNING *
    `);

    expect(result.rows[0].question_text).toBe('Test question?');
  });

});

})

describe('GET /', () => {
  test('should return API info', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('welcome');
    expect(response.body.description).toBe('History Quiz API');
  });
});

describe('GET /histories', () => {
  test('should return all questions', async () => {
    const response = await request(app).get('/histories');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(15);
  });

  test('should return correct structure', async () => {
    const response = await request(app).get('/histories');

    const item = response.body[0];

    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('question_text');
    expect(item).toHaveProperty('category');
  });
});