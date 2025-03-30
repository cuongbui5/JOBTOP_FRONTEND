import {api} from "./AxiosApi.js";

export const getAllTags=()=>{
    return api.get("tags")
}

export const createTag=(tag)=>{
    return api.post("tags",tag)
}