import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUser() {
    const [newUser, setNewUser] = useState("");

    function onChangeUserName(e) {
        const newUser = e.target.value;
        setNewUser(newUser);
    }

    function onSubmit(e) {
        e.preventDefault();
        // console.log(newUser);
        const user = {
            username: newUser
        }
        // console.log(user);
        axios.post('http://localhost:5000/users/add', user)
            .then(res => /* console.log(res.data) */null );
        setNewUser("");
    }

    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>User Name:</label>
                    <input 
                        type="text"
                        required
                        className="form-control"
                        onChange={onChangeUserName}
                        value={newUser}
                        />
                </div>
                <div>
                    <input type="submit" value="Create User" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}