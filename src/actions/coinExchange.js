import axios from 'axios';

import {
    EXCHANGE_CURRENCY_FETCHING,
    EXCHANGE_CURRENCY_FETCH_SUCCESS,
    EXCHANGE_CURRENCY_FETCH_ERROR
} from "./type.js"
 import {
    multipleExchangeData
 } from "../urls.js"


export const exchangeToDisplay = (exchangURL) => {
    return function (dispatch) {
        dispatch({type: EXCHANGE_CURRENCY_FETCHING })
        axios.get(multipleExchangeData + exchangURL).then((response) => {
            // console.log(response)
        return(
            dispatch({
                type: EXCHANGE_CURRENCY_FETCH_SUCCESS,
                payload: response.data
            })
        )
        }).catch((error) => {
            console.log(error)
            return (
            dispatch({
                type: EXCHANGE_CURRENCY_FETCH_ERROR,
                payload: error
            })
            )
        })
    }
}

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