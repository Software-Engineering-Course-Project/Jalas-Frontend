import API from "./API";
import {Time} from "src/api/PollAPI";

export const getMeetings = () =>{
	return API.get("/meeting/meeting/");
}

export const RoomStatus = {
    1: 'در انتظار اتاق',
    2: 'رزرو کامل',
    3: 'برگزار شده',
    4: 'لغو شده'
};


export interface ReservedMeeting {
	pollId: number;
	title: string;
	start: Time;
	end: Time;
	roomNumber: number;
	status: number;
	isCancle: boolean;
};