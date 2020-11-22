import React from 'react';
import ContestItem from './ContestItem';
import PlayerList from './PlayersList';
import axios from 'axios';
import TeamItem from './TeamItem';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import _ from 'lodash';

class ContestList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            match_id: props.match.params.id,
            contests: []
        }
    }

    async componentDidMount() {
        const response = await axios.get('http://127.0.0.1:8080/contests');
        if(response.status===200) {
            const contests = response.data;
            this.setState({contests})
        }
        
    }

    render() {
        return (
            <div>
            <Link to={`../select-players/${this.state.match_id}`}>Create Team</Link>
            <h2>Contests</h2>   
                <div className="contests">
                {this.state.contests.map((contest)=>{
                    const joined = _.find(this.props.teams, {'contests': [contest._id], 'match_id': this.state.match_id});
                    return <ContestItem key={contest._id} joined={joined} {...contest} match_id={this.state.match_id}/>
                })}
                </div>
            <h2>My Contests</h2>
                <div className="contests">
                {this.state.contests.map((contest)=>{
                    const joined = _.find(this.props.teams, {'contests': [contest._id], 'match_id': this.state.match_id});
                    if(joined) {
                        return <Link key={contest._id} to={`/contest-details/${this.state.match_id}/${contest._id}`} className="match-link"><ContestItem  joined={joined} {...contest} match_id={this.state.match_id}/></Link>
                    }    
                })}
                </div>
            <h2>My Teams</h2>
                <div className="teams">
                {this.props.teams.filter((team)=>{
                    return team.match_id === this.state.match_id;
                }).map((team, index)=>{
                    return <TeamItem key={index} index={index+1} {...team}/>
                })}
                </div>
                
            </div>
        )
    }

}

const mapStateToProps = (state) => (
    {
        teams: state.teams
    }
)

export default connect(mapStateToProps)(ContestList);