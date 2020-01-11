import API from "./API";

export const getSetting = () => {
	return API.get("/config/get/");
};

export const setSetting = (temp: any) => {
	return API.post("/config/set/", temp);
};