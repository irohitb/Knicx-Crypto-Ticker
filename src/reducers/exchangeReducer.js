import {
    EXCHANGE_CURRENCY_FETCHING,
    EXCHANGE_CURRENCY_FETCH_SUCCESS,
    EXCHANGE_CURRENCY_FETCH_ERROR
} from './../actions/type.js';

const initialState = {
    DataFetching: true,
    DataSucess: [],
    DateError: [],
    DateError: false
  }
  

  export default function(state = initialState, action) {

    switch (action.type) {
      case EXCHANGE_CURRENCY_FETCHING:
      return {
        DataFetching: true
      }
      case EXCHANGE_CURRENCY_FETCH_SUCCESS:
      return {
        ...state,
        DataSucess: action.payload,
        DataFetching: false
      }
      case EXCHANGE_CURRENCY_FETCH_ERROR:
      return {
        ...state,
        DateError: action.payload,
        DataFetching: true,
        DateError: true
        }
        default:
        return state
      }
    }