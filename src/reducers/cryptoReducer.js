import {CRYPTO_FETCHING, CRYPTO_DATA_FAIL, CRYPTO_FETCH_SUCESS, UPDATE_CRYPTO_DATA} from './../actions/type.js';


const initialState = {
  itemsFetching: true,
  itemsSucess: [],
  itemsFail: [],
  itemsUpdate: []
}


export default function(state = initialState, action) {

  switch(action.type) {
      case CRYPTO_FETCHING:
      return {
        ...state,
        itemsFetching: true
      }
      case CRYPTO_FETCH_SUCESS:
      return {
        ...state,
        itemsSucess: action.payload,
        itemsFetching: false
      }
      case CRYPTO_DATA_FAIL:
      return {
      ...state,
      itemsFail: action.payload
     }
      case UPDATE_CRYPTO_DATA:
      return {
      ...state,
      itemsSucess: action.payload,
      itemsFetching: false
      }
      default:
        return state
    }
  }
//What is action, action.type
