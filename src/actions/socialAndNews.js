import axios from 'axios';

import {
    REDDIT_FETCHED,
    REDDIT_DATA_FAIL,
    REDDIT_FETCHING
} from './type.js';


export const fetchRedditPosts = (subreddit) => {
    return function (dispatch)  {
        dispatch({type: REDDIT_FETCHING})
        axios.get('https://www.reddit.com/r/' + subreddit +  '/new.json?sort=new').then((response) => {
        return (
            dispatch({
                type: REDDIT_FETCHED,
                payload: response.data
              })
           )
        }).catch((error) => dispatch({
        type: REDDIT_DATA_FAIL,
        payload: error.data
      }))
    }
  }
  