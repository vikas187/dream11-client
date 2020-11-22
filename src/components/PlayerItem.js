import React from 'react';

export default (props) => {
    return (
        <div className="player-icon">
            <h2>{props.name}</h2>
            <p>{props.team}</p>
            <p>{props.role}</p>
            {props.exist!==-1?
                <button className="add-button"  onClick={()=>{props.removePlayer(props._id)}}>Remove</button>:
                <button className="remove-button" disabled={props.length===2?'disabled':''} onClick={()=>{props.addPlayer({name: props.name, _id: props._id, team: props.team, role: props.role})}}>Add</button>
            }
        </div>
    )
}