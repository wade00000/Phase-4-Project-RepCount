import React,{useState,useEffect} from "react"
import { getExercises } from "../api/exercises"
import { Form } from "react-router-dom";
import { createWorkout } from "../api/workouts";

function WorkoutLogger(){
    const [date, setDate] = useState("");
    const [availableExercises, setAvailableExercises] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([
        {
        exerciseId: "",
        notes: "",
        sets: [{ reps: "", weight: "" }]
        }
    ]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        if (!date) {
            alert("Please pick a date");
            return;
        }

        const workoutPayload = {
            user_id: 1, // placeholder for now
            date,
            workout_exercises: workoutExercises.map((we) => ({
            exercise_id: Number(we.exerciseId),
            notes: we.notes,
            sets: we.sets.map((s) => ({
                reps: Number(s.reps),
                weight: Number(s.weight),
            })),
            })),
        };

        try {
        const res = await createWorkout(workoutPayload);
        alert("Workout logged successfully!");
        
        } catch (err) {
        console.error("Error logging workout", err);
        alert("Something went wrong logging your workout.");
        }


    };


    useEffect(() => {
        const fetch = async () => {
            try {
            const res = await getExercises()
            setAvailableExercises(res.data)
            } catch (err) {
            console.error("Failed to fetch exercises")
            }
        }
        fetch()
    }, [])

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />
           {workoutExercises.map((we, index) => (
            
            <div key={index}>
                <select
                value={we.exerciseId}
                onChange={(e) => {
                    const updated = [...workoutExercises]
                    updated[index].exerciseId = e.target.value
                    setWorkoutExercises(updated)
                }}
                >
                <option value="">Select exercise</option>
                {availableExercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
                </select>

                <input
                type="text"
                placeholder="Notes"
                value={we.notes}
                onChange={(e) => {
                    const updated = [...workoutExercises]
                    updated[index].notes = e.target.value
                    setWorkoutExercises(updated)
                }}
                />

                
             {we.sets.map((set, sIdx) => (
                    
                <div key={sIdx}>

                    <input
                        type="number"
                        placeholder="Reps"
                        value={set.reps}
                        onChange={(e) => {
                            const updated = [...workoutExercises]
                            updated[index].sets[sIdx].reps = e.target.value
                            setWorkoutExercises(updated)
                        }}
                        
                    />
                    <input
                        type="number"
                        placeholder="Weight"
                        value={set.weight}
                        onChange={(e) => {
                            const updated = [...workoutExercises]
                            updated[index].sets[sIdx].weight = e.target.value
                            setWorkoutExercises(updated)
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            const updated = [...workoutExercises];
                            updated[index].sets.push({ reps: "", weight: "" });
                            setWorkoutExercises(updated);
                        }}
                        >
                        Add Set
                    </button>

                </div>
            ))}
            </div>
))}

            <button
            type="button"
            onClick={() =>
                setWorkoutExercises([
                ...workoutExercises,
                { exerciseId: "", notes: "", sets: [{ reps: "", weight: "" }] }
                ])
            }
            >
            Add Another Exercise
            </button>

            <button type="submit">Add Workout</button>
        </form>
    )



    

}

export default WorkoutLogger;
   