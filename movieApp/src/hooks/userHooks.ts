import {batch, useSelector } from "react-redux"
import { IGlobalState, TAction, TKeys, TUser } from "../interfaces/app"
import { appNavigate } from "../navigation/action";
import { useAppDispatch } from "../store/store";
import { authService } from '../services/auth/index';


export const useUserData = () => {
    const state = useSelector((state: IGlobalState) => state.user);
    const dispatch = useAppDispatch<TAction>();
    type response = [TUser, ()=>void, (data: TUser, keys: TKeys) => void];

    const updateUser = (user: TUser, keys: TKeys) => {
        batch(()=> {
            dispatch({type: "user", payload: {user}});
            dispatch({type: "keys", payload: {keys}});
        })
    }

    const getApproval = async () => {
        const onApproved = () => {
        }
        const requestToken = await authService().getRequestToken(onApproved);
        if(requestToken) {
            appNavigate("AuthApprovalView", {requestToken: requestToken})
        }   
    }

    if(state) {
        return [state, getApproval, updateUser] as response;
    } else {
        return [{hasSession: false, accountId: ""}, getApproval, updateUser] as response ;
    }
}