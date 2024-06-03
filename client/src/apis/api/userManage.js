import { defaultInstance, authInstance } from "../utils/index.js";

export const login = async (id, password) => {
    try{
        const { data } = await defaultInstance.post("login", {
            id : "master",
            password : password
        })
        return data
    } catch(error) {
        console.log(error)
    }
}

export const loginKakao = async (code) => {
    try{
        const { data } = await defaultInstance.post("login", {
            authorizationCode: code
          })
        return data
    } catch(error) {
        console.log(error)
    }
}


export const postCreate = async (formData) => {
    try{
        await authInstance.post('~~', formData)
    }catch(error){
        console.log(error)
    }
}