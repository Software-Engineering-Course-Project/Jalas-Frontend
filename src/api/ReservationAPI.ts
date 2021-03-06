import API from "./API";
import {Time} from "src/api/PollAPI";

export const getReservation = (optionID: number) => {
	return API.get("/reservation/available_room/" + optionID);
};

export const postOption = (optionID:number) => {
	return API.get("/reservation/set_date/" + optionID);
};

export const postRoom = (roomNum: number, optionID:number) =>{
	return API.get("/reservation/set_room/" + roomNum + "/" + optionID);
};

export const getMeeting = (optionId: number) =>{
	return API.get("/meeting/show_meeting/" + optionId);
}

export const cancelMetting = (optionId: number) =>{
	return API.get("/reservation/set_cancel/" + optionId);
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