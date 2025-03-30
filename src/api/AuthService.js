import {api, apiPrivate} from "./AxiosApi.js";

export function login(loginRequest) {
    return api.post(`auth/login`, loginRequest);
}

export function register(registerRequest) {
    return api.post(`auth/register`, registerRequest);
}

export function getAllRoles() {
    return api.get(`auth/roles`);
}

export function loginByOauth(code) {
    return api.get(`auth/oauth/login?code=${code}`);
}

export function updateUserRole(roleId) {
    return apiPrivate.post(`users/setRole/${roleId}`);
}