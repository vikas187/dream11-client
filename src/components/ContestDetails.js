import React, {Fragment} from 'react';

import Header from './Header';
import { connect } from 'react-redux';
import TeamItem from './TeamItem';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ContestDetails = (props) => {
    const match_id = props.match.params.match_id;
    const contest_id = props.match.params.contest_id;
    let team_index = 1;
    return (
        <Fragment>
        <Header/>
        <div className="contests">
            <h2>Contest Details</h2>
            <h2>Joined Teams</h2>
            {props.teams.map((team, index)=>{
                if(team.match_id === match_id && team.contests.includes(contest_id)) {
                return <React.Fragment key={index}><TeamItem index={team_index++} {...team}/>
                {props.teams.length>1 && <Link to={`/teamlist/${match_id}/${contest_id}/${team._id}`}>Switch Teams</Link>}</React.Fragment>
                }

            })}
            
        </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    teams: state.teams
});

export default connect(mapStateToProps)(ContestDetails);