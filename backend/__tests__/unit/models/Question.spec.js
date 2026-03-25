const Question = require('../../../models/Question')
const db = require('../../../db/connect')

describe('Question', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

    describe ('getByCategoryWithAnswers', () => {
    it('resolves with questions and asnswers', async () => {
      // Arrange

      const mockQuestions = [
        { id: 1, question_number: 1, question_text: 'Test question1?', category: 'testcategory', points: 1},
        { id: 2, question_number: 2, question_text: 'Test question2?', category: 'testcategory', points: 1},
        { id: 3, question_number: 3, question_text: 'Test question3?', category: 'testcategory', points: 1},
      ];

      const mockAnswers = [
        // Question 1 answers
        { id: 1, question_number: 1, option_text: 'Answer 1A', correct: true },
        { id: 2, question_number: 1, option_text: 'Answer 1B', correct: false },
        { id: 3, question_number: 1, option_text: 'Answer 1C', correct: false },

        // Question 2 answers
        { id: 4, question_number: 2, option_text: 'Answer 2A', correct: true },
        { id: 5, question_number: 2, option_text: 'Answer 2B', correct: false },
        { id: 6, question_number: 2, option_text: 'Answer 2C', correct: false },

        // Question 3 answers
        { id: 7, question_number: 3, option_text: 'Answer 3A', correct: true },
        { id: 8, question_number: 3, option_text: 'Answer 3B', correct: false },
        { id: 9, question_number: 3, option_text: 'Answer 3C', correct: false },
      ];

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockQuestions });

      // Act
      const questions = await Question.getAll();

      // Assert
      expect(questions).toHaveLength(3);
      expect(questions[0]).toHaveProperty('id');
      expect(questions[0]).toHaveProperty('question_number');
      expect(questions[0].question_text).toBe('Test question1?');
      expect(db.query).toHaveBeenCalledWith("SELECT q.id,q.question_number,q.question_text,q.category,q.points,a.id AS answer_id,a.option_text,a.correct FROM question q LEFT JOIN answer a ON q.question_number = a.question_number WHERE q.category = $1 ORDER BY q.question_number;");
    });
  })
})