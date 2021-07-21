import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
        <div className="team-icon">
            <h2>{"Team " + props.index}</h2>
            <hr />
                <div className="team-links">
                <Link to={`/select-players/${props.match_id}/${props.contest_id}/${props._id}`} className="link">Edit</Link>
                </div>
        </div>
    )
}