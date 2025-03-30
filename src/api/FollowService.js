import {apiPrivate} from "./AxiosApi.js";

export function getFollowByUserAndRecruiter(recruiterId) {
    return apiPrivate.get(`follows/${recruiterId}`);
}

export function followRecruiter(recruiterId) {
    return apiPrivate.post(`follows/${recruiterId}`);
}


export function getFollowedCompanies() {
    return apiPrivate.get(`follows/followed-companies`);
}


export function unFollowRecruiter(id) {
    return apiPrivate.delete(`follows/${id}`);
}