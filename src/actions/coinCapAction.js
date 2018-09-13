import axios from 'axios';
import {
  CRYPTO_FETCHING, 
  CRYPTO_DATA_FAIL, 
  CRYPTO_FETCH_SUCESS, 
  UPDATE_CRYPTO_DATA, 
  GLOBAL_DATA,
  COIN_HISTORY,
  COIN_COMPLETE
  // COIN_CAP_1DAYS,
  // COIN_CAP_7DAYS,
  // COIN_CAP_30DAYS,
  // COIN_CAP_90DAYS,
  // COIN_CAP_180DAYS,
  // COIN_CAP_365DAYS
} from './type.js';
import {
  ApiCoinCap, 
  GlobalData,
  coinCapHistory,
  coinCapComplete
 } from '../urls.js';



//Fetching an Error Hanling of Crypto Data (of all coins)
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
    return (
  dispatch({
      type: CRYPTO_DATA_FAIL,
      payload: error.data
    })
  )
})
 }
}

//Fetching Global Data 
export const globalData = () => { 
  return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING}) 
      axios.get(GlobalData).then((response) => {
    return(
      dispatch({
        type: GLOBAL_DATA,
        payload: response.data
      })
    )
    }).catch((error) => {
      return (
    dispatch({
        type: CRYPTO_DATA_FAIL,
        payload: error.data
      })
    )
  })   
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





//Coin history 
export const coinHistory = (days, coinName) => {
    return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING}) 
    axios.get(coinCapHistory + days + "day/" + coinName).then(respone => {
      console.log(respone.data["price"][1][0])
      let coinHistoryV = []
      for (let i = 0; i<respone.data["price"].length; i++) {
        coinHistoryV.push({
            cHT :   respone.data["price"][1][0],
            cHTVU : respone.data["price"][i][1],
            cHTVF : "$" + respone.data["price"][i][1].toLocaleString(),
            no: i
        })
    }
      return (
          dispatch({
            type: COIN_HISTORY,
            payload: coinHistoryV
          })
        )
    }).catch((error) => {
      console.log("This is Error", error)
      return (
    dispatch({
        type: CRYPTO_DATA_FAIL,
        payload: error.data
      })
    )
    })   
  }
}

//Coin Complete 
export const coinComplete = (coinName) => {
  return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING}) 
    axios.get(coinCapComplete + coinName).then((respone) => {
      return (
        dispatch({
          type: COIN_COMPLETE,
          payload: respone.data
        })
      )
    }).catch((error) => {
      console.log("This is Error", error)
      return (
    dispatch({
        type: CRYPTO_DATA_FAIL,
        payload: error.data
      })
    )
    })   
  }
}


//Coin Complete Info 


// //7 Day history 
// export const SevenDayCoinHistory = (days, coinName) => {
  
// }

// //30 Day History 
// export const ThirtyDayCoinHistory = (coinName) => {
  
// }
// //90 Day History 
// export const NintyDayCoinHistory = (coinName) => {
  
// }
// //180 Day History 
// export const One80DayCoinHistory = (coinName) => {
  
// }
// //365 Day History 
// export const Three65DayCoinHistory = (coinName) => {
  
// }
