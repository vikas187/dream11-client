import React from 'react';
import { connect } from 'react-redux';
import Match from './Matches';
import _ from 'lodash';
import axios from 'axios';




class MyMatches extends React.Component {
    // const Matches = [
    //     {id: 1, team1: 'RCB', team2: 'SRH', tournament: 'IPL'},
    //     {id: 2, team1: 'MI', team2: 'CSK', tournament: 'IPL'},
    //     {id: 3, team1: 'Spain', team2: 'Portugal', tournament: 'UEFA Nations League'},
    //     {id:4, team1: 'DC', team2: 'KKR', tournament: 'IPL'}
    // ];
    // const myMatches = Matches.filter((match)=> {
    //     if(_.find(props.teams, {"match_id": JSON.stringify(match.id)})) {
    //         return match;
    //     }
    // })
    constructor(props) {
        super(props);
        this.state = {
            myMatches: [],
        }
    }
    async componentDidMount() {
        const response = await axios.get("https://fantasy-league-server.herokuapp.com/matches/");
        if(response.status===200) {
            const myMatches = response.data.filter((match)=> {
                if(_.find(this.props.teams, {"match_id": match._id})) {
                    return match;
                }
            });
            this.setState({myMatches});
        }
        
    }
    render() {
        return (
            <div>
                <h2>My Matches</h2>
                <div className="matches-list">
                    {this.state.myMatches.map((match)=>{
                        return <Match key={match._id} {...match}/>
                    })}
                </div>
            </div>
            );
    }

};

const mapStateToProps = (state) =>(
    {
        teams: state.teams
    }
)

export default connect(mapStateToProps)(MyMatches);