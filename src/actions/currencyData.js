import axios from 'axios';
import {
  CURRENCY_RATE, 
  CURRENCY_FETCHING, 
  CURRENCY_ERROR
 } from './type.js';

import {
  CurrencyRateLink
} from '../urls.js';


export const CurrencyRate = () => {
  return function (dispatch) {
    dispatch({type: CURRENCY_FETCHING})

    axios.get(CurrencyRateLink).then((response) => {
    return (
    dispatch({
      type: CURRENCY_RATE,
      payload: response.data
    })
  )}).catch((error) => dispatch({
      type: CURRENCY_ERROR,
      payload: error.data
    }))
  }
}
