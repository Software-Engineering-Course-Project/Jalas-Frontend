import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

var API = axios.create({
	baseURL: "http://localhost:8000/api"
});

API.interceptors.request.use((config:any) => {

	if (config.url.startsWith('/auth/login') || config.url.startsWith('/auth/register'))
		return config;
	config.headers.Authorization = "Bearer " +localStorage.getItem('token');
	return config;
});

API.interceptors.response.use(response => response, (error) => {
	if (error.response.config.url.startsWith(`${error.response.config.baseURL}/auth/login` ||
	error.response.config.url === `${error.response.config.baseURL}/auth/register`)){
			return Promise.reject(error);
	}
	if(error.response.status === 401 || error.response.status === 403){
			localStorage.clear;
			window.location.href = '/login';
	}
	if(error.response.status === 999){
		toast.warn("شما به این صفحه دسترسی ندارید.")
		window.location.href = '/home';
}
	return Promise.reject(error);
});

export default API;