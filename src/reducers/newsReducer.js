import {
    REDDIT_FETCHED,
    REDDIT_DATA_FAIL,
    REDDIT_FETCHING
} from './../actions/type.js';


const initialState = {
    DataFetching: false,
    DataSucess: [],
    DateError: []
  }
  

  export default function(state = initialState, action) {

    switch (action.type) {
      case REDDIT_FETCHING:
      return {
        ...state,
        DataFetching: true
      }
      case  REDDIT_FETCHED:
      return {
        ...state,
        DataSucess: action.payload,
        DataFetching: false
      }
      case REDDIT_DATA_FAIL:
      return {
        ...state,
        DateError: action.payload,
        DataFetching: false
        }
        default:
        return state
      }
    }
    