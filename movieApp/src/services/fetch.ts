import { appKeys } from "../store/token"


export type TApiResponse<T> = {
    data: T | null;
    success: boolean;
}

const getPost = async <T>(url: string, method: 'POST' | 'GET', body?: any) => {
    let bodyRequest = {
        method: method,
        headers: { 'Authorization': `Bearer ${appKeys.token}` , 'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(body)
    }

    try {
        const response = await fetch(url, bodyRequest);
        if (response.ok) {
            const json = await response.json();
            return { data: json as T, success: true }
        } else {
            return { data: null, success: false }
        }
    } catch (error) {
        return { data: null, success: false }
    }
}

export const getData = async <T>(url: string): Promise<TApiResponse<T>> => {
    return getPost<T>(url, "GET");
}

export const postData = async <T>(url: string, body: any) => {
    return getPost<T>(url, "POST", body);
}