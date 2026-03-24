// backend/__tests__/unit/controllers/leaderboard.spec.js
const leaderboardController = require('../../../controllers/leaderboard')
const Leaderboard = require('../../../models/Leaderboard')

// Mock response methods
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(() => ({
  json: mockJson,
  end: mockEnd
}))
const mockRes = { status: mockStatus }

describe('Leaderboard controller', () => {
  beforeEach(() => jest.clearAllMocks())
  afterAll(() => jest.resetAllMocks())

  describe('index', () => {
    it('should return leaderboard entries with status 200', async () => {
      const testEntries = [
        { id: 1, username: 'Alice', score: 100 },
        { id: 2, username: 'Bob', score: 80 }
      ]
      jest.spyOn(Leaderboard, 'getAll').mockResolvedValue(testEntries)

      await leaderboardController.index(null, mockRes)

      expect(Leaderboard.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(testEntries)
    })

    it('should return error on failure', async () => {
      jest.spyOn(Leaderboard, 'getAll').mockRejectedValue(new Error('DB error'))

      await leaderboardController.index(null, mockRes)

      expect(Leaderboard.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'DB error' })
    })
  })

  describe('show', () => {
    let mockReq

    beforeEach(() => {
      mockReq = { params: { id: '1' } }
    })

    it('should return a leaderboard entry with status 200', async () => {
      const testEntry = { id: 1, username: 'Alice', score: 100 }
      jest.spyOn(Leaderboard, 'getOneById').mockResolvedValue(testEntry)

      await leaderboardController.show(mockReq, mockRes)

      expect(Leaderboard.getOneById).toHaveBeenCalledWith(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(testEntry)
    })

    it('should return error if entry not found', async () => {
      jest.spyOn(Leaderboard, 'getOneById').mockRejectedValue(new Error('Not found'))

      await leaderboardController.show(mockReq, mockRes)

      expect(Leaderboard.getOneById).toHaveBeenCalledWith(1)
      expect(mockStatus).toHaveBeenCalledWith(404)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Not found' })
    })
  })

  describe('create', () => {
    it('should create a new entry with status 201', async () => {
      const testEntry = { username: 'Alice', score: 100 }
      const mockReq = { body: testEntry }

      jest.spyOn(Leaderboard, 'add').mockResolvedValue(testEntry)

      await leaderboardController.create(mockReq, mockRes)

      expect(Leaderboard.add).toHaveBeenCalledWith('Alice', 100)
      expect(mockStatus).toHaveBeenCalledWith(201)
      expect(mockJson).toHaveBeenCalledWith(testEntry)
    })

    it('should return 400 if required fields are missing', async () => {
      const mockReq = { body: { username: 'Alice' } } // missing score

      await leaderboardController.create(mockReq, mockRes)

      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Username and score are required' })
    })

    it('should return 500 if creation fails', async () => {
      const testEntry = { username: 'Alice', score: 100 }
      const mockReq = { body: testEntry }

      jest.spyOn(Leaderboard, 'add').mockRejectedValue(new Error('DB error'))

      await leaderboardController.create(mockReq, mockRes)

      expect(Leaderboard.add).toHaveBeenCalledWith('Alice', 100)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'DB error' })
    })
  })

  describe('update', () => {
    it('should update a leaderboard entry and return status 200', async () => {
      const existingEntry = { id: 1, username: 'Alice', score: 100 }
      const updatedEntry = { id: 1, username: 'Alice', score: 150 }
      const mockReq = { params: { id: '1' }, body: { score: 150 } }

      jest.spyOn(Leaderboard, 'getOneById').mockResolvedValue(existingEntry)
      jest.spyOn(Leaderboard, 'update').mockResolvedValue(updatedEntry) // assuming you add a static update method

      await leaderboardController.update(mockReq, mockRes)

      expect(Leaderboard.getOneById).toHaveBeenCalledWith(1)
      expect(Leaderboard.update).toHaveBeenCalledWith(1, { username: 'Alice', score: 150 })
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(updatedEntry)
    })

    it('should return 400 if no fields provided to update', async () => {
      const mockReq = { params: { id: '1' }, body: {} }

      await leaderboardController.update(mockReq, mockRes)

      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Provide a username or score to update' })
    })

    it('should return 500 if update fails', async () => {
      const existingEntry = { id: 1, username: 'Alice', score: 100 }
      const mockReq = { params: { id: '1' }, body: { score: 150 } }

      jest.spyOn(Leaderboard, 'getOneById').mockResolvedValue(existingEntry)
      jest.spyOn(Leaderboard, 'update').mockRejectedValue(new Error('DB error'))

      await leaderboardController.update(mockReq, mockRes)

      expect(Leaderboard.getOneById).toHaveBeenCalledWith(1)
      expect(Leaderboard.update).toHaveBeenCalledWith(1, { username: 'Alice', score: 150 })
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'DB error' })
    })
  })
})