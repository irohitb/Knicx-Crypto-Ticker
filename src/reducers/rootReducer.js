import { combineReducers } from 'redux';
import coincapReducer from './coincapReducer';
import currencyReducer from './currencyReducer'
import newsReducer from "./newsReducer"

const rootReducer = combineReducers({
  coincap: coincapReducer,
  currency: currencyReducer,
  news: newsReducer,
})

export default rootReducer
