import {
  CURRENCY_RATE, 
  CURRENCY_FETCHING, 
  CURRENCY_ERROR
} from './../actions/type.js';

const initialState = {
  DataFetching: false,
  DataSucess: [],
  DateError: []
}

export default function(state = initialState, action) {

switch (action.type) {
  case CURRENCY_FETCHING:
  return {
    ...state,
    DataFetching: true
  }
  case CURRENCY_RATE:
  return {
    ...state,
    DataSucess: action.payload,
    DataFetching: false
  }
  case CURRENCY_ERROR:
  return {
    ...state,
    DateError: action.payload,
    DataFetching: false
    }
    default:
    return state
  }
}
