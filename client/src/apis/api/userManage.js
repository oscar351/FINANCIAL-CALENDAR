import { defaultInstance, authInstance } from "../utils/index.js";

export const login = async (id, password) => {
    try{
        const { data } = await defaultInstance.post("auth/login", {
            id : "master",
            password : "dlrlals5"
        })
        return data
    } catch(error) {
        console.log(error)
    }
}

export const logout = async () => {
    try{
        const { data } = await defaultInstance.get("auth/logout")
        return data
    } catch(error) {
        console.log(error)
    }
}

export const loginKakao = async (code) => {
    try{
        const { data } = await defaultInstance.get("auth/kakao", {
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