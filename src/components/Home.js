import React, { Fragment } from 'react';
import Match from './Matches';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import {axiosAuth} from "../utils/utils";


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            Matches: []
        }
    }

    async componentDidMount(props) {
        try {
            const response = await axiosAuth("https://fantasy-league-server.herokuapp.com/matches/");
            if(response.error) {
                return;
            }
            if(response.data.autherror) {
                this.props.history.push("/login");
            }
            this.setState({Matches: response.data});
            
        } catch(ex) {
            console.log(ex.message);
        }
        
    }
    render() {
        return (
            <Fragment>
            <Header></Header>
            <div className="matches">
                <h3 className="matches-title">Upcoming Matches</h3>
                <div className="matches-list">
                    {this.state.Matches.map((match)=>{
                        return <Match key={match._id} {...match}/>
                    })}
                </div>   
            </div>
            <Footer/>
            </Fragment>
        )
    }
    
    
}

export default Home;