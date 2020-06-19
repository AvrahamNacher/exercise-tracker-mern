import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import '../../node_modules/react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
// import ".react-datepicker/dist/react-datepicker.css"
// import ExercisesList from './exercises-list.component';

export default function CreateExercises() {
    const [exercise, setExercise] = useState({
        username: '', // default to first user in 'users' array
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    });

    useEffect( () => {
        axios.get("http://localhost:5000/users")
            .then( res => {
                if (res.data.length > 0) {
                    setExercise( prev => ({...prev, username: res.data[0].username, users: res.data.map( user => user.username)}))
                }
            })
    }, [])

    function onChangeValue(e) {
        // const newDuration = e.target.value;
        const {id, value} = e.target;
        setExercise( prev => ({...prev, [id]: value}));
        console.log(exercise);
    }

    function onChangeDate(date) {
        setExercise( prev => ({...prev, date}));
    }

    function onSubmit(e) {
        e.preventDefault();
        window.location = "/"; // take user back to home page
        console.log("submitting");
        console.log(exercise);
        axios.post("http://localhost:5000/exercises/add", exercise)
            .then(res => console.log(res.data));

    }

    return(
        <div>
            CreateExercises here
            <h3>Create New Exercise Log</h3>
            {/* {console.log(exercise.users)} */}

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <select
                        required
                        id="username"
                        className="form-control"
                        value={exercise.username}
                        onChange={onChangeValue}>
                        {/* loop through all the 'users' to create the options */}
                        {exercise.users.map( el => <option
                            key={el}
                            value={el}>{el}</option>)};
                    </select>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text"
                            required
                            id="description"
                            className="form-control"
                            value={exercise.description}
                            onChange={onChangeValue}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes):</label>
                    <input
                        type="text"
                        id="duration"
                        className="form-control"
                        value={exercise.duration}
                        onChange={onChangeValue}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker 
                            selected={exercise.date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}