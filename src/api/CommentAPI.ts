import API from "./API";

export const sendComment = (pollId:number, text:string)=>{
    return API.post('/poll/add_comment/' + pollId, {"text":text});
}

export const getAllComment = (pollId:number)=>{
    return API.get('/poll/get_comment/' + pollId);
}