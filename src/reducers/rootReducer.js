import { combineReducers } from 'redux';
import coincapReducer from './coincapReducer';
import currencyReducer from './currencyReducer'

const rootReducer = combineReducers({
  coincap: coincapReducer,
  currency: currencyReducer
})

export default rootReducer
