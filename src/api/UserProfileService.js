import {apiPrivate} from "./AxiosApi.js";

export function saveUserProfile(data) {
    return apiPrivate.post(`candidates`, data);
}

export function getUserProfile() {
    return apiPrivate.get(`candidates`);
}



