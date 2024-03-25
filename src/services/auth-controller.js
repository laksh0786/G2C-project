import { axiosInstance, privateReq } from "./axios-config";

const auth = "/api/v1/user";

export const signupController = (obj)=>{

    return axiosInstance.post(auth + '/signup' , obj);

}

export const loginController = (obj)=>{

    return axiosInstance.post(auth + '/login' , obj);

}

export const authController = ()=>{
    return privateReq.post(auth + '/validate');
}

