import axios from 'axios';
import {
    NEWS_FETCHING_SUCESS,
    NEWS_FETCHING,
    NEWS_FETCHING_FAIL
} from "./type.js";

import {
    cryptoCompareNews
} from '../urls.js';

export const coinNews = () => {
    dispatch({type: NEWS_FETCHING})
    axios.get(cryptoCompareNews).then((response) => {
        console.log(response.data)
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
    
    

