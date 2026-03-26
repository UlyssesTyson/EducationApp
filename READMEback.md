# History Game – Frontend

> Backend API and Database for the History Game project, providing authentication, quiz data, scoring, and leaderboard functionality.

## Overview

This is the server-side application for the History Game. It is responsible for:

- Handling user authentication (register/login)
- Serving quiz questions
- Processing and storing user scores
- Managing leaderboard rankings
- Connecting to the database

## Tech Stack

- Node.js
- Express.js
- JavaScript
- PostgreSQL via Supabase (database/auth integration)
- Jest (testing)

## Project Structure
## Project Structure

```
backend
│
├── index.js
├── app.js
│
├── controllers
│   ├── leaderboard.js
│   ├── question.js
│   └── user.js
│
├── models
│   ├── Leaderboard.js
│   ├── Question.js
│   └── User.js
│
├── routers
│   └── histories.js
│
├── db
│   ├── connect.js
│   ├── setup.js
│   └── histories.sql
│
├── __tests__
│   ├── integration
│   └── unit
│
└── coverage
```       

## API Endpoints

| Method | Endpoint       | Description                       |
| ------ | -------------- | ----------------------------------|
| GET    | `/questions`   | Fetch quiz questions              |
| POST   | `/login`       | Authenticate user                 |
| POST   | `/register`    | Create new user                   |
| GET    | `/leaderboard` | Fetch leaderboard data            |
| POST   | `/leaderboard` | Submit user score on leaderboard  |
| PATCH  | `/leaderboard` | Update user score on leaderboard  |

## Architecture

Architecture

The backend uses an MVC model, and is structured as such:

- Routes → Define API endpoints
- Controllers → Handle request/response logic
- Models → Interact with the database
- Database Layer → SQL + connection setup

## Authentification flow

1. User sends login/register request
2. Server validates credentials
3. Server returns success response once the token is checked
4. Frontend stores the token

## Getting started

### 1. Clone the repo

```bash
git clone <repo-url>
```

### 2. Install depenecies

```bash
npm install -y
npm cors express dotenv fs pg morgan jsonwebtoken bcrypt
npm i -D nodemon
```

### 3. Create .env file

```bash
PORT=3000
DATABASE_URL=<your_database_url>
DB_TEST_URL=<your_database_url>
SECRET_TOKEN=<a_secure_string_of_characters>
BCRYPT_SALT_ROUNDS=10
```

### 4. Run the server

```bash
npm start
```
This server will run on http://localhost:3000


### 5. Database set up

Create a database on Supabase or any PostgreSQL (the one for which you have the link in the env file).
Run the setup script.

```bash
node db/setup.js
```

### 5. Testing


```bash
npm run test
```

This covers:

- Unit tests: Models and logic
    - API endpoint responses
    - Database interactions
- Integration tests: Full request flow
    - Integration between layers

## Features

| Feature        | Description                          | Status      |
|----------------|--------------------------------------|-------------|
| Authentication | User login & registration            | Implemented |
| Quiz API       | Serve quiz questions                 | Implemented |
| Leaderboard    | Rank users by score                  | In Progress |
| Testing        | Unit & integration tests             | Implemented |

---

## Known Limitations

- Leaderboard needs to be connected to front end 

---

## Future Improvements

- More games and end points
- Better security 

---

## Developer Notes

- Maintain consistent naming conventions  
- Write tests alongside features  
- Keep routes RESTful and predictable
- Keep code efficient
