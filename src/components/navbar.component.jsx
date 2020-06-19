import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
    return ( 
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExerTracker</Link>
        <div className="navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Exercises</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Exercise Log</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">Create User</Link>
                </li>
            </ul>

        </div>
    </nav>
    )

}