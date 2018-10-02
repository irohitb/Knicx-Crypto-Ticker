import {
    NAVBAR_ACTIVE_STATE
} from "./type.js"

export const navbarState = (activeTab) => {
    return function (dispatch)  {
        return(
            dispatch({
              type: NAVBAR_ACTIVE_STATE,
              payload: activeTab
            })
          )
    }
}