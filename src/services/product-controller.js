import { axiosInstance } from "./axios-config";

const product = "/api/v1/product";

export const addProductController = (obj , headers)=>{
    return axiosInstance.post(product + '/add-product' , obj , headers);
}

export const getAllProductController = (email)=>{
    return axiosInstance.get(product + '/get-products?email='+email);
}

export const getAllProducts = ()=>{
    return axiosInstance.get(product + '/get-all-products');
}

export const getProductAndGrowerDetails = (productId)=>{
    return axiosInstance.get(product + '/getproductgrower?productId='+productId);
}