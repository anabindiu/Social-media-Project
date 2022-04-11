import { applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import {sessionService} from 'redux-react-session';

const initState = {};
const middlewares = [thunk];

const store = createStore(rootReducer, initState, 
                            compose(applyMiddleware(...middlewares)));

sessionService.initSessionService(store);

export default store;



