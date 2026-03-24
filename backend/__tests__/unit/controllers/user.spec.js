const userController = require("../../../controllers/user");
const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Mock response methods
const mockJson = jest.fn();
const mockSend = jest.fn();
const mockStatus = jest.fn(() => ({
  json: mockJson,
  send: mockSend
}));
const mockRes = { status: mockStatus };

describe("User controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  // --- REGISTER ---
  describe("register", () => {
    const mockReq = { body: { username: "Alice", password: "password123" } };

    it("should create a new user and return status 201", async () => {
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
      jest.spyOn(User, "create").mockResolvedValue({ id: 1, username: "Alice" });

      await userController.register(mockReq, mockRes);

      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", "salt");
      expect(User.create).toHaveBeenCalledWith({ username: "Alice", password: "hashedPassword" });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith({ id: 1, username: "Alice" });
    });

    it("should return 400 if creation fails", async () => {
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
      jest.spyOn(User, "create").mockRejectedValue(new Error("DB error"));

      await userController.register(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  // --- LOGIN ---
  describe("login", () => {
    const mockReq = { body: { username: "Alice", password: "password123" } };

    it("should authenticate a user and return token", async () => {
      const mockUser = { username: "Alice", password: "hashedPassword" };
      jest.spyOn(User, "getOneByUsername").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwt, "sign").mockImplementation((payload, secret, options, callback) => {
        callback(null, "mockToken");
      });

      await userController.login(mockReq, mockRes);

      expect(User.getOneByUsername).toHaveBeenCalledWith("Alice");
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ success: true, token: "mockToken" });
    });

    it("should return 401 if user does not exist", async () => {
      jest.spyOn(User, "getOneByUsername").mockResolvedValue(null);

      await userController.login(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: "No user with this username" });
    });

    it("should return 401 if password does not match", async () => {
      const mockUser = { username: "Alice", password: "hashedPassword" };
      jest.spyOn(User, "getOneByUsername").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

      await userController.login(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: "User could not be authenticated" });
    });

    it("should return 401 if jwt.sign throws an error", async () => {
      const mockUser = { username: "Alice", password: "hashedPassword" };
      jest.spyOn(User, "getOneByUsername").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwt, "sign").mockImplementation((payload, secret, options, callback) => {
        callback(new Error("Token error"), null);
      });

      await userController.login(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: "Error in token generation" });
    });
  });
});