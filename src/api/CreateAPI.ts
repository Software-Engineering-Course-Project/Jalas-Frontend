import API from "./API";

export const postCreatePoll = (data: any) => {
	return API.post("/poll/create_poll/", data);
};

export const getPollId = () =>{
	return API.get("/poll/get_last_poll");
}