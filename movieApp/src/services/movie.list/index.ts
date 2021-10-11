import { TMovieCastResponse, TMovieGenresReponse, TMovieGenres, TMoviesResponse, TMoviesGenreCast } from "../../interfaces/movies";
import { appKeys } from "../../store/token";
import { getStoredItem, getTypedStoredItem, setStoreItem } from "../../utils";
import { getData, TApiResponse } from "../fetch";
import { baseURL3 } from "../urls";

class MovieListApi {
    endPoints
    constructor() {
      this.endPoints = {
            playingNow: (pageNo: number) => `${baseURL3}/movie/now_playing?language=en-US&page=${pageNo}&api_key=${appKeys.api}`,
            getMovieById: (id: number) => `${baseURL3}/movie/${id}?api_key=${appKeys.api}&language=en-US`,
            getRecommendedMovieById: (id: number) => `${baseURL3}/movie/${id}/recommendations?api_key=${appKeys.api}&language=en-US`,
            getMovieCast: (id: number) => `${baseURL3}/movie/${id}/credits?api_key=${appKeys.api}&language=en-US`,
        }
    }

    private async getMovies(url: string): Promise<TMoviesResponse | null> {
        const data: TApiResponse<TMoviesResponse> = await getData(url);
        if (data.success) {
            return data.data;
        } else {
            return Promise.reject(null);
        }

    }

    public async getPlayingMovies(pageNo: number): Promise<TMoviesResponse | null> {
        return this.getMovies(this.endPoints.playingNow(pageNo));

    }    
    
    public async getRecommendedMovies(movieId: number): Promise<TMoviesResponse | null> {
        return this.getMovies(this.endPoints.getRecommendedMovieById(movieId));

    }



    public async getMovieDetails (id: number): Promise<TMovieGenresReponse | null> {
    
        const details = await getTypedStoredItem<TMovieGenresReponse>(id+"");
        if(details) {
            return details;
        }
        const response: TApiResponse<TMovieGenresReponse> = await getData(this.endPoints.getMovieById(id));
        if (response.success) {
            setStoreItem(id+"", JSON.stringify(response.data));
            return response.data;
        } else {
            return Promise.reject(null);
        }
    }    
    
    public async getMovieGenreAndCast (id: number): Promise<TMoviesGenreCast | null> {
    
        const details = await getTypedStoredItem<TMoviesGenreCast>(id+"");
        if(details && details.casts?.length && details?.genres?.length) {
            return details;
        }
        const [genres, casts] = await Promise.all([getData<TMovieGenresReponse>(this.endPoints.getMovieById(id)), getData<TMovieCastResponse>(this.endPoints.getMovieCast(id))]);
        if (genres.success && casts.success) {
            const data: TMoviesGenreCast = {genres: genres.data?.genres, casts: casts.data?.cast}
            setStoreItem(id+"", JSON.stringify(data));
            return data;
        } else {
            return Promise.reject(null);
        }
    }

}

let movieList: null | MovieListApi;
export const getMovieListApi = () => {
    if (movieList) {
        return movieList;
    }
    return movieList = new MovieListApi();
}

