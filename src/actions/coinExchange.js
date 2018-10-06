import axios from 'axios';

import {
    EXCHANGE_CURRENCY_FETCHING,
    EXCHANGE_CURRENCY_FETCH_SUCCESS,
    EXCHANGE_CURRENCY_FETCH_ERROR
} from "./type.js"
 import {
    multipleExchangeData,
    koinex,
    coinDelta
 } from "../urls.js"


export const exchangeToDisplay = (exchangURL) => {
    return function (dispatch) {
        dispatch({type: EXCHANGE_CURRENCY_FETCHING })
            // console.log(response)
            let koinexApi = axios.get(koinex)
            let coinDeltaApi = axios.get(coinDelta)
            let multipleExchangeDataApi = axios.get(multipleExchangeData + exchangURL + "-usd") 
            Promise.all([koinexApi, coinDeltaApi , multipleExchangeDataApi]).then(function(values) {
                return(
                    dispatch({
                        type: EXCHANGE_CURRENCY_FETCH_SUCCESS,
                        payload: values
                    })
                )   
            }).catch((error) => {
                return (
                    dispatch({
                        type: EXCHANGE_CURRENCY_FETCH_ERROR,
                        payload: error
                    })
                )
             })
    }
}

//Creating Multiple API call using Promise 
// export const multipleExchangeToDisplay = (crypto) => {
//     return function (dispatch) {
//         dispatch({type: EXCHANGE_CURRENCY_FETCHING })
//         let combineArray = []
//         let koinexApi = axios.get(koinex)
//         let coinDeltaApi = axios.get(coinDelta)
//         let multipleExchangeDataApi = axios.get(multipleExchangeData)
//         Promise.all([koinexApi, coinDeltaApi , multipleExchangeDataApi]).then(function(values) {
//             console.log(values);
//         });
//     }
// }

// // /export const fetchCoin = () => {
//   return function (dispatch) {
//     dispatch({type: CRYPTO_FETCHING}) 
//     axios.get(ApiCoinCap).then((response) => {
//     return(
//     dispatch({
//       type: CRYPTO_FETCH_SUCESS,
//       payload: response.data
//     })
//   )
//   }).catch((error) => {
//     return (
//   dispatch({
//       type: CRYPTO_DATA_FAIL,
//       payload: error.data
//     })
//   )
// })
//  }
// }