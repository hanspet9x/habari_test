import { useDispatch} from "react-redux";
import { createStore } from "redux";
import { TAction } from "../interfaces/app";
import { reducer } from "./reducers";

export const store = createStore(reducer);

export const useAppDispatch = <T>() => {
    const dispatch = useDispatch();
    return (action: T) => {
        dispatch(action);
    };
}