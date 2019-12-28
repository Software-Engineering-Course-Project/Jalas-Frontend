import API from "./API";

export const getLoges = () => {
	return API.get("/logger/show_log/");
};
