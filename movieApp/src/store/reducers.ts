import { IGlobalState as IGlobalState, TAction } from "../interfaces/app";

const initialState: IGlobalState = {
    keys: {
        requestToken: "",
        accessToken: "",
    },
    
    user: {
        hasSession: false,
        accountId: ""
    },
}


export const reducer = (state = initialState, action: TAction): IGlobalState => {

    switch (action.type) {
        case "keys":
            return {...state, keys: action.payload.keys}
        case "user":
            return {...state, user: action.payload.user}
        case "selectedMovie":
            return {...state, selectedMovie: action.payload.selectedMovie}
        default:
            return state;
    }
}