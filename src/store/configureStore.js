import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import teamsReducer from '../reducers/teams';


export default () => {
    const store = createStore(
        combineReducers({
            teams: teamsReducer
        }),
        compose(applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
    store.subscribe(()=>{
        console.log(store.getState());
    })

    

    return store;
}
