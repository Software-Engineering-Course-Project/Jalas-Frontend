import API from "./API";

export const postCreatePoll = (data: any) => {
	return API.post("/poll/create_poll/", data);
};