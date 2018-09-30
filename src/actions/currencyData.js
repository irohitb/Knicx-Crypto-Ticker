import axios from 'axios';
import {
  CURRENCY_RATE, 
  CURRENCY_FETCHING, 
  CURRENCY_ERROR
 } from './type.js';

import {
  CurrencyRateLink
} from '../urls.js';
import {currencyDetails} from './currencyDetails'

//Currency Object  



export const CurrencyRate = (selectedCurrency) => {
  return function (dispatch) {
    dispatch({type: CURRENCY_FETCHING})
    axios.get(CurrencyRateLink).then((response) => {
      let Currency = []
      console.log("Inside CUrrency Rate")
      if ( selectedCurrency != "USD") {
      let CurrencyRates = Object.keys(response.data.rates)
      console.log(CurrencyRates[1])

        for (let i=0; i<CurrencyRates.length; i++) {
           
           if (selectedCurrency == CurrencyRates[i]) {  
             console.log("Inside if ")
            let currencySymbol = currencyDetails[selectedCurrency]["symbol"]
              Currency.push({
              currencySymbol: currencySymbol,
              currencyName : CurrencyRates[i],
              currencyPrice : response.data.rates[selectedCurrency]
              })
              console.log(Currency)
           }
        }
      } else if ( selectedCurrency == "USD") {
        let currencySymbol = currencyDetails[selectedCurrency]["symbol"]
        Currency.push({
          currencySymbol: currencySymbol,
          currencyName :   "USD",
          currencyPrice : 1
          })
        console.log(Currency)
      }
    return (
    dispatch({
      type: CURRENCY_RATE,
      payload: Currency
    })
  )}).catch((error) => {
    console.log(error)
  return (
  dispatch({
      type: CURRENCY_ERROR,
      payload: error.data
    })
    )
  })
  }
}
