import axios from 'axios';
import {
  CURRENCY_RATE, 
  CURRENCY_FETCHING, 
  CURRENCY_ERROR
 } from './type.js';

import {
  CurrencyRateLink
} from '../urls.js';


export const CurrencyRate = (selectedCurrency) => {
  return function (dispatch) {
    dispatch({type: CURRENCY_FETCHING})

    axios.get(CurrencyRateLink).then((response) => {
      let Currency = []
      if ( selectedCurrency != "USD") {
      let CurrencyRates = Object.keys(response.data.rates)
        for (let i=0; i<CurrencyRates.length; i++) {
           if (selectedCurrency == CurrencyRates[i]) {
              Currency.push({
              currencyName : CurrencyRates[i],
              currencyPrice : response.data.rates[selectedCurrency]
              })
              console.log(Currency)
           }
        }
        console.log(Currency)
      }
    return (
    dispatch({
      type: CURRENCY_RATE,
      payload: Currency
    })
  )}).catch((error) => dispatch({
      type: CURRENCY_ERROR,
      payload: error.data
    }))
  }
}
