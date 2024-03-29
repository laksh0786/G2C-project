import { axiosInstance, privateReq } from "./axios-config";

const auth = "/api/v1/user";

//signup controller
export const signupController = (obj)=>{

    return axiosInstance.post(auth + '/signup' , obj);

}

//login controller
export const loginController = (obj)=>{

    return axiosInstance.post(auth + '/login' , obj);

}

//auth controller
export const authController = ()=>{
    return privateReq.post(auth + '/validate');
}


//forget password controller
export const forgetPasswordController = (obj)=>{
    return privateReq.post(auth + "/forget-password" , obj);
}

