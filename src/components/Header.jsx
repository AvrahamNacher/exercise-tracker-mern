import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./navbar.component.jsx";
import ExercisesList from './exercises-list.component.jsx'
import EditExercise from './edit-exercise.component.jsx'
import CreateExercise from './create-exercise.component.jsx'
import CreateUser from './create-user.component.jsx'

import './Header.css';

import logo from '../logo.svg';

export default function Header () {
    return( <header>
        <img src={logo} className="Header-logo" alt="logo" />

        <Router>
            <div className="container">
                <Navbar /> 
                <br/>
                <Route path="/" exact component={ExercisesList} />
                <Route path="/edit" component={EditExercise} />
                <Route path="/create" component={CreateExercise} />
                <Route path="/user" component={CreateUser} />
            </div>
        </Router>
    </header>
    )
}
