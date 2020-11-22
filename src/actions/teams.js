//import {v4 as uuidv4} from 'uuid';
import axios from "axios";

export const addTeam = (id, players, match_id, contests) => {
    return {
        type: 'ADD_TEAM',
        
        team: {
            id,
            players,
            match_id,
            contests
        }
        
        
    }  
}

export const editTeam = (team_id, contest_id) => (
    {
        type: 'EDIT_TEAM',
        team_id,
        team: {
            contest_id
        }
    }
)

export const editPlayers = (team_id, players) => {
    return {
        type: 'EDIT_PLAYERS',
        team_id,
        updates: {
            players
        }
    }
}

export const removeContest = (team_id, contest_id) => {
    return {
        type: 'REMOVE_CONTEST',
        team_id,
        contest_id
    }
}

export async function fetchTeams(dispatch) {
    const response = await axios.get("http://127.0.0.1:8080/teams");
    if(response.status==200) {
        dispatch({ type: 'GET_TEAMS', payload: response.data })
    } 
}

export const startAddTeam = (players, match_id, contests) => {
    return async(dispatch) => {
        const response = await axios.post("http://127.0.0.1:8080/teams", {
            data: {
                players,
                match_id,
                contests
            }
        });
        if(response.status===201) {
            dispatch(addTeam(
                response.data,
                players,
                match_id, 
                contests
            ))
        }

    }
}

export const startEditTeam = (team_id, contest_id) => {
    return async(dispatch) => {
        const response = await axios.patch(`http://127.0.0.1:8080/teams/${team_id}`, {
            contest_id
        });
        if(response.status===201) {
            dispatch(editTeam(
                team_id, 
                contest_id
            ))
        }

    }
}

export const startRemoveContest = (team_id, contest_id) => {
    return async(dispatch) => {
        const response = await axios.patch(`http://127.0.0.1:8080/teams-remove/${team_id}`, {
            contest_id
        });
        if(response.status===201) {
            dispatch(removeContest(
                team_id, 
                contest_id
            ))
        }

    }
}

export const startEditPlayers = (team_id, players) => {
    return async(dispatch) => {
        const response = await axios.patch(`http://127.0.0.1:8080/teams-players/${team_id}`, {
            players
        });
        if(response.status===201) {
            dispatch(editPlayers(
                team_id, 
                players
            ))
        }

    }
}