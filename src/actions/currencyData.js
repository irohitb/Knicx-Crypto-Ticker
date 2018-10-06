import axios from 'axios';
import {
  CURRENCY_RATE, 
  CURRENCY_FETCHING, 
  CURRENCY_ERROR,
  CURRENCY_INR
 } from './type.js';

import {
  CurrencyRateLink,
  CurrencyRateLinkINR
} from '../urls.js';
import {currencyDetails} from './currencyDetails'

//Currency Object  



export const CurrencyRate = (selectedCurrency) => {
 
  return function (dispatch) {
    dispatch({type: CURRENCY_FETCHING})
    let Currency = []
    if (selectedCurrency == "USD" || selectedCurrency == "usd") {
      Currency.push({
        currencySymbol: "$",
        currencyName :   "USD",
        currencyPrice : 1
        })
        return (
          dispatch({
            type: CURRENCY_RATE,
            payload: Currency
          })
        )
      } else {
    axios.get(CurrencyRateLink).then((response) => {
      let CurrencyRates = Object.keys(response.data.rates)
        for (let i=0; i<CurrencyRates.length; i++) {
           if (selectedCurrency == CurrencyRates[i]) {  
            let currencySymbol = currencyDetails[selectedCurrency]["symbol"]
              Currency.push({
              currencySymbol: currencySymbol,
              currencyName : CurrencyRates[i],
              currencyPrice : response.data.rates[selectedCurrency]
              })
           }
        }
    return (
    dispatch({
      type: CURRENCY_RATE,
      payload: Currency
    })
  )}).catch((error) => {
    return (
      dispatch({
          type: CURRENCY_ERROR,
          payload: error.data
        })
      )
    })
  }
 }
}

export const indianCurrency = () => {
  return function (dispatch) {
    dispatch({type: CURRENCY_FETCHING})
    axios.get(CurrencyRateLinkINR).then((response) => {
      return (
        dispatch({
          type: CURRENCY_INR,
          payload: response.data
        })
      )
    }).catch((error) => {
      return (
        dispatch({
          type: CURRENCY_ERROR,
          payload: error.data
        })
      )
    })
  }
}