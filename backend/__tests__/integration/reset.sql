TRUNCATE answer RESTART IDENTITY;
TRUNCATE question RESTART IDENTITY;

INSERT INTO question (question_number, question_text, category) VALUES
(1, 'Test question?', 'testcategory');

INSERT INTO answer (question_number, option_text, correct) VALUES
(1, 'answer1', TRUE),
(1, 'answer2', FALSE),
(1, 'answer3', FALSE);