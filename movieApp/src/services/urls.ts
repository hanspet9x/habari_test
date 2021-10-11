const baseURL = 'https://api.themoviedb.org';
export const baseURL3 = `${baseURL}/3`;
export const baseURL4 = `${baseURL}/4`;
export const uris = {

    tokenApproval: (request_token: string) => `https://www.themoviedb.org/auth/access?request_token=${request_token}`,
    tokenApproved: 'https://www.themoviedb.org/auth/access/approve',
    postalImage: (postal: string) => `https://image.tmdb.org/t/p/w200${postal}`,

}