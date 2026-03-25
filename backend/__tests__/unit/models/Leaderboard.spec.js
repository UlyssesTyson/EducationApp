const Leaderboard = require('../../../models/Leaderboard');
const db = require('../../../db/connect');

describe('Leaderboard', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  // -----------------------------

  describe('getAll', () => {
    it('returns all leaderboard entries ordered by score', async () => {
      const mockRows = [
        { id: 1, username: 'alice', score: 100 },
        { id: 2, username: 'bob', score: 80 },
        { id: 3, username: 'charlie', score: 50 }
      ];

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: mockRows });

      const result = await Leaderboard.getAll();

      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(Leaderboard);
      expect(result[0].username).toBe('alice');

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM leaderboard ORDER BY score DESC"
      );
    });
  });

  // -----------------------------

  describe('getOneById', () => {
    it('returns a single leaderboard entry', async () => {
      const mockRow = {
        id: 1,
        username: 'alice',
        score: 100
      };

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [mockRow] });

      const result = await Leaderboard.getOneById(1);

      expect(result).toBeInstanceOf(Leaderboard);
      expect(result.id).toBe(1);
      expect(result.username).toBe('alice');

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM leaderboard WHERE id = $1",
        [1]
      );
    });

    it('throws error if entry not found', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] });

      await expect(Leaderboard.getOneById(999))
        .rejects
        .toThrow('Unable to locate leaderboard entry.');
    });
  });

  // -----------------------------

  describe('add', () => {
    it('inserts and returns a new leaderboard entry', async () => {
      const mockRow = {
        id: 1,
        username: 'alice',
        score: 100
      };

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [mockRow] });

      const result = await Leaderboard.add('alice', 100);

      expect(result).toBeInstanceOf(Leaderboard);
      expect(result.username).toBe('alice');

      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO leaderboard (username, score) VALUES ($1, $2) RETURNING *",
        ['alice', 100]
      );
    });
  });

  // -----------------------------

  describe('update', () => {
    it('updates username and score', async () => {
      const existing = {
        id: 1,
        username: 'alice',
        score: 100
      };

      const updated = {
        id: 1,
        username: 'bob',
        score: 200
      };

      jest.spyOn(db, 'query')
        // getOneById call
        .mockResolvedValueOnce({ rows: [existing] })
        // update query
        .mockResolvedValueOnce({ rows: [updated] });

      const result = await Leaderboard.update(1, {
        username: 'bob',
        score: 200
      });

      expect(result.username).toBe('bob');
      expect(result.score).toBe(200);

      expect(db.query).toHaveBeenCalledTimes(2);
    });

    it('keeps existing values if not provided', async () => {
      const existing = {
        id: 1,
        username: 'alice',
        score: 100
      };

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [existing] }) // getOneById
        .mockResolvedValueOnce({ rows: [existing] }); // update

      const result = await Leaderboard.update(1, {});

      expect(result.username).toBe('alice');
      expect(result.score).toBe(100);
    });
  });

});
