import { axiosInstance } from "./axios-config";


const profile = "/api/v1/profile";

export const fetchprofileController = (obj , header)=>{
    return axiosInstance.get(profile + '/fetch-profile?email='+obj.email); 
}

export const updateprofileController = (obj , header)=>{
    return axiosInstance.post(profile+'/update-profile' , obj , header);
}