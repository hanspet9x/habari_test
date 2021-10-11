
export type RootStackParamList = {
    Home: undefined;
    ModalSelectedMovie: undefined;
    AuthApprovalView: {requestToken: ""};
    RecommendedMovieView: TRecommended;
}

export type TRecommended = {["isRecommended"]:boolean, ["selectedMovieId"]: number};
export type BottomStackParamList = {
    List: TRecommended;
    Favorites: undefined;
    User: undefined;
}