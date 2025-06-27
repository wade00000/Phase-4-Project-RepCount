from app.routes import app
from app.models import db,Exercise

def seed_exercises():
    global_exercises = [
        Exercise(name="Barbell Row", created_by_user_id=None),
        Exercise(name="Bench Press", created_by_user_id=None),
        Exercise(name="Bicep Curl", created_by_user_id=None),
        Exercise(name="Bulgarian Split Squat", created_by_user_id=None),
        Exercise(name="Deadlift", created_by_user_id=None),
        Exercise(name="Dumbbell Fly", created_by_user_id=None),
        Exercise(name="Dumbbell Shoulder Press", created_by_user_id=None),
        Exercise(name="Front Squat", created_by_user_id=None),
        Exercise(name="Incline Bench Press", created_by_user_id=None),
        Exercise(name="Lat Pulldown", created_by_user_id=None),
        Exercise(name="Leg Curl", created_by_user_id=None),
        Exercise(name="Leg Extension", created_by_user_id=None),
        Exercise(name="Lunge", created_by_user_id=None),
        Exercise(name="Overhead Press", created_by_user_id=None),
        Exercise(name="Pull-up", created_by_user_id=None),
        Exercise(name="Romanian Deadlift", created_by_user_id=None),
        Exercise(name="Seated Cable Row", created_by_user_id=None),
        Exercise(name="Squat", created_by_user_id=None),
        Exercise(name="Tricep Pushdown", created_by_user_id=None),
        Exercise(name="Walking Lunge", created_by_user_id=None)
    ]

    with app.app_context():
        db.session.bulk_save_objects(global_exercises)
        db.session.commit()
        print("✅ Global exercises seeded.")

if __name__ == "__main__":
    seed_exercises()
