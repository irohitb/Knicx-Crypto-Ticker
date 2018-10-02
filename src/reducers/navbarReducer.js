import {
    NAVBAR_ACTIVE_STATE 
  } from './../actions/type.js';


  const intialState = {
      activeTab: "Home"
  }

  export default function(state = intialState,  action) {
    switch(action.type) {
        case NAVBAR_ACTIVE_STATE :
        return {
          ...state,
          activeTab: action.payload
        }
        default:
          return state
      }
    }