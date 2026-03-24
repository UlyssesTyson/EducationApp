const Question = require('../../../models/Question');
const { resetTestDB } = require('../../integration/config');

describe('Question Model', () => {

  beforeEach(async () => {
    await resetTestDB();
  });

  describe('getByCategoryWithAnswers', () => {

    test('should return questions with answers', async () => {
      const questions = await Question.getByCategoryWithAnswers('Tudor England');

      expect(questions.length).toBeGreaterThan(0);

      const q = questions[0];

      expect(q).toHaveProperty('question_text');
      expect(q).toHaveProperty('answers');
      expect(Array.isArray(q.answers)).toBe(true);
    });

    test('should include correct answer (Henry VIII)', async () => {
      const questions = await Question.getByCategoryWithAnswers('Tudor England');

      const q = questions[0];

      const hasCorrectAnswer = q.answers.some(
        a => a.option_text === 'Henry VIII' && a.correct === true
      );

      expect(hasCorrectAnswer).toBe(true);
    });

    test('should return empty array if no answers exist', async () => {
      // remove answers
      await require('../../../db/connect').query('DELETE FROM answer');

      const questions = await Question.getByCategoryWithAnswers('WW2');

      expect(Array.isArray(questions)).toBe(true);
      expect(questions[0].answers).toEqual([]);
    });

  });

});