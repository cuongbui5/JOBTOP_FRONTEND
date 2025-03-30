import {api, apiPrivate} from "./AxiosApi.js";

export const getAllIndustries=()=>{
    return api.get("industries")
}

export const createIndustry=(data)=>{
    return apiPrivate.post("industries",data)
}

