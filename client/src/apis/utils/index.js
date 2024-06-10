import axios from 'axios'
// import {getItem} from "@SessionStorage"

const BASE_URL = "http://localhost:5000/"

const axiosApi = (url, options) => {
    const instance = axios.create({baseURL:url, ...options})
    return instance
}

const axiosAuthApi = (url, options) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    
    const instance = axios.create({
        baseURL : url,
        headers : {authorization: 'Bearer ' + accessToken},
        ...options,
    })
    return instance
}

export const defaultInstance = axiosApi(BASE_URL)
export const authInstance = axiosAuthApi(BASE_URL)