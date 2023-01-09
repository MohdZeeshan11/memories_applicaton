import { createStore } from 'redux';
import rootReducer from './reducers/index';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';


// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const store = createStore(rootReducer);

export default store;