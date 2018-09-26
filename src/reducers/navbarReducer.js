import {
    NAVBAR_ACTIVE_STATE 
  } from './../actions/type.js';


  const intialState = {
      activeTab: ""
  }

  export default function(state = initialState, action) {
    switch(action.type) {
        case NAVBAR_ACTIVE_STATE :
        return {
          activeTab: action.payload
        }
        default:
        return {
            activeTab: "home"
        }
      }
    }