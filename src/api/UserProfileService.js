import {apiPrivate} from "./AxiosApi.js";

export function saveUserProfile(data) {
    return apiPrivate.post(`user-profile`, data);
}

export function getUserProfile() {
    return apiPrivate.get(`user-profile`);
}



