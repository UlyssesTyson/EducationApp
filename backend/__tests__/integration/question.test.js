const request = require('supertest')
const app = require('../../app')
const db = require('../../db/connect');
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

//testing directly onto database to test if it's set up correctly

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

//testing end to end connections

describe('GET /', () => {
  test('should return API info', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('welcome');
    expect(response.body.description).toBe('History Quiz API');
  });
});

describe('GET /questions/home/Tudor England', () => {
  test('should return all Tudor England questions and answers', async () => {
    const response = await request(app).get('/questions/home/Tudor England');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

  });

  test('should return questions with answers', async () => {
  const response = await request(app).get('/questions/home/Tudor England');

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);

  const question = response.body[0];

  expect(question).toHaveProperty('id');
  expect(question).toHaveProperty('question_text');
  expect(question).toHaveProperty('answers');
  expect(question).toHaveProperty('question_number');
  expect(question).toHaveProperty('category');
  expect(question).toHaveProperty('points');
  
  expect(question.category).toBe('Tudor England');

  expect(Array.isArray(question.answers)).toBe(true);

  const answer1 = question.answers[0];

  expect(answer1).toHaveProperty('option_text');
  expect(answer1).toHaveProperty('correct');
  expect(answer1.option_text).toBe('Henry VIII');
  expect(answer1.correct).toBe(true);

  const answer2 = question.answers[0];

  expect(answer2).toHaveProperty('option_text');
  expect(answer2).toHaveProperty('correct');
  expect(answer2.option_text).toBe('Henry VII');
  expect(answer2.correct).toBe(false);
});

});