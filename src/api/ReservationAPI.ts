import API from "./API";

export const getReservation = (optionID: number) => {
	return API.get("/available_room/" + optionID);
};