import API from "./API";

export const getPoll = (pollId: number) => {
	return API.get("/poll/" + pollId);
};

export const getOptions = (pollId: number) =>{
    return API.get("/selects/" + pollId);
};

export interface Poll{
    pollId: number;
    title: string;
    options: PollOption[];
}

export interface PollOption{
    id:number;
    start: Time;
    end: Time;
    agreed: number;
    disagreed: number;
}

export interface Time{
    date: string;
    time:string;
}