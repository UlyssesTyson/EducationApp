# Questry — Backend

A RESTful API built with Node.js and Express, serving quiz questions, handling user authentication, and managing leaderboard data for the Questry history game application.

---

## Installation & Usage

### Prerequisites

- Node.js
- A PostgreSQL database (Supabase recommended)

### Installation

1. Clone the repository and navigate to the project root:
```bash
git clone <repo-url>
cd questry
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root:
```
DB_URL=your_database_connection_string
SECRET_TOKEN=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
PORT=3000
```

4. Set up and seed the database:
```bash
npm setup-db
```

5. Start the server:
```bash
npm start
```

---

## Technologies

- Node.js
- Express.js
- PostgreSQL
- bcrypt (password hashing)
- JSON Web Tokens / jsonwebtoken (authentication)
- dotenv
- Morgan (logging)
- CORS
- Jest (testing)

---

## API Routes

### Auth

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| POST   | `/register` | Create a new user account |
| POST   | `/login`    | Log in and receive a JWT  |

### Questions

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| GET    | `/questions/home/:category` | Get all questions and answers by category |

Example categories: `Tudor England`, `Ancient Egypt`, `WW2`

### Leaderboard

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/leaderboard/home`    | Get all leaderboard entries         |
| POST   | `/leaderboard/home`    | Add a new leaderboard entry         |
| PATCH  | `/leaderboard/home/:id`| Update an existing leaderboard entry |

---

## Database Schema

```sql
-- Stores quiz questions
CREATE TABLE question (
    id INT GENERATED ALWAYS AS IDENTITY,
    question_number INT NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    points INT DEFAULT 1,
    PRIMARY KEY (id)
);

-- Stores answers linked to questions
CREATE TABLE answer (
    id INT GENERATED ALWAYS AS IDENTITY,
    question_number INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    correct BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

-- Stores user accounts
CREATE TABLE account (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'student',
    PRIMARY KEY (id)
);

-- Stores leaderboard scores
CREATE TABLE leaderboard (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (id)
);
```

---

## Process

- Started by designing the database schema with separate `question` and `answer` tables linked by `question_number`, allowing multiple answers per question.
- Built the `Question` model with a `getByCategoryWithAnswers` method that joins both tables and groups answers under each question.
- Built the `User` model and auth controller using bcrypt to hash passwords on registration and JWT to issue tokens on login.
- Built the `Leaderboard` model supporting get, add, and update operations, with scores returned in descending order.
- Set up Express routing with separate routers for auth, questions, and leaderboard, all mounted in `app.js`.
- Configured the app to serve the static frontend files as well as the API from the same Express server.

---

## Wins & Challenges

### Wins

- Clean MVC structure — controllers, models, and routers are clearly separated.
- The question/answer join query returns a well-structured nested response that the frontend can consume directly.
- Passwords are never stored in plain text — bcrypt salt rounds are configurable via environment variables.

### Challenges

- Joining `question` and `answer` tables and correctly grouping rows into nested objects required careful use of a map to avoid duplicate question entries.
- Ensuring the JWT secret and bcrypt rounds were correctly loaded from `.env` and not hardcoded.

---

## Bugs

- `User.getOneById` queries by `username` rather than `id`
- No middleware to verify JWT tokens on protected routes yet 

---

## Future Features

- JWT verification middleware to protect leaderboard POST/PATCH routes.
- Admin routes for teachers to manage questions and view all student scores.
- Endpoint to automatically post a leaderboard entry when a game is completed.
- Rate limiting on auth routes to prevent brute force attacks.