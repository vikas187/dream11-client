import React from 'react';
import PlayerItem from './PlayerItem';
import axios from 'axios';
import {startAddTeam, startEditPlayers} from '../actions/teams';
import {connect} from 'react-redux';
import _ from 'lodash';

class PlayerList extends React.Component {
    

    constructor(props) {
        super(props);
        let players;
        if(props.match.params.team_id) {
            players = _.find(props.teams, {"_id": props.match.params.team_id, "match_id": props.match.params.id});
        }
        this.state = {
            allPlayers: [],
            selectedPlayers: players? players.players: [],
            match_id: props.match.params.id,
            contest_id: props.match.params.contest_id,
            team_id: props.match.params.team_id
        }
    }

    async componentDidMount() {
        const match = await axios.get("https://fantasy-league-server.herokuapp.com/matches/" + this.state.match_id);
        if(match.status===200) {
            const team1 = match.data[0].team1;
            const team2 = match.data[0].team2;
            const response = await axios.get(`https://fantasy-league-server.herokuapp.com/players/${team1}/${team2}`);
            if(response.status===200) {
                const allPlayers = response.data;
                this.setState({allPlayers})
            }
        }
        
        
    }
    

    addPlayer = (props) => {
        const selectedPlayers = this.state.selectedPlayers;
        selectedPlayers.push(props);
        this.setState(()=>{
            return {
                selectedPlayers
            }
        })
    }

    removePlayer = (id) => {
        const selectedPlayers = this.state.selectedPlayers.filter((player)=>{
            return player._id!==id;
        })
        this.setState(()=>{
            return {
                selectedPlayers
            }
        })
    }

    addTeam = () => {
        const contests = this.state.contest_id ? [this.state.contest_id] : [];
        if(this.state.team_id) {
            this.props.dispatch(startEditPlayers(this.state.team_id, this.state.selectedPlayers));
            this.props.history.push(`../../../contests/${this.state.match_id}`);
            return;
        }
        this.props.dispatch(startAddTeam(this.state.selectedPlayers, this.state.match_id, contests));
        if(this.state.contest_id) {
            this.props.history.push(`../../contests/${this.state.match_id}`);
        } else {
            this.props.history.push(`../contests/${this.state.match_id}`);
        }
        
    }

    // removePlayer = ()
    render() {
        return (
            <div className="players-div">
                <div className="players-list">
                    {this.state.allPlayers.map((player)=>{
                        const exist = this.state.selectedPlayers.findIndex((element)=>{
                            return element._id===player._id;
                        })
                        
                        return <PlayerItem key={player._id} {...player} exist={exist} length={this.state.selectedPlayers.length} addPlayer={this.addPlayer} removePlayer={this.removePlayer}/>
                    })}
                </div>
                <div>
                <h2>Selected Players</h2>
                {this.state.selectedPlayers.map((player)=>{
                    return <p key={player._id}>{player.name}</p>
                })}
                <button disabled={this.state.selectedPlayers.length!==2?'disabled':''} onClick={()=>{this.addTeam(this.state.selectedPlayers)}}>Save</button>
                </div>
            </div>
            
        )
    }
    
}

const mapStateToProps = (state) => ({
    teams: state.teams
})



export default connect(mapStateToProps)(PlayerList);