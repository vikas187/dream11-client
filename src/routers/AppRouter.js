import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../components/Home';
import MyMatches from '../components/Mymatches';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Profile from '../components/Profile';
import More from '../components/More';
import ContestList from '../components/ContestList';
import ContestDetails from '../components/ContestDetails';
import PlayersList from '../components/PlayersList';
import TeamList from '../components/TeamList';
import Mycontests from '../components/Mycontests';

const AppRouter = () => {
    return (
        <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} exact={true}></Route>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/mymatches" component={MyMatches}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/more" component={More}></Route>
                    <Route path="/contests/:id" component={ContestList}></Route>
                    <Route path="/select-players/:id/:contest_id/:team_id" component={PlayersList} ></Route>
                    <Route path="/select-players/:id/:contest_id" component={PlayersList} ></Route>
                    <Route path="/select-players/:id/" component={PlayersList} ></Route>
                    <Route path="/teamlist/:match_id/:contest_id/:team_id" component={TeamList} ></Route>
                    <Route path="/teamlist/:match_id/:contest_id" component={TeamList} ></Route>
                    <Route path="/contest-details/:match_id/:contest_id" component={ContestDetails}></Route>
                    <Route path="/mycontests/:match_id" component={Mycontests}></Route>
                </Switch>
            <div className="bgImage"></div>
        </BrowserRouter>
        
    )
}

export default AppRouter;