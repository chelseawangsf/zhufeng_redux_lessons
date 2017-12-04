import {createStore,applyMiddleware} from '../redux';
import reducer from './reducers';
import logger from './redux-logger';
import thunk from './redux-thunk';
import promise from './redux-promise';
let store = applyMiddleware(promise,thunk,logger)(createStore)(reducer);
window.store = store;
export default  store;