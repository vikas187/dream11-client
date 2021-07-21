import React from 'react';
import { NavLink } from 'react-router-dom';


const header = () => (
    <header className="header">
        <NavLink className="header-link" to="/"><h1 className="header__title">Dream 11</h1></NavLink>
    </header>
)

export default header;

