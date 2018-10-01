import { combineReducers } from 'redux';
import coincapReducer from './coincapReducer';
import currencyReducer from './currencyReducer'
import redditReducer from "./redditReducer"
import newsReducer from "./newsReducer.js"

const rootReducer = combineReducers({
  coincap: coincapReducer,
  currency: currencyReducer,
  redditNews: redditReducer,
  news: newsReducer
})

export default rootReducer
