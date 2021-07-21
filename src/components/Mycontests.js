import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {connect} from "react-redux";
import {axiosAuth} from "../utils/utils";
import ContestItem from "./ContestItem";
import { Fragment } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import _ from "lodash";


class Mycontests extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            myContests: [],
            match_id: props.match.params.match_id,
            message: ""
        }
    }

    async componentDidMount() {
        const response = await axiosAuth("https://fantasy-league-server.herokuapp.com/contests");
        if(response.error) {
            return;
        }
        console.log("response"+ response);
        console.log("data:" + response.data);
        const myContests = await response.data.filter((contest)=>{
            if(_.find(this.props.teams, {"contests": [contest._id], 'match_id': this.state.match_id})) {
                return contest;
            }
        });

        if(myContests.length === 0) {
            this.setState({
                message: "You have not joined any contest for this match"
            })
        }
        
        this.setState({
            myContests
        });
    }

    render() {
        return (
            <Fragment>
                <Header/>
                    <div className="contests">
                        <h2>My Contests</h2>
                        <div >
                            {this.state.myContests.map((contest)=>{
                                return <Link className="match-link" to={`/contest-details/${this.state.match_id}/${contest._id}`}><ContestItem joined={true} key={contest._id} {...contest}/></Link>
                            })}
                        </div>
                        <p className>{this.state.message}</p>
                    </div>
                <Footer/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => (
    {
        teams: state.teams
    }
)

export default connect(mapStateToProps)(Mycontests);