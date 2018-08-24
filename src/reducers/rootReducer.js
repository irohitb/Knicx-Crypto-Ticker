import { combineReducers } from 'redux';
import cryptoReducer from './cryptoReducer';
import currencyReducer from './currencyReducer'

const rootReducer = combineReducers({
  posts: cryptoReducer,
  currency: currencyReducer
})

export default rootReducer
