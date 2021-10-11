import { TAccessTokenResponse, TRequestTokenResponse } from "../../interfaces/auth";
import { setStoreItem } from "../../utils";
import { baseURL4 } from "../urls";
import { postData } from '../fetch';
import { getStoredItem } from '../../utils/index';

class Auth {

    endPoints;
    REQUEST_TOKEN_KEY = "requestTokenKey";

    constructor (){
        this.endPoints = {
            getRequestToken: `${baseURL4}/auth/request_token`,
            getAccessToken: `${baseURL4}/auth/access_token`
        }
    }


    public async getRequestToken (onTokenApproved: ()=>void): Promise<string | null> {

       const requesttoken = await postData<TRequestTokenResponse>(this.endPoints.getRequestToken, {redirect_to: onTokenApproved});
    
       if(requesttoken.success && requesttoken.data?.success) {
           setStoreItem(this.REQUEST_TOKEN_KEY, requesttoken.data.request_token);
            return requesttoken.data.request_token;
       }
       return null;
    }

    public async getAccessToken (): Promise<TAccessTokenResponse | null>{
        const requestToken = await getStoredItem(this.REQUEST_TOKEN_KEY);
        const accessToken = await postData<TAccessTokenResponse>(this.endPoints.getAccessToken, {request_token: requestToken});
        if(accessToken.success){
            return accessToken.data;
        }
        return null;
    }


}

let authInstance:null | Auth;

export const authService = () => {
    if(authInstance) {
        return authInstance;
    }
    return authInstance = new Auth();
}