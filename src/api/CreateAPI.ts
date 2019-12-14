import API from "./API";

export const postCreatePoll = (data: any) => {
    alert(data);
	return API.post("/poll/create_poll/", data);
};



