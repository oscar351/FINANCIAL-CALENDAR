import axios from 'axios'
// import {getItem} from "@SessionStorage"

const BASE_URL = "http://localhost:5000/"

const axiosApi = (url, options) => {
    const instance = axios.create({baseURL:url, ...options})
    return instance
}

const axiosAuthApi = (url, options) => {
    // const token = getItem('userInfo');
    const instance = axios.create({
        baseURL : url,
        headers : {Authorization: 'Bearer '},
        ...options,
    })
    return instance
}

export const defaultInstance = axiosApi(BASE_URL)
export const authInstance = axiosAuthApi(BASE_URL)