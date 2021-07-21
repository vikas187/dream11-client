import React from 'react';
import Match from './Matches';
import axios from 'axios';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            Matches: []
        }
    }

    async componentDidMount() {
        const response = await axios.get("https://fantasy-league-server.herokuapp.com/matches/");
        if(response.status===200) {
            this.setState({Matches: response.data});
        }
    }
    render() {
        return (
            <div>
                <h2>Upcoming Matches</h2>
                <div className="matches-list">
                    {this.state.Matches.map((match)=>{
                        return <Match key={match._id} {...match}/>
                    })}
                </div>
                
                
            </div>
        )
    }
    
    
}

export default Home;