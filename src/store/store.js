import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import { game } from './reducers/game'
import { user } from './reducers/user'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
    gameModule: game,
    userModule: user
})


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk))) //Passing the reducer