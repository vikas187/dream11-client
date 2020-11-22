import React from 'react';

export default (props) => {
    return (
        <div className="team-icon">
            <h2>{"Team " + props.index}</h2>
            {props.players.map((player)=>{
                return <p key={player._id}>{player.name}</p>
            })}
        </div>
    )
}