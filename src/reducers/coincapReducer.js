import {
  CRYPTO_FETCHING, 
  CRYPTO_DATA_FAIL, 
  CRYPTO_FETCH_SUCESS, 
  UPDATE_CRYPTO_DATA, 
  GLOBAL_DATA,
  COIN_HISTORY,
  COIN_COMPLETE
} from '../actions/type.js';


const initialState = {
  itemsFetching: false,
  itemsSucess: [],
  itemsFail: [],
  itemGlobal: [],
  itemHistory: [], 
  itemComplete: []
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
      itemsFail: action.payload,
      itemsFetching: false
     }
      case UPDATE_CRYPTO_DATA:
      return {
      ...state,
      itemsSucess: action.payload
      }
      //GLOBAL_DATA
      case GLOBAL_DATA:
      return {
      ...state,
      itemGlobal: action.payload,
      itemsFetching: false
      }
      //History 
      case COIN_HISTORY:
      return {
      ...state,
      itemHistory: action.payload,
      itemsFetching: false
      }
      //Complete Info About Coin
      case COIN_COMPLETE:
      return {
        ...state,
        itemComplete: action.payload,
        itemsFetching: false
        }
      default:
        return state
    }
  }
