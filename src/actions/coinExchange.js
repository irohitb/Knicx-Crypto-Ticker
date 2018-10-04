import axios from 'axios';

import {
    EXCHANGE_CURRENCY_FETCHING,
    EXCHANGE_CURRENCY_FETCH_SUCCESS,
    EXCHANGE_CURRENCY_FETCH_ERROR
} from "./type.js"


//We are importing URS in this case directly to the component and hence would be passing URL here
export const exchangeToDisplay = (exchangURL) => {
    return function (dispatch) {
        dispatch({type: EXCHANGE_CURRENCY_FETCHING })
        axios.get(exchangURL).then((response) => {
            dispatch({
                type: EXCHANGE_CURRENCY_FETCH_SUCCESS,
                response: response.data
            })
        }).catch((error) => {
            dispatch({
                type: EXCHANGE_CURRENCY_FETCH_ERROR,
                response: error
            })
        })
    }
}