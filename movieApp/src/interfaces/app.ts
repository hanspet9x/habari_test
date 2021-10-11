import { TMovieResult, TMoviesResponse } from "./movies";

export type TKeys = {
    accessToken: string;
    requestToken: string;

}

export type TUser = {
    accountId: string;
    hasSession: boolean;

}

export interface IGlobalState {
    keys?: TKeys;
    user?: TUser; 
    movieLists?: TMoviesResponse;
    selectedMovie?: TMovieResult;
}

export type TActionType = "keys" | "user" | "movieLists" | "selectedMovie";

export type TAction = {
    type: TActionType;
    payload: IGlobalState;
}