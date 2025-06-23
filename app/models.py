#models.py
from database import Base
from sqlalchemy import Column,Integer,String,ForeignKey,Date,Float
from sqlalchemy.orm import relationship
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key = True)
    username = Column(String,unique = True,nullable=False)

    workouts = relationship("Workout",back_populates = "user")



class Workout(Base):
    __tablename__ = "workouts"

    id = Column(Integer,primary_key=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    date = Column(Date,default=datetime.utcnow)

    user = relationship("User",back_populates = "workouts")
    workout_exercises = relationship("WorkoutExercise",back_populates="workout")



class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer,primary_key=True)
    name = Column(String,unique=True)

    workout_exercises = relationship("WorkoutExercise",back_populates="exercise")



class WorkoutExercise(Base):
    __tablename__ = "workout_exercises"

    id = Column(Integer,primary_key=True)
    workout_id = Column(Integer,ForeignKey('workouts.id'))
    exercise_id = Column(Integer,ForeignKey('exercises.id'))
    notes = Column(String)

    workout = relationship("Workout",back_populates="workout_exercises")
    exercise = relationship("Exercise",back_populates="workout_exercises")
    sets = relationship("Set",back_populates="workout_exercise")



class Set(Base):
    __tablename__ = "sets"

    id = Column(Integer,primary_key=True)
    workout_exercise_id = Column(Integer,ForeignKey('workout_exercises.id'))
    reps = Column(Integer,default = 0)
    weight = Column(Float,default = 0)

    workout_exercise = relationship("WorkoutExercise",back_populates="sets")

