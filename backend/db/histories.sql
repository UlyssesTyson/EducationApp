DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS leaderboard;

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
(6, 'Henry VIII had a habit of divorcing his wives. Which powerful institution refused to allow the divorce to his first wife Catherine of Aragon?', 'Tudor England'),
(7, 'As Henry VIII queen, you would live in the royal palace. Which of these was Henry VIII favourite and most grand palace?', 'Tudor England'),
(8, 'You learnt quickly that Henry VIII had a terrible temper and decided if you want to keep your head, its best to stay on his good side. How many of his previous wives were executed on his orders?', 'Tudor England'),
(9, 'During a previous marriage, Henry VIII made himself the Supreme Head of a new church. To keep on his good side you became a member of this new church. What was this church called?', 'Tudor England'),
(10, 'Henry VIII was broke (so much for marrying rich eh?). To clear his debts he closed down monasteries across England and took their wealth. What is this event known as?', 'Tudor England'),

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
(6, 'The House of Commons', FALSE),
(6, 'The Catholic Church', TRUE),
(6, 'The Royal Navy', FALSE);

-- Tudor England Q7
INSERT INTO answer (question_number, option_text, correct) VALUES
(7, 'Hampton Court Palace', TRUE),
(7, 'Buckingham Palace', FALSE),
(7, 'Windsor Castle', FALSE);

-- Tudor England Q8
INSERT INTO answer (question_number, option_text, correct) VALUES
(8, '1', FALSE),
(8, '2', TRUE),
(8, '3', FALSE);

-- Tudor England Q9
INSERT INTO answer (question_number, option_text, correct) VALUES
(9, 'The Methodist Church', FALSE),
(9, 'The Lutheran Church', FALSE),
(9, 'The Church of England', TRUE);

-- Tudor England Q10
INSERT INTO answer (question_number, option_text, correct) VALUES
(10, 'The Great Fire', FALSE),
(10, 'The Dissolution of the Monasteries', TRUE),
(10, 'The Black Death', FALSE);

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