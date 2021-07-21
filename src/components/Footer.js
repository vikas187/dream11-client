

import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';



const header = () => (
    <div className="footer">
        <NavLink className="footer-link" to="/" exact={true}><HomeIcon fontSize="large"/> <p className="footer-text">Home</p></NavLink>
        <NavLink className="footer-link" to='/mymatches'><SportsCricketIcon fontSize="large"/> <p className="footer-text">My Matches</p></NavLink>
        <NavLink className="footer-link" to="/profile"><PersonIcon fontSize="large"/> <p className="footer-text">Profile</p></NavLink>
        {/* <NavLink className="footer-link" to="/more"><MoreHorizIcon fontSize="large"/> <p className="footer-text">More</p></NavLink> */}
    </div>
)

export default header;