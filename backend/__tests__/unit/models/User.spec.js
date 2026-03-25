const User = require('../../../models/User');
const db = require('../../../db/connect');

describe('User', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe('getOneByUsername', () => {

    it('resolves with a user', async () => {
      const mockUser = {
        user_id: 1,
        username: 'john',
        password: 'hashed',
        is_admin: false
      };

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [mockUser] });

      const user = await User.getOneByUsername('john');

      expect(user).toBeInstanceOf(User);
      expect(user.username).toBe('john');
      expect(user.id).toBe(1);

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM account WHERE username = $1",
        ['john']
      );
    });

    it('throws error if user not found', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] });

      await expect(User.getOneByUsername('nope'))
        .rejects
        .toThrow('Unable to locate user.');
    });

  });

  // --------------------------------------

  describe('getOneById', () => {

    it('resolves with a user', async () => {
      const mockUser = {
        user_id: 2,
        username: 'jane',
        password: 'hashed',
        is_admin: true
      };

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [mockUser] });

      const user = await User.getOneById('jane'); 

      expect(user.id).toBe(2);
      expect(user.isAdmin).toBe(true);
    });

  });

  // --------------------------------------

  describe('create', () => {

    it('creates user and returns full user', async () => {
      const input = {
        username: 'john',
        password: 'hashed',
        isAdmin: false
      };

      const inserted = {
        rows: [{ username: 'john' }]
      };

      const fetchedUser = {
        user_id: 1,
        username: 'john',
        password: 'hashed',
        is_admin: false
      };

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce(inserted)     
        .mockResolvedValueOnce({ rows: [fetchedUser] }); 

      const user = await User.create(input);

      expect(db.query).toHaveBeenCalledTimes(2);
      expect(user).toBeInstanceOf(User);
      expect(user.username).toBe('john');
    });

  });

});