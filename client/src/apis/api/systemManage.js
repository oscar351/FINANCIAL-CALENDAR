import { defaultInstance, authInstance } from "../utils/index.js";

export const getSystemPerformance = async (formData) => {
    try{
        const { data } = await authInstance.get("system/performance");
        
        return data
    } catch(error) {
        console.log(error)
    }
}