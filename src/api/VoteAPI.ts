import API from "./API";

export const getPollTime = (pollId:number) => {
	return API.get("/poll/selects/" + pollId);
};

export const getPollUser = (pollId:number) =>{
    return API.get("/poll/get_voter/" + pollId);
};