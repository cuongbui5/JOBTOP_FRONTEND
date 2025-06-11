import {apiPrivate} from "./AxiosApi.js";

export const getTotalRevenue=()=>{
    return apiPrivate.get(`/transactions/total`);
}

export const getRevenueByDate=(date)=>{
    return apiPrivate.get(`/transactions/date?date=${date}`);
}

export const getRevenueByMonth=(month,year)=>{
    return apiPrivate.get(`/transactions/month?month=${month}&year=${year}`);
}

export const getRevenueByYear=(year)=>{
    return apiPrivate.get(`/transactions/year?year=${year}`);
}

export const getRevenueDetailByYear=(year)=>{
    return apiPrivate.get(`/transactions/statistics/year-detail?year=${year}`);
}
