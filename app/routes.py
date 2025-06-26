import os
from flask import Flask,make_response,request,jsonify
from app.models import db,User,Exercise,Workout,WorkoutExercise,Set
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173"])

basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
db_path = os.path.join(basedir, 'data', 'repcount.db')

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)




#============EXERCISE=============
@app.route('/exercises' ,methods = ['POST'])
def create_exercise():
    data = request.get_json()
    new_exercise = Exercise(
        name = data.get("name")
    )

    db.session.add(new_exercise)
    db.session.commit()

    return jsonify(new_exercise.to_dict()),201


@app.route('/exercises',methods = ['GET'])
def get_all_exercises():
    exercises = Exercise.query.all()
    exercises_list = [exercise.to_dict() for exercise in exercises]

    return jsonify(exercises_list),200


@app.route('/exercises/<int:id>',methods = ['GET'])
def get_exercise_by_id(id):
    exercise = Exercise.query.get(id).first()
    if not exercise:
        return jsonify({"error": "Exercise not found"}), 404

    return jsonify(exercise.to_dict()),200


@app.route('/exercises/<int:id>', methods=['PATCH'])
def update_exercise(id):
    exercise = Exercise.query.get(id)
    if not exercise:
        return jsonify({"error": "Exercise not found"}), 404

    data = request.get_json()
    exercise.name = data.get("name", exercise.name)

    db.session.commit()
    return jsonify(exercise.to_dict()), 200


@app.route('/exercises/<int:id>',methods = ['DELETE'])
def delete_exercise(id):
    exercise = Exercise.query.get(id).first()

    if exercise is None:
        return jsonify({"error": "Exercise not found"}), 404

    db.session.delete(exercise)
    db.session.commit()

    return jsonify({"success": True ,"message" : "Exercise deleted succesfully"}),200




# =============WORKOUT===============
@app.route('/workouts' ,methods = ['POST'])
def create_workout():
    data = request.get_json()

    if not data.get("user_id") or not data.get("date"):
        return jsonify({"error": "Missing required fields"}), 400
    
    new_workout = Workout(
        user_id = data.get("user_id"),
        date=datetime.fromisoformat(data.get('date'))
    )

    db.session.add(new_workout)
    db.session.commit()

    return jsonify(new_workout.to_dict()),201


@app.route('/workouts/<int:id>', methods=['PATCH'])
def update_workout(id):
    workout = Workout.query.get(id)
    if not workout:
        return jsonify({"error": "Workout not found"}), 404

    data = request.get_json()
    if "user_id" in data:
        workout.user_id = data["user_id"]
    if "date" in data:
        from datetime import datetime
        workout.date = datetime.fromisoformat(data["date"])

    db.session.commit()
    return jsonify(workout.to_dict()), 200


@app.route('/workouts/<int:id>', methods=['GET'])
def get_workout(id):
    workout = Workout.query.get(id)
    if workout is None:
        return jsonify({"error": "Workout not found"}), 404

    workout_data = workout.to_dict()
    workout_data["workout_exercises"] = []

    for we in workout.workout_exercises:
        we_data = we.to_dict()
        we_data["exercise"] = we.exercise.to_dict() if we.exercise else None
        we_data["sets"] = [s.to_dict() for s in we.sets]
        workout_data["workout_exercises"].append(we_data)

    return jsonify(workout_data), 200




#===========WORKOUTEXERCISE============
@app.route('/workout_exercises', methods=['POST'])
def create_workout_exercise():
    data = request.get_json()
    new_we = WorkoutExercise(
        workout_id=data.get('workout_id'),
        exercise_id=data.get('exercise_id'),
        notes=data.get('notes', '')
    )

    db.session.add(new_we)
    db.session.commit()

    return jsonify(new_we.to_dict()), 201


@app.route('/workout_exercises/<int:id>', methods=['GET'])
def get_workout_exercise(id):
    we = WorkoutExercise.query.get(id)
    if not we:
        return jsonify({"error": "WorkoutExercise not found"}), 404
    return jsonify(we.to_dict()), 200


@app.route('/workout_exercises/<int:id>', methods=['PATCH'])
def update_workout_exercise(id):
    we = WorkoutExercise.query.get(id)
    if not we:
        return jsonify({"error": "WorkoutExercise not found"}), 404

    data = request.get_json()
    we.notes = data.get("notes", we.notes)
    if "workout_id" in data:
        we.workout_id = data["workout_id"]
    if "exercise_id" in data:
        we.exercise_id = data["exercise_id"]

    db.session.commit()
    return jsonify(we.to_dict()), 200


@app.route('/workout_exercises/<int:id>', methods=['DELETE'])
def delete_workout_exercise(id):
    we = WorkoutExercise.query.get(id)
    if not we:
        return jsonify({"error": "WorkoutExercise not found"}), 404

    db.session.delete(we)
    db.session.commit()

    return jsonify({"success": True, "message": "WorkoutExercise deleted"}), 200




#===========SET============
@app.route('/sets', methods=['POST'])
def create_set():
    data = request.get_json()
    new_set = Set(
        workout_exercise_id=data.get('workout_exercise_id'),
        reps=data.get('reps'),
        weight=data.get('weight')
    )

    db.session.add(new_set)
    db.session.commit()

    return jsonify(new_set.to_dict()), 201


@app.route('/sets/<int:id>', methods=['GET'])
def get_set(id):
    s = Set.query.get(id)
    if not s:
        return jsonify({"error": "Set not found"}), 404
    return jsonify(s.to_dict()), 200


@app.route('/sets/<int:id>', methods=['PATCH'])
def update_set(id):
    s = Set.query.get(id)
    if not s:
        return jsonify({"error": "Set not found"}), 404

    data = request.get_json()
    if "reps" in data:
        s.reps = data["reps"]
    if "weight" in data:
        s.weight = data["weight"]

    db.session.commit()
    return jsonify(s.to_dict()), 200


@app.route('/sets/<int:id>', methods=['DELETE'])
def delete_set(id):
    s = Set.query.get(id)
    if not s:
        return jsonify({"error": "Set not found"}), 404

    db.session.delete(s)
    db.session.commit()

    return jsonify({"success": True, "message": "Set deleted"}), 200


