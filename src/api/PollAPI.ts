import API from "./API";
import { Interface } from "readline";

export const getPoll = (pollId: number) => {
	return API.get("/poll/" + pollId);
};

export interface Poll{
    pollId: number;
    title: string;
    options: PollOption[];
}

export interface PollOption{
    date: string;
    time: string;
    agreed: number;
    disagreed: number;
}