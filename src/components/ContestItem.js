import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const ContestItem  = (props) => {
    const teams = props.teams.filter((team)=>{
        return team.match_id === props.match_id;
    });
    return (
        <div className="contest-icon">
            <div className="contest-details">
                <div className="contest-headers">
                    <p className="textGray">Prize Pool</p>
                    <p className="textGray">Entry</p>
                </div>
                <div className="contest-icon__header">
                    <h2 className="contest-price">&#8377; {props.price}</h2>

                    {!props.joined?
                        (teams.length>0 ? 
                        <Link className="joinButton" to={`../teamlist/${props.match_id}/${props._id}`}>&#8377; {props.entry}</Link>:
                        <Link className= "joinButton" to={`../select-players/${props.match_id}/${props._id}`}>&#8377; {props.entry}</Link>):
                        (<p>Joined</p>)
                    }
                
                </div>
            </div>
            
            <p className="textGray">{props.spots} spots</p>
            
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        teams: state.teams
    }
)

export default connect(mapStateToProps)(ContestItem);



