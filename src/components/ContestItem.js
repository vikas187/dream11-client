import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const ContestItem  = (props) => {
    const teams = props.teams.filter((team)=>{
        return team.match_id === props.match_id;
    });
    return (
        <div className="contest-icon">
            <div className="contest-icon__header">
            <h2>{props.price}</h2>
            <h2>{props.entry}</h2>
            </div>
            <p>{props.spots} spots</p>
            {!props.joined?
                (teams.length>0 ? 
                <Link to={`../teamlist/${props.match_id}/${props._id}`}>Join</Link>:
                <Link to={`../select-players/${props.match_id}/${props._id}`}>Join</Link>):
                (<p>Joined</p>)
            
            }
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        teams: state.teams
    }
)

export default connect(mapStateToProps)(ContestItem);



