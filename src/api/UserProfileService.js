import {apiPrivate} from "./AxiosApi.js";

export function saveUserProfile(data) {
    return apiPrivate.post(`candidates`, data);
}

export function getUserProfile() {
    return apiPrivate.get(`candidates`);
}

export function searchCandidates(params) {

    const queryParams = {};

    if (params.page) queryParams.page = params.page;
    if (params.size) queryParams.size = params.size;
    if (params.keyword) queryParams.keyword = params.keyword;
    if (params.city) queryParams.city = params.city;
    if (params.industry) queryParams.industry = params.industry;
    if (params.positionLevel) queryParams.positionLevel = params.positionLevel;
    if (params.experienceLevel) queryParams.experienceLevel = params.experienceLevel;
    if (params.educationLevel) queryParams.educationLevel = params.educationLevel;
    if (params.gender) queryParams.gender = params.gender;


    return apiPrivate.get('candidates/search', { params: queryParams });
}


