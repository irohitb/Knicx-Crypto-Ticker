import axios from 'axios';

import {
    EXCHANGE_CURRENCY_FETCHING,
    EXCHANGE_CURRENCY_FETCH_SUCCESS,
    EXCHANGE_CURRENCY_FETCH_ERROR,
    COINEXCHANGE_UPDATE_VALUE,
    COIN_UPDATE_STATE
} from "./type.js"
 import {
    multipleExchangeData,
    koinex,
    coinDelta
 } from "../urls.js"


export const exchangeToDisplay = (exchangURL, random) => {
    return function (dispatch) {
            if (random == undefined) {
               dispatch({type: EXCHANGE_CURRENCY_FETCHING })
             }
            let koinexApi = axios.get(koinex)
            let coinDeltaApi = axios.get(coinDelta)
            let multipleExchangeDataApi = axios.get(multipleExchangeData + exchangURL + "-usd") 
            return Promise.all([koinexApi, coinDeltaApi , multipleExchangeDataApi]).then(function(values) {
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

export const coinUpdateState = (booleanValue) => {
    return function (dispatch) {
        dispatch({
            type: COIN_UPDATE_STATE,
            payload: booleanValue
        })
    }
}


