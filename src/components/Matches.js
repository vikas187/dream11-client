import React from 'react';
import {Link} from 'react-router-dom';

class Match extends React.Component {
    render() {
        return (
            <Link to={`/contests/${this.props._id}`} className="match-link"><div className="match-icon">
            <p className="match-heading">{this.props.tournament}</p>
            <div className="match-icon__match">
            <h4>{this.props.team1}</h4>
            <p>vs</p>
            <h4>{this.props.team2}</h4>
            </div>
            </div>
            </Link>
        )
        
    }
}

export default Match;