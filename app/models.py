from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    workouts = db.relationship("Workout", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Workout(db.Model, SerializerMixin):
    __tablename__ = "workouts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="workouts")
    workout_exercises = db.relationship("WorkoutExercise", back_populates="workout", cascade="all, delete-orphan")

    # ✅ Prevent recursive serialization
    serialize_rules = ('-user', '-workout_exercises.workout')


class Exercise(db.Model, SerializerMixin):
    __tablename__ = "exercises"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    created_by_user_id = db.Column(db.Integer, nullable=True)

    workout_exercises = db.relationship("WorkoutExercise", back_populates="exercise", cascade="all, delete-orphan")

    # Optional: prevent recursion if ever serializing exercises with their WEs
    serialize_rules = ('-workout_exercises.exercise',)


class WorkoutExercise(db.Model, SerializerMixin):
    __tablename__ = "workout_exercises"

    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    notes = db.Column(db.String, default=None)

    workout = db.relationship("Workout", back_populates="workout_exercises")
    exercise = db.relationship("Exercise", back_populates="workout_exercises")
    sets = db.relationship("Set", back_populates="workout_exercise", cascade="all, delete-orphan")

    # ✅ Prevent recursion and back refs
    serialize_rules = ('-workout', '-exercise.workout_exercises', '-sets.workout_exercise')


class Set(db.Model, SerializerMixin):
    __tablename__ = "sets"

    id = db.Column(db.Integer, primary_key=True)
    workout_exercise_id = db.Column(db.Integer, db.ForeignKey('workout_exercises.id'), nullable=False)
    reps = db.Column(db.Integer, default=0)
    weight = db.Column(db.Float, default=0)

    workout_exercise = db.relationship("WorkoutExercise", back_populates="sets")

    # ✅ Prevent back ref loop
    serialize_rules = ('-workout_exercise.sets',)
