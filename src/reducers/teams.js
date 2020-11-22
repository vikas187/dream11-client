const teamsDefaultState = [];

export default (state=teamsDefaultState, action) => {
    switch(action.type) {
        case 'ADD_TEAM':
        return [
            ...state,
            action.team
        ]
   
        case 'EDIT_TEAM':
            return state.map((team)=>{
                if(team._id === action.team_id) {
                    const contests = team.contests;
                    contests.push(action.team.contest_id);
                    return {
                        ...team, 
                        contests
                    }
                } else {
                    return team;
                }
            });
        case 'EDIT_PLAYERS':
            return state.map((team)=>{
                if(team._id === action.team_id) {
                    return {
                        ...team,
                        ...action.updates
                    }
                } else {
                    return team;
                }
            });
        case 'REMOVE_CONTEST': 
            return state.map((team)=>{
                if(team._id === action.team_id) {
                    const contests = team.contests.filter((contest)=>{
                        return contest!=action.contest_id;
                    });
                    return {
                        ...team,
                        contests
                    }
                } else {
                    return team;
                }
            });
         case 'GET_TEAMS':
             return action.payload;
        default: 
            return state;
    }
}

