
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import storeReducer from './storeReducer';

const rootReducer = combineReducers({
  userDetails: userReducer,
  storeDetails: storeReducer,
});

export default rootReducer;