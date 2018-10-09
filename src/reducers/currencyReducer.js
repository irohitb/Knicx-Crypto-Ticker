import {
  CURRENCY_RATE, 
  CURRENCY_FETCHING, 
  CURRENCY_ERROR,
  CURRENCY_INR,
  CURRENCY_IMAGE_STATE
} from './../actions/type.js';

const initialState = {
  DataFetching: false,
  DataSucess: [],
  DateError: [],
  DataINR: [],
  DataUpdate: true
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
  case CURRENCY_INR:
  return {
    ...state,
    DataINR: action.payload,
    DataFetching: false
  }
  case CURRENCY_ERROR:
  return {
    ...state,
    DateError: action.payload,
    DataFetching: false
    }
    case CURRENCY_IMAGE_STATE:
    return {
      ...state,
      DataUpdate: action.payload
    }
    default:
    return state
  }
}
