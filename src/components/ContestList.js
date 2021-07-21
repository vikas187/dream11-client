import React, {Fragment} from 'react';
import ContestItem from './ContestItem';
import PlayerList from './PlayersList';
import axios from 'axios';
import {axiosAuth} from '../utils/utils';
import TeamItem from './TeamItem';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import {connect} from 'react-redux';
import _ from 'lodash';

class ContestList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            match_id: props.match.params.id,
            contests: [],
            no_contest_msg: "You have not joined any contests for this match",
            no_team_msg: "You have not create any teams for this match"
        }
    }

    async componentDidMount(props) {
        try {
                const response = await axiosAuth('https://fantasy-league-server.herokuapp.com/contests');
                if(response.error) {
                    return;
                }
                console.log(response);
                const contests = response.data;
                this.setState({contests})
        } catch(ex) {
            console.log(ex.message);
        } 
    }

    render() {
        return (
            <Fragment>
            <Header/>
            <div className="contests">
            
            <div className="contest-buttons">
            <Link className="joinedBackground" to={`../mycontests/${this.state.match_id}`}>Joined Contests</Link>
            <Link className="joinedBackground" to={`../select-players/${this.state.match_id}`}>Create Team</Link>
            </div>
            
            <h2>Hot Contests</h2>   
                <div>
                {this.state.contests.map((contest)=>{
                    const joined = _.find(this.props.teams, {'contests': [contest._id], 'match_id': this.state.match_id});
                    return <ContestItem key={contest._id} joined={joined} {...contest} match_id={this.state.match_id}/>
                })}
                </div>
            <h2>My Contests</h2>
                <div >
                {this.state.contests.map((contest)=>{
                    const joined = _.find(this.props.teams, {'contests': [contest._id], 'match_id': this.state.match_id});
                    if(joined) {
                        this.state.no_contest_msg = "";
                        return <Link key={contest._id} to={`/contest-details/${this.state.match_id}/${contest._id}`} className="match-link"><ContestItem  joined={joined} {...contest} match_id={this.state.match_id}/></Link>
                    }    
                })}
                <p>{this.state.no_contest_msg}</p>
                </div>
            <h2>My Teams</h2>
                <div >
                {this.props.teams.filter((team)=>{
                    return team.match_id === this.state.match_id;
                }).map((team, index)=>{
                    this.state.no_team_msg = "";
                    return <TeamItem key={index} index={index+1} {...team}/>
                })}
                <p>{this.state.no_team_msg}</p>
                </div>
                
            </div>
            <Footer/>
            </Fragment>
        )
    }

}

const mapStateToProps = (state) => (
    {
        teams: state.teams
    }
)

export default connect(mapStateToProps)(ContestList);