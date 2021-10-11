export type TRequestTokenResponse = {
    request_token: string;
    success: boolean;
}

export type TAccessTokenResponse = {
    success: boolean;
    access_token: string;
    account_id: string;
}