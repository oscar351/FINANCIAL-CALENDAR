import { defaultInstance, authInstance } from "../utils/index.js";

export const login = async (email, password) => {
    try{
        const { data } = await defaultInstance.post("auth/login", {
            email : email,
            password : password
        })
        return data
    } catch(error) {
        console.log(error)
    }
}

export const logout = async () => {
    try{
        const { data } = await authInstance.get("auth/logout")
        return data
    } catch(error) {
        console.log(error)
    }
}

export const postCreate = async (formData) => {
    try{
        await authInstance.post('~~', formData)
    }catch(error){
        console.log(error);
    }
}

export const findUserId = async (formdata) => {
    try{
        const { data } = await defaultInstance.post("users/findUserId", formdata);
        return data
    }catch(error){
        console.log(error);
    }
}