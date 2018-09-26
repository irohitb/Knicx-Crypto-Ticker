import axios from 'axios';

import {
    REDDIT_FETCHED,
    REDDIT_DATA_FAIL,
    REDDIT_FETCHING
} from './type.js';

import {
    RedditFetch
  } from '../urls.js';


export const fetchRedditPosts = (subreddit) => {
    return function (dispatch)  {
        dispatch({type: REDDIT_FETCHING})
        axios.get(RedditFetch + subreddit + "&t=all&sort=new").then((response) => {
        return (
            dispatch({
                type: REDDIT_FETCHED,
                payload: response.data.data.children
              })
           )
        }).catch((error) => dispatch({
        type: REDDIT_DATA_FAIL,
        payload: error.data
      }))
    }
  }
  