import axios from "axios";

// const baseURL = "http://localhost:5000";
const baseURL = "https://g2c-backend.onrender.com";

const axiosInstance = axios.create({baseURL});

const privateReq = axios.create({baseURL});

privateReq.interceptors.request.use((config)=>{

    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export {axiosInstance , privateReq , baseURL};