const questionController = require("../../../controllers/question");
const Question = require("../../../models/Question");

// Mock response methods
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn(() => ({
  json: mockJson,
  end: mockEnd
}));
const mockRes = { status: mockStatus };

describe("Question controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  // --- INDEX ---
  describe("index", () => {
    it("should return all questions with status 200", async () => {
      const questions = [
        { id: 1, text: "Question 1" },
        { id: 2, text: "Question 2" }
      ];
      jest.spyOn(Question, "getAll").mockResolvedValue(questions);

      await questionController.index(null, mockRes);

      expect(Question.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(questions);
    });

    it("should return 500 if getAll fails", async () => {
      jest.spyOn(Question, "getAll").mockRejectedValue(new Error("DB error"));

      await questionController.index(null, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  // --- SHOW ---
  describe("show", () => {
    it("should return questions for a category with status 200", async () => {
      const mockReq = { params: { category: "math" } };
      const categoryQuestions = [
        { id: 1, text: "Question 1", category: "math" },
        { id: 2, text: "Question 2", category: "math" }
      ];
      jest.spyOn(Question, "getByCategoryWithAnswers").mockResolvedValue(categoryQuestions);

      await questionController.show(mockReq, mockRes);

      expect(Question.getByCategoryWithAnswers).toHaveBeenCalledWith("math");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(categoryQuestions);
    });

    it("should return 404 if getByCategoryWithAnswers fails", async () => {
      const mockReq = { params: { category: "science" } };
      jest.spyOn(Question, "getByCategoryWithAnswers").mockRejectedValue(new Error("Not found"));

      await questionController.show(mockReq, mockRes);

      expect(Question.getByCategoryWithAnswers).toHaveBeenCalledWith("science");
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Not found" });
    });
  });
});