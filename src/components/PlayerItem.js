import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

export default (props) => {
    return (
        <div className={"player-icon" + (props.exist!==-1 ? " selected" : (props.length==11? " disabled": ""))}>
            <p className="player-title">{props.name}</p>
            {props.exist!==-1?
                <span className="remove-button"  onClick={()=>{props.removePlayer(props._id)}}><RemoveCircleOutlineIcon fontSize="large" color="primary"/></span>:
                <span className="add-button"  onClick={()=>{props.addPlayer({name: props.name, _id: props._id, team: props.team, role: props.role})}}><AddCircleOutlineIcon fontSize="large" color="primary"/></span>
            }
        </div>
    )
}