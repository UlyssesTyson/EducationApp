# History Game – Frontend

> Frontend client for the History Game project, designed to improve student engagement in non-STEM subjects through interactive quizzes and gamification.

---

## Overview

This is the **client-side application** for the History Game. It allows users to:

* Register and log in
* Play history quizzes
* View scores and leaderboard rankings
* Track progress through the game

The frontend communicates with a backend API to fetch questions, submit answers, and manage user authentication.

---

## Tech Stack

* HTML
* CSS
* JavaScript 
* Fetch API (for backend communication)
* Jest (for testing)
* Supabase

---

## Project Structure

```
frontend/
├── index.html
├── /pages
│   ├── index.html
│   ├── home-page.html
│   ├── game-topic-1.html
│   └── game-topic-2.html
├── /js
│   ├── home-page.js
│   ├── index.js
│   ├── game-topic-1.js
│   └── game-topic-2.js
├── /css
│   ├── global.css
│   ├── index.css
│   ├── game-topic-1.css
│   └── game-topic-2.css
│   └── home-page.css
├── /__tests__
│   ├── home-page.test.js
│   ├── index.test.js
│   ├── game-topic-1.test.js
│   └── game-topic-2.test.js
└── 
```

---

## API Integration

[THE CURRENT ENDPOINTS ARE PLACEHOLDERS] The frontend communicates with the backend via the following endpoints:

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| GET    | `/questions`   | Fetch quiz questions   |
| POST   | `/login`       | Authenticate user      |
| POST   | `/register`    | Create new user        |
| GET    | `/leaderboard` | Fetch leaderboard data |
| POST   | `/score`       | Submit user score      |

---

## Authentication Flow

1. User submits login/register form
2. Request sent to backend
3. Backend returns token (or success response)
4. Token stored in `localStorage`
5. Token used for protected routes

---

## Getting Started

### 1. Clone the repo

```
git clone <repo-url>
cd frontend
```

---

### 2. Run locally

Since this is a static frontend:

```
open index.html
```

Or use a live server:

```

---

### 3. Connect to backend

Ensure backend is running:

```
http://localhost:3000
```

Update API base URL in:

```js
// scripts/app.js
const BASE_URL = "http://localhost:3000";
```

---

## Testing

Run tests using Jest:

```
npm install
npm run test
```

### Test Coverage Includes:

* Authentication logic
* Redirect behaviour
* API request handling

---

## Features

| Feature        | Description                            | Status      |
| -------------- | -------------------------------------- | ----------- |
| Authentication | Login & registration forms             | In Progress |
| Quiz Gameplay  | Multiple choice questions              | In Progress |
| Leaderboard    | Displays top scores                    | Not Started |
| Redirect Logic | Route protection based on login status | In Progress |

---

## Known Limitations

* No full error handling yet
* Accessibility improvements needed
* Leaderboard integration pending
* Auth currently uses basic token storage (not fully secure)

---

## Accessibility (Planned)

* Improved color contrast
* Keyboard navigation
* Screen reader support
* Optional audio narration

---

## Team Responsibilities

| Role            | Responsibility                       |
| --------------- | ------------------------------------ |
| Frontend Devs   | UI, API integration, user experience |
| Backend Devs    | API endpoints, authentication, data  |
| Project Manager | Coordination, documentation, testing |

---

## Future Improvements

* Gamification (badges, streaks)
* Difficulty levels
* Progress tracking dashboard
* Mobile responsiveness
* Animations for engagement

---

## Developer Notes

* Keep API calls centralized in `app.js`
* Avoid hardcoding data — always use API
* Use consistent naming conventions
* Test components before integration

---

