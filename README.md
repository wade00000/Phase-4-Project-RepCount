# 🏋️‍♂️ RepCount

[![Flask](https://img.shields.io/badge/backend-Flask-blue)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/frontend-React-blue)](https://react.dev/)
[![SQLite](https://img.shields.io/badge/database-SQLite-lightgrey)](https://www.sqlite.org/)

---

RepCount is a **full-stack workout tracker web app** that helps you log workouts, track exercise volume, visualize progress, and manage your fitness journey.

**Built with:**
- **Flask** (Python backend with SQLAlchemy ORM & JWT authentication)
- **React** frontend (Bootstrap & Chart.js for UI and charts)
- **SQLite** (local dev database; easily swappable for Postgres in production)

---



## 🚀 Features

- ✅ User registration & login (JWT authentication)
- ✅ Log workouts with exercises & sets (reps & weight)
- ✅ View workout history and details
- ✅ Dynamic charts (e.g., total workout volume over time)
- ✅ Filter & sort logged workouts
- ✅ Clean, modern UI (React & Bootstrap)
- ✅ RESTful API backend (Flask)

---

## 🛠 Project Structure

```plaintext
Phase-4-Project/
├── app/                # Flask app
│   ├── models.py       # SQLAlchemy models
│   ├── auth.py         # Auth routes
│   ├── routes.py       # Workout, exercise & set routes
│   ├── auth_utils.py   # JWT helper functions
│   └── __init__.py
├── data/               # SQLite DB
├── frontend/           # React frontend
│   └── src/
│       ├── auth/       # Auth components
│       ├── components/ # Shared components
│       ├── pages/      # Page components
│       └── api/        # Axios & API helpers
├── main.py             # Flask entry point
├── Pipfile / Pipfile.lock
└── README.md
```

---

## ⚙️ Setup & Installation

### Backend (Flask)

```bash
# Install dependencies
pipenv install

# Activate virtualenv
pipenv shell

# Run the server
python main.py

# Seed the database
python seed_exercises.py
```

Server runs at: [http://127.0.0.1:5000](http://127.0.0.1:5000)

### Frontend (React)

```bash
cd frontend
npm install

# Start Vite dev server (usually on http://127.0.0.1:5173)
npm run dev
```

---

## 🧪 Testing API with Postman

Use Postman or similar tool to test routes like:

- `POST /register` – create user (username, email, password)
- `POST /login` – login and get JWT
- `GET /me` – pass JWT in `Authorization: Bearer <token>` to get current user
- Workout & exercise CRUD routes

---

## 🔒 Authentication Flow

1. Users register or log in to receive JWT
2. JWT stored in localStorage (frontend)
3. Frontend includes token in headers for protected API calls
4. Backend verifies token on protected routes

---

## 📊 Charts & Visualizations

- Total workout volume over time (`WorkoutVolumeChart`)
- Reps vs weight (`RepsVsWeightChart`)
- Data comes from joined tables (Workout, WorkoutExercise, Set)

---

## 📦 Dependencies

**Backend**
- Flask
- Flask-SQLAlchemy
- Flask-Bcrypt
- PyJWT
- Flask-CORS
- SQLAlchemy-Serializer

**Frontend**
- React
- Axios
- React Router DOM
- Bootstrap
- Chart.js

---

## 🧑‍💻 Author

**Wade** – Full Stack Software Engineer in the making (Python, JS, HTML+CSS, SQL, etc.)  
Inspired by building tools for real-world fitness tracking.

---



