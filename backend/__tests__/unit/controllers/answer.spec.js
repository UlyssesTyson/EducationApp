const answersController = require('../../../controllers/answer')
const Answer = require('../../../models/Answer')

// Mock response methods
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({
  json: mockJson,
  end: mockEnd
}))

const mockRes = { status: mockStatus }

describe('Answers controller', () => {
  beforeEach(() => jest.clearAllMocks())
  afterAll(() => jest.resetAllMocks())

  describe('index', () => {
    it('should return answers with status 200', async () => {
      const testAnswers = ['a1', 'a2']

      jest.spyOn(Answer, 'getAll').mockResolvedValue(testAnswers)

      await answersController.index(null, mockRes)

      expect(Answer.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(testAnswers)
    })

    it('should return error on failure', async () => {
      jest
        .spyOn(Answer, 'getAll')
        .mockRejectedValue(new Error('DB error'))

      await answersController.index(null, mockRes)

      expect(Answer.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'DB error' })
    })
  })

  describe('show', () => {
    let mockReq

    beforeEach(() => {
      mockReq = { params: { QN: '1' } }
    })

    it('should return an answer with status 200', async () => {
      const testAnswer = { QN: 1, text: 'Test answer' }

      jest
        .spyOn(Answer, 'getAnswerByQN')
        .mockResolvedValue(testAnswer)

      await answersController.show(mockReq, mockRes)

      expect(Answer.getAnswerByQN).toHaveBeenCalledWith(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(testAnswer)
    })

    it('should return error if answer not found', async () => {
      jest
        .spyOn(Answer, 'getAnswerByQN')
        .mockRejectedValue(new Error('Not found'))

      await answersController.show(mockReq, mockRes)

      expect(Answer.getAnswerByQN).toHaveBeenCalledWith(1)
      expect(mockStatus).toHaveBeenCalledWith(404)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Not found' })
    })
  })
})