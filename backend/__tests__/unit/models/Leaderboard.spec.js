const Leaderboard = require('../../../models/leaderboard')
const db = require('../../../db/connect')

  describe ('getAll', () => {
    it('resolves with goats on successful db query', async () => {
      // Arrange
      const mockLeaderboard = [
        { id: 1, username: 'u1', score: 1 },
        { id: 2, username: 'u2', score: 2 },
        { id: 3, username: 'u3', score: 3 },
      ];
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockLeaderboard });

      // Act
      const leaderboard = await Leaderboard.getAll();

      // Assert
      expect(leaderboard).toHaveLength(3);
      expect(leaderboard[0]).toHaveProperty('id');
      expect(leaderboard[0].username).toBe('u1');
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM leaderboard ORDER BY score DESC");
    });

    it('should return an empty array if the table is empty', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(Leaderboard.getAll()).resolves.toEqual([]);
    });

    describe('getOneById', () => {
        it('should retrieve a single user on sucsessful query', async () => {
            // Arrange
    const mockLeaderboard = [
        { id: 1, username: 'u1', score: 1 },
    ];
    jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockLeaderboard })

    const user = await Leaderboard.getOneById(1)
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('u1');
    expect(db.query).toHaveBeenCalledWith("SELECT * FROM leaderboard WHERE id = $1", [1]);

        })
    })
  })