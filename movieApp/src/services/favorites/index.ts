import { getData, postData } from '../fetch';
import { TFavoriteResponse, TFavouriteRequest, TMediaType, TMoviesResponse } from "../../interfaces/movies";
import { appKeys } from './../../store/token';
import { baseURL3 } from './../urls';

class Favorite {

    endPoints;
    REQUEST_TOKEN_KEY = "requestTokenKey";

    constructor (){
        this.endPoints = {
            addToFavorite: (accountId: string) => `${baseURL3}/account/${accountId}/favorite?api_key=${appKeys.api}`,
            getFavourites: (accountId: string, page: number) => `${baseURL3}/account/${accountId}/favorite/movies?api_key=${appKeys.api}&language=en-US&sort_by=created_at.asc&page=${page}`
        }
    }


    public async addToFavourites (accountId: string, movieId: number, mediaType: TMediaType): Promise<TFavoriteResponse | null>{
        const request: TFavouriteRequest = {favorite: true, media_id: movieId, media_type: mediaType};
        const response = await postData<TFavoriteResponse>(this.endPoints.addToFavorite(accountId), request);
        if(response.success) {
            return response.data
        }
        return null;
    }

    public async getFavorites (accountId: string, pageNo: number): Promise<TMoviesResponse | null> {
        const response = await getData<TMoviesResponse>(this.endPoints.getFavourites(accountId, pageNo));
        if(response.success) {
            return response.data
        }
        return null;
    }



}

let favInstance:null | Favorite;

export const favoriteService = () => {
    if(favInstance) {
        return favInstance;
    }
    return favInstance = new Favorite();
}