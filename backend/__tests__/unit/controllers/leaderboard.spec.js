const leaderboardController = require("../../../controllers/leaderboard");
const Leaderboard = require("../../../models/leaderboard");

// Mock response methods
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn(() => ({
  json: mockJson,
  end: mockEnd
}));
const mockRes = { status: mockStatus };

describe("Leaderboard controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  // --- INDEX ---
  describe("index", () => {
    it("should return leaderboard entries with status 200", async () => {
      const entries = [{ id: 1, username: "Alice", score: 100 }];
      jest.spyOn(Leaderboard, "getAll").mockResolvedValue(entries);

      await leaderboardController.index(null, mockRes);

      expect(Leaderboard.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(entries);
    });

    it("should return error on failure", async () => {
      jest.spyOn(Leaderboard, "getAll").mockRejectedValue(new Error("DB error"));

      await leaderboardController.index(null, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  // --- SHOW ---
  describe("show", () => {
    it("should return a leaderboard entry with status 200", async () => {
      const mockReq = { params: { id: "1" } };
      const entry = { id: 1, username: "Alice", score: 100 };
      jest.spyOn(Leaderboard, "getOneById").mockResolvedValue(entry);

      await leaderboardController.show(mockReq, mockRes);

      expect(Leaderboard.getOneById).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(entry);
    });

    it("should return error if entry not found", async () => {
      const mockReq = { params: { id: "1" } };
      jest.spyOn(Leaderboard, "getOneById").mockRejectedValue(new Error("Not found"));

      await leaderboardController.show(mockReq, mockRes);

      expect(Leaderboard.getOneById).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Not found" });
    });
  });

  // --- CREATE ---
  describe("create", () => {
    it("should create a new entry with status 201", async () => {
      const mockReq = { body: { username: "Alice", score: 150 } };
      const newEntry = { id: 1, username: "Alice", score: 150 };
      jest.spyOn(Leaderboard, "add").mockResolvedValue(newEntry);

      await leaderboardController.create(mockReq, mockRes);

      expect(Leaderboard.add).toHaveBeenCalledWith("Alice", 150);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(newEntry);
    });

    it("should return 400 if required fields are missing", async () => {
      const mockReq = { body: {} };

      await leaderboardController.create(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "Username and score are required" });
    });

    it("should return 500 if creation fails", async () => {
      const mockReq = { body: { username: "Alice", score: 150 } };
      jest.spyOn(Leaderboard, "add").mockRejectedValue(new Error("DB error"));

      await leaderboardController.create(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  // --- UPDATE ---
  describe("update", () => {
    it("should update a leaderboard entry and return status 200", async () => {
      const mockReq = { params: { id: "1" }, body: { username: "Alice", score: 150 } };
      const updatedEntry = { id: 1, username: "Alice", score: 150 };
      jest.spyOn(Leaderboard, "update").mockResolvedValue(updatedEntry);

      await leaderboardController.update(mockReq, mockRes);

      expect(Leaderboard.update).toHaveBeenCalledWith(1, { username: "Alice", score: 150 });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(updatedEntry);
    });

    it("should return 400 if no fields provided to update", async () => {
      const mockReq = { params: { id: "1" }, body: {} };

      await leaderboardController.update(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "Provide a username or score to update" });
    });

    it("should return 500 if update fails", async () => {
      const mockReq = { params: { id: "1" }, body: { username: "Alice", score: 150 } };
      jest.spyOn(Leaderboard, "update").mockRejectedValue(new Error("DB error"));

      await leaderboardController.update(mockReq, mockRes);

      expect(Leaderboard.update).toHaveBeenCalledWith(1, { username: "Alice", score: 150 });
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "DB error" });
    });
  });
});