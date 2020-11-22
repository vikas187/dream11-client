import React from 'react';
import { connect } from 'react-redux';
import TeamItem from './TeamItem';
import { Link } from 'react-router-dom';

const ContestDetails = (props) => {
    const match_id = props.match.params.match_id;
    const contest_id = props.match.params.contest_id;
    return (
        <div>
            <h2>Contests Details</h2>
            <h2>Joined Teams</h2>
            {props.teams.map((team, index)=>{
                if(team.match_id === match_id && team.contests.includes(contest_id)) {
                    return <React.Fragment key={index}><Link  to={`/select-players/${match_id}/${contest_id}/${team._id}`} className="match-link"><TeamItem index={index+1} {...team}/></Link>
                    {props.teams.length>1 && <Link to={`/teamlist/${match_id}/${contest_id}/${team._id}`}>Switch Teams</Link>}</React.Fragment>
                }
            })}
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    teams: state.teams
});

export default connect(mapStateToProps)(ContestDetails);