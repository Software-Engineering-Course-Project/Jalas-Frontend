import axios from "axios";

var API = axios.create({
	baseURL: "http://localhost:8000/api"
});

API.interceptors.request.use((config:any) => {

	if (config.url.startsWith('/auth/login'))
		return config;
	config.headers.Authorization = "Bearer " +localStorage.getItem('token');
	return config;
});

API.interceptors.response.use(response => response, (error) => {
	if (error.response.config.url.startsWith(`${error.response.config.baseURL}/auth/login`)){
			return Promise.reject(error);
	}
	if(error.response.status === 401 || error.response.status === 403){
			localStorage.clear;
			window.location.href = '/login';
	}
	return Promise.reject(error);
});

export default API;