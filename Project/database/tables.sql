DROP TABLE IF EXISTS user_table CASCADE;
CREATE TABLE IF NOT EXISTS user_table (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(500) NOT NULL,
    pass_word VARCHAR(20) NOT NULL,
    email VARCHAR(50),
    supervisor_variable SMALLINT,
    game1_score BIGINT,
    game1_attempts BIGINT,
    game2_score BIGINT,
    game2_attempts BIGINT,
    game3_score BIGINT,
    game3_attempts BIGINT,
    reported_variable SMALLINT
);

DROP TABLE IF EXISTS game3_lvl1 CASCADE;
CREATE TABLE IF NOT EXISTS game3_lvl1 (
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(200),
    correctAns SMALLINT,
    choice1 BIGINT,
    choice2 BIGINT,
    choice3 BIGINT,
    choice4 BIGINT
);

DROP TABLE IF EXISTS game3_lvl2 CASCADE;
CREATE TABLE IF NOT EXISTS game3_lvl2 (
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(200),
    correctAns SMALLINT,
    choice1 BIGINT,
    choice2 BIGINT,
    choice3 BIGINT,
    choice4 BIGINT
);

DROP TABLE IF EXISTS game3_lvl3 CASCADE;
CREATE TABLE IF NOT EXISTS game3_lvl3 (
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(200),
    correctAns SMALLINT,
    choice1 BIGINT,
    choice2 BIGINT,
    choice3 BIGINT,
    choice4 BIGINT
);

DROP TABLE IF EXISTS game3_lvl4 CASCADE;
CREATE TABLE IF NOT EXISTS game3_lvl4 (
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(200),
    correctAns SMALLINT,
    choice1 BIGINT,
    choice2 BIGINT,
    choice3 BIGINT,
    choice4 BIGINT
);

DROP TABLE IF EXISTS game3_lvl5 CASCADE;
CREATE TABLE IF NOT EXISTS game3_lvl5 (
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(200),
    correctAns SMALLINT,
    choice1 BIGINT,
    choice2 BIGINT,
    choice3 BIGINT,
    choice4 BIGINT
);

/*
INSERT INTO game3_lvl1()
VALUES(1, 'If Jamie has three apples and gives two of them away, how many apples does she have?', 1, 1, 2, 3, 4),
(2, 'If Vix has five potions and he buys three more, how many potions does he have?', 8, 7, 8, 5, 4),
(3, 'If Jimmy needs seven pages of paper, and he has three now, how many pages does he need?', 4, 7, 3, 4, 8);

INSERT INTO game3_lvl2()
VALUES(1, 'Ash has one-hundred fifty one pocket monsters, but can only hold six at a time.  The pocket monsters he can’t hold are kept with the professor.  How many pocket monsters are being kept with the professor if Ash is carrying six pocket monsters?', 145, 6, 145, 151, 157),
(2, 'Kylie is taking 16 credits total this semester in college, if she decides to add another class that is four credits, how many credits will she be taking?', 20, 16, 12, 20, 4),
(3, 'Harry is supposed to take seven years of wizarding school, if he does not complete his last year, how many years will he have taken?', 6, 1, 6, 8, 7);

INSERT INTO game3_lvl3()
VALUES(1,'Max has three baskets, each filled with five apples.  How many apples does Max have?', 15, 15, 5, 8, 153),
(2, 'Ms. Dailey is a teacher and has three kids in her class.  If there are seven classes just like hers, how many students are at the school?', 21 37, 73, 21, 10),
(3, 'Chelsea has two rollerblades, each have four wheels, how many wheels does she have in total?', 8, 2, 4, 8, 6);

INSERT INTO game3_lvl4()
VALUES(1,'Susan has three bags full of baseballs.  There are fifteen baseballs in each bag.  How many Baseballs does Susan have in all three bags?', 45, 15, 25, 35, 45),
(2, 'Steve has three full stacks, each stack has 64 diamonds.  How many diamonds does Steve have in total?', 192, 193, 191, 192, 194),
(3, 'There are Seventy Seven pears in a basket, if there are two baskets how many pears are there?', 154, 1414, 154, 77, 2);

INSERT INTO game3_lvl5()
VALUES(1,'Max has twenty apples and four baskets.  If he wants to have an equal number of apples in each basket how many apples will there be in each basket?', 5, 5, 3, 6, 8),
(2,'Davis has twenty math problems to solve, if he solves four an hour, how many hours will it take for him to solve all of the math problems?', 5, 5, 3, 6, 8),
(3, 'If Riley’s wrestling record for the season is thirty wins and three losses, what is his win to loss ratio?', 10, 3, 10, 0.333, 0.1);
*/