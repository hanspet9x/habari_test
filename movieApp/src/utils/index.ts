import {AsyncStorage} from "react-native";
import { TStoreCallback } from "../interfaces/store";

export const sortArrayOfObjects = <T>(data: Array<T>, key: string, dataType: "string" | "any"): T[] => {
    type objectType = Record<string, any>;
    return data.sort((a: objectType, b: objectType) => {
         if (dataType === "string") {
            if (a[key] < b[key]) {
                return -1;
            } else if (a[key] > b[key]) {
                return 1;
            }
            return 0;
         }

         return a[key] - b[key];
         
    })
}

export const getTypedStoredItem = async <T>(item: string): Promise<T  | undefined>  => {
    
    const data = await AsyncStorage.getItem(item);
    if(data) {
        return JSON.parse(data) as T;
    }
    return undefined;
}

export const getStoredItem = async <T>(item: string, typed?: boolean)  => {
    
    const data = await AsyncStorage.getItem(item);
    if(typed && data) {
        return JSON.parse(data) as T;
    }
    return data;
}
export const setStoreItem = (item: string, value: string) => {
    return AsyncStorage.setItem(item, value)
}