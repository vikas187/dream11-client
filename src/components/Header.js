import React from 'react';
import { NavLink } from 'react-router-dom';


const header = () => (
    <header>
        <h1>Dream 11</h1>
        <NavLink to="/" exact={true}>Home</NavLink>
        <NavLink to='/mymatches'>My Matches</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/more">More</NavLink>
    </header>
)

export default header;

