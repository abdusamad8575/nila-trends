
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import storeReducer from './storeReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  userDetails: userReducer,
  storeDetails: storeReducer,
  order: orderReducer,
});

export default rootReducer;