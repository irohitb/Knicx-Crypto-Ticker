import axios from 'axios';
import {CRYPTO_FETCHING, CRYPTO_DATA_FAIL, CRYPTO_FETCH_SUCESS, UPDATE_CRYPTO_DATA} from './type.js';
import {ApiCoinCap} from '../urls.js';



//Fetching an Error Hanling of Crypto Data
export const fetchCoin = () => {
  return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING}) 
    axios.get(ApiCoinCap).then((response) => {
    return(
    dispatch({
      type: CRYPTO_FETCH_SUCESS,
      payload: response.data
    })
  )
  }).catch((error) => {
    console.log(error)
    return (
  dispatch({
      type: CRYPTO_DATA_FAIL,
      payload: error.data
    })
  )})

  }
}

//Updating Cryto Data
export const updateCrypto = (updatedData) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CRYPTO_DATA,
      payload: updatedData
    })
  }
}

//https://exchangeratesapi.io/
