import {apiPrivate} from "./AxiosApi.js";

export function saveRecruiterProfile(data) {
    return apiPrivate.post(`recruiter-profile`, data);
}

export function getRecruiterProfile() {
    return apiPrivate.get(`recruiter-profile`);
}

