import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import '../../node_modules/react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

export default function EditExercise(props) {
    const [exercise, setExercise] = useState({
        username: '', // default to first user in 'users' array
        description: '',
        duration: 0,
        date: new Date()
    });

    const [users, setUsers] = useState([]);
    
    let id = 0;

    useEffect( () => {
        id = props.location.pathname.slice(6);  // since props.match.params.id is not working!!!

        axios.get(`http://localhost:5000/exercises/${id}`)
            .then( res => {
                console.log("data returned")
                console.log(res.data.username)
                // ({username}) = res.data
                setExercise({
                    username:res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                } )

            });
        axios.get("http://localhost:5000/users")
            .then( res => {
                if (res.data.length > 0) {
                    console.log("get from users done")
                    console.log(res.data)
                    setUsers( res.data.map( user => user.username))
                }
            })
    }, [])

    function onChangeValue(e) {
        const {id, value} = e.target;
        setExercise( prev => ({...prev, [id]: value}));
    }

    function onChangeDate(date) {
        setExercise( prev => ({...prev, date}));
    }

    function onSubmit(e) {
        e.preventDefault();
        window.location = "/"; // take user back to home page
        console.log("submitting");
        console.log(exercise);
        id = props.location.pathname.slice(6);  // recalculating AGAIN since id not captured in 'useEffect' !!!
        axios.post("http://localhost:5000/exercises/update/" + id, exercise)
            .then(res => console.log(res.data));

    }

    return(
        <div>
            <h3>Edit Exercise Log</h3>

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
                        {users.map( el => <option
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
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}