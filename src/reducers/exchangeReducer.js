import {
    EXCHANGE_CURRENCY_FETCHING,
    EXCHANGE_CURRENCY_FETCH_SUCCESS,
    EXCHANGE_CURRENCY_FETCH_ERROR
} from './../actions/type.js';

const initialState = {
    DataFetching: false,
    DataSucess: [],
    DateError: []
  }
  

  export default function(state = initialState, action) {

    switch (action.type) {
      case EXCHANGE_CURRENCY_FETCHING:
      return {
        ...state,
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
        DataFetching: false
        }
        default:
        return state
      }
    }