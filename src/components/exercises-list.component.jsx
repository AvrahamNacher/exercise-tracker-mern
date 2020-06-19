import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Exercise from './Exercise-component';

export default function ExercisesList() {
    const [ exerciseList, setExerciseList ] = useState([]);

    useEffect( () => {
        axios.get("http://localhost:5000/exercises/")
            .then( res => {
                if (res.data.length > 0) {
                    setExerciseList(res.data);
                }
            })
            .catch (err => console.log("Error: " + err));
    },[])

    function deleteExercise(id) {
        console.log ("deleting id "+ id)
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data))
        setExerciseList( exerciseList.filter(el => el._id !== id));
    }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table table-dark">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList.map(el => <Exercise 
                        key={el._id} 
                        exercise={el} 
                        deleteExercise={deleteExercise}
                    />)}
                </tbody>
            </table>
        </div>
    )
}