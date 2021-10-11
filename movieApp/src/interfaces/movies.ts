
export type TMovieResult = {
    title: string;
    release_date: string;
    vote_average: string;
    poster_path: string;
    overview: string;
    vote_count: number;
    id: number
}
export type TMoviesResponse = {
    results: TMovieResult[];
}

export type TMovieGenres = {name: string}[];

export type TMovieGenresReponse = {
    genres: TMovieGenres;  
}

export type TMovieCasts = TMovieCast[];

export type TMovieCast = {
    name: string;
    character: string;
};

export type TMovieCastResponse = {
    id: number,
    cast: TMovieCasts
}

export type TMoviesGenreCast = {
    genres: TMovieGenres | undefined;
    casts: TMovieCasts | undefined;
}

export type TMediaType = "movie" | "tv";

export type TFavouriteRequest = {
    media_type: TMediaType;
    media_id: number;
    favorite: boolean;
}

export type TFavoriteResponse = {
    status_code: string;
    status_message: string;
}

export type TMovies = Array<TMovieResult>;

export type TMovieSortProps = "title" | "release_date" | "vote_average";