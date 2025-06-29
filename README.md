# 🏋️‍♂️ RepCount

RepCount is a **full-stack workout tracker web app** that helps you log workouts, track exercise volume, visualize progress, and manage your fitness journey.

Built with:
- **Flask** (Python backend with SQLAlchemy ORM + JWT auth)
- **React** frontend (with Bootstrap & Chart.js)
- **SQLite** (local dev database; can swap for Postgres in production)
- JWT authentication to protect user data

---

## 📸 Screenshots

*(Add screenshots of your home page, log workout form, charts, etc.)*

---

## 🚀 Features

✅ User registration & login with secure JWT authentication  
✅ Log workouts with exercises & sets (reps & weight)  
✅ View workout history and details  
✅ Dynamic charts (e.g., total workout volume over time)  
✅ Filter & sort logged workouts  
✅ Clean, modern UI built with React & Bootstrap  
✅ RESTful API backend (Flask)  

---

## 🛠 Project Structure

```plaintext
Phase-4-Project/
├── app/                # Flask app
│   ├── models.py       # SQLAlchemy models
│   ├── auth.py         # Auth routes
│   ├── routes.py       # Workout, exercise & set routes
│   ├── auth_utils.py   # JWT helper functions
│   └── __init__.py     # (optional) init file
├── data/               # SQLite DB lives here
├── frontend/           # React frontend (with src/ inside)
│   ├── src/
│   │   ├── auth/       # Auth components (Login, Register, AuthContext)
│   │   ├── components/ # Shared components (Navbar, charts, etc.)
│   │   ├── pages/      # Page components
│   │   └── api/        # Axios setup & API helpers
├── main.py             # Entry point for Flask app
├── Pipfile / Pipfile.lock # Python dependencies
└── README.md
⚙️ Setup & Installation
Backend (Flask)
bash
Copy
Edit
# Install dependencies
pipenv install

# Activate virtualenv
pipenv shell

# Run the server
python main.py
Server runs by default on:
http://127.0.0.1:5000

Frontend (React)
bash
Copy
Edit
cd frontend
npm install

# Start Vite dev server (usually on http://127.0.0.1:5173)
npm run dev
🧪 Testing API with Postman
Use Postman or similar tool to test routes like:

POST /register – create user (username, email, password)

POST /login – login and get JWT

GET /me – pass JWT in Authorization: Bearer <token> to get current user

Workout & exercise CRUD routes

🔒 Authentication Flow
Users register or log in to receive JWT

JWT stored in localStorage (frontend)

Frontend includes token in headers for protected API calls

Backend verifies token on protected routes (/me, etc.)

📊 Charts & Visualizations
Total workout volume over time (WorkoutVolumeChart)

Reps vs weight (RepsVsWeightChart)

Data comes from joined tables (Workout, WorkoutExercise, Set)

✅ Roadmap / TODO
 Add profile page

 Enable editing/deleting exercises

 Social features (share workouts)

 Deploy backend & frontend

📦 Dependencies
Backend

Flask

Flask-SQLAlchemy

Flask-Bcrypt

PyJWT

Flask-CORS

SQLAlchemy-Serializer

Frontend

React

Axios

React Router DOM

Bootstrap

Chart.js

🧑‍💻 Author
Wade – Full Stack Software Engineer in the making (Python, JS, HTML+CSS, SQL, etc.)
Inspired by building tools for real-world fitness tracking.

⭐ Contributing
PRs & suggestions welcome! Please open an issue or contact directly.

📄 License
MIT License – use freely, learn, and build on top!

yaml
Copy
Edit

---

If you'd like, I can also:
- Add example API calls (with curl/Postman)
- Add deployment instructions (e.g., Render, Netlify, etc.)
- Generate a fancy badge header

Want me to do any of those? 🚀








Ask ChatGPT
