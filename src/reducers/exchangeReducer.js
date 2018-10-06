import {
    EXCHANGE_CURRENCY_FETCHING,
    EXCHANGE_CURRENCY_FETCH_SUCCESS,
    EXCHANGE_CURRENCY_FETCH_ERROR
} from './../actions/type.js';

const initialState = {
    DataFetching: true,
    DataSucess: [],
    DateError: [],
    DateError: false, 
    DataSort: true
  }
  

  export default function(state = initialState, action) {

    switch (action.type) {
      case EXCHANGE_CURRENCY_FETCHING:
      return {
        DataFetching: true,
        DataSort: true
      }
      case EXCHANGE_CURRENCY_FETCH_SUCCESS:
      return {
        ...state,
        DataSucess: action.payload,
        DataFetching: false,
        DataSort: false
      }
      case EXCHANGE_CURRENCY_FETCH_ERROR:
      return {
        ...state,
        DateError: action.payload,
        DataFetching: true,
        DateError: true,
        DataSort: true
        }
        default:
        return state
      }
    }