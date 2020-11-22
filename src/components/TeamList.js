import React, {useState} from 'react';
import { connect } from 'react-redux';
import TeamItem from './TeamItem';
import {startEditTeam} from '../actions/teams';
import {startRemoveContest} from '../actions/teams';
import {Link} from 'react-router-dom';

const TeamList = (props) => {
    const [checked_team, setTeam] = useState(null);

    const changeCheckbox = (event) => {
        if(event.target.checked) {
            setTeam(event.target.value);
        }
    }

    const joinTeam = () => {
        if(props.match.params.team_id) {
            if(props.match.params.team_id!==checked_team) {
                props.dispatch(startRemoveContest(props.match.params.team_id, props.match.params.contest_id));
            } 
        }
        props.dispatch(startEditTeam(checked_team, props.match.params.contest_id));
        if(props.match.params.team_id) {
            props.history.push(`../../../../contests/${props.match.params.match_id}`);
        } else {
            props.history.push(`../../../contests/${props.match.params.match_id}`);
        }
    }
    const teams = props.teams.filter((team)=>{
        return team.match_id === props.match.params.match_id;
    });
    return (
        <div>
        <Link to={`/select-players/${props.match.params.match_id}/${props.match.params.contest_id}`}>Create Team</Link>
        {teams.map((team, index)=>{
            return <div key={index}>
            {props.match.params.team_id && props.match.params.team_id === team._id && checked_team===null ? 
                <input value={team._id} type="radio" name="team" defaultChecked onClick={(event)=>{changeCheckbox(event)}}/>:
                <input value={team._id} type="radio" name="team" onClick={(event)=>{changeCheckbox(event)}}/>
            }
           
            <TeamItem index={index+1} {...team}/></div>
        })}
        {checked_team?
            <button onClick={()=>joinTeam()}>Join</button>:
            <button disabled onClick={()=>joinTeam()}>Join</button>
        }
        
        </div>
    )
}

const mapStateToProps = (state) => ({
    teams: state.teams
});

export default connect(mapStateToProps)(TeamList);