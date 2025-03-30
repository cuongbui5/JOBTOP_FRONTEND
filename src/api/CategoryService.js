import {api} from "./AxiosApi.js";

export const getAllCategories=()=>{
    return api.get("categories")
}