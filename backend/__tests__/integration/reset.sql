DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS account;

-- Question Table
CREATE TABLE question (
    id INT GENERATED ALWAYS AS IDENTITY,
    question_number INT NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    points INT DEFAULT 1,
    PRIMARY KEY (id)
);

-- Answer Table
CREATE TABLE answer (
    id INT GENERATED ALWAYS AS IDENTITY,
    question_number INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    correct BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

-- Account Table
CREATE TABLE account (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'student',
    PRIMARY KEY (id)
);

-- Leaderboard Table
CREATE TABLE leaderboard (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (id)
);

-- Insert Questions
INSERT INTO question (question_number, question_text, category) VALUES

-- WW2
(1, 'In which year did World War II begin?', 'WW2'),
(2, 'Who was the leader of Nazi Germany during WW2?', 'WW2'),
(3, 'Which country invaded Poland in 1939?', 'WW2'),
(4, 'What event caused the United States to enter WW2?', 'WW2'),
(5, 'In which year did World War II end?', 'WW2'),

-- Tudor England
(6, 'Which king had six wives during Tudor England?', 'Tudor England'),
(7, 'How many wives did Henry VIII have?', 'Tudor England'),
(8, 'Who was Henry VIII''s first wife?', 'Tudor England'),
(9, 'Which wife of Henry VIII was executed?', 'Tudor England'),
(10, 'What church did Henry VIII establish?', 'Tudor England'),

-- Ancient Egypt
(11, 'Which river was essential to Ancient Egypt?', 'Ancient Egypt'),
(12, 'What was the title of ancient Egyptian rulers?', 'Ancient Egypt'),
(13, 'What structures were built as tombs for pharaohs?', 'Ancient Egypt'),
(14, 'Who was the Egyptian sun god?', 'Ancient Egypt'),
(15, 'What writing system did Ancient Egyptians use?', 'Ancient Egypt');

-- Insert Answers

-- WW2 Q1
INSERT INTO answer (question_number, option_text, correct) VALUES
(1, '1939', TRUE),
(1, '1914', FALSE),
(1, '1945', FALSE),
(1, '1929', FALSE);

-- WW2 Q2
INSERT INTO answer (question_number, option_text, correct) VALUES
(2, 'Adolf Hitler', TRUE),
(2, 'Joseph Stalin', FALSE),
(2, 'Winston Churchill', FALSE),
(2, 'Franklin D. Roosevelt', FALSE);

-- WW2 Q3
INSERT INTO answer (question_number, option_text, correct) VALUES
(3, 'Germany', TRUE),
(3, 'France', FALSE),
(3, 'Italy', FALSE),
(3, 'Spain', FALSE);

-- WW2 Q4
INSERT INTO answer (question_number, option_text, correct) VALUES
(4, 'Pearl Harbor', TRUE),
(4, 'D-Day', FALSE),
(4, 'Battle of Britain', FALSE),
(4, 'Stalingrad', FALSE);

-- WW2 Q5
INSERT INTO answer (question_number, option_text, correct) VALUES
(5, '1945', TRUE),
(5, '1942', FALSE),
(5, '1939', FALSE),
(5, '1950', FALSE);

-- Tudor England Q6
INSERT INTO answer (question_number, option_text, correct) VALUES
(6, 'Henry VIII', TRUE),
(6, 'Henry VII', FALSE),
(6, 'Edward VI', FALSE),
(6, 'James I', FALSE);

-- Tudor England Q7
INSERT INTO answer (question_number, option_text, correct) VALUES
(7, 'Six', TRUE),
(7, 'Three', FALSE),
(7, 'Four', FALSE),
(7, 'Five', FALSE);

-- Tudor England Q8
INSERT INTO answer (question_number, option_text, correct) VALUES
(8, 'Catherine of Aragon', TRUE),
(8, 'Anne Boleyn', FALSE),
(8, 'Jane Seymour', FALSE),
(8, 'Catherine Parr', FALSE);

-- Tudor England Q9
INSERT INTO answer (question_number, option_text, correct) VALUES
(9, 'Anne Boleyn', TRUE),
(9, 'Anne of Cleves', FALSE),
(9, 'Jane Seymour', FALSE),
(9, 'Catherine Howard', FALSE);

-- Tudor England Q10
INSERT INTO answer (question_number, option_text, correct) VALUES
(10, 'Church of England', TRUE),
(10, 'Catholic Church', FALSE),
(10, 'Lutheran Church', FALSE),
(10, 'Orthodox Church', FALSE);

-- Ancient Egypt Q11
INSERT INTO answer (question_number, option_text, correct) VALUES
(11, 'Nile River', TRUE),
(11, 'Amazon River', FALSE),
(11, 'Tigris River', FALSE),
(11, 'Indus River', FALSE);

-- Ancient Egypt Q12
INSERT INTO answer (question_number, option_text, correct) VALUES
(12, 'Pharaoh', TRUE),
(12, 'King', FALSE),
(12, 'Emperor', FALSE),
(12, 'Sultan', FALSE);

-- Ancient Egypt Q13
INSERT INTO answer (question_number, option_text, correct) VALUES
(13, 'Pyramids', TRUE),
(13, 'Castles', FALSE),
(13, 'Temples', FALSE),
(13, 'Forts', FALSE);

-- Ancient Egypt Q14
INSERT INTO answer (question_number, option_text, correct) VALUES
(14, 'Ra', TRUE),
(14, 'Zeus', FALSE),
(14, 'Odin', FALSE),
(14, 'Apollo', FALSE);

-- Ancient Egypt Q15
INSERT INTO answer (question_number, option_text, correct) VALUES
(15, 'Hieroglyphics', TRUE),
(15, 'Latin', FALSE),
(15, 'Greek', FALSE),
(15, 'Cuneiform', FALSE);

-- test data for leaderboard
INSERT INTO leaderboard (username, score) VALUES
('alice', 85),
('bob', 92),
('charlie', 78),
('diana', 95),
('edward', 88);

