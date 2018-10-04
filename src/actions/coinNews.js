import axios from 'axios';
import {
    NEWS_FETCHING_SUCESS,
    NEWS_FETCHING,
    NEWS_FETCHING_FAIL,
    COIN_NEWS_STATE 
} from "./type.js";

import {
    cryptoCompareNews
} from '../urls.js';

export const coinNews = () => {
    return function (dispatch) {
    dispatch({type: NEWS_FETCHING})
    axios.get(cryptoCompareNews).then((response) => {
        return(
            dispatch({
              type: NEWS_FETCHING_SUCESS,
              payload: response.data
            })
          )
    }).catch((error) => {
        return (
         dispatch({
          type: NEWS_FETCHING_FAIL,
          payload: error.data
        })
       )
    })
    }
 }
    
    

//Tracks the news number 
 export const coinNewsState = (number) => {
     return function (dispatch) {
         dispatch({
             type: COIN_NEWS_STATE, 
             payload: number
         })
     }
 }