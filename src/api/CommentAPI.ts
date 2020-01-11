import API from "./API";

export const sendComment = (pollId:number, text:string)=>{
    return API.post('/comment/add/' + pollId, {"text":text});
}

export const getAllComment = (pollId:number)=>{
    return API.get('/comment/get/' + pollId);
}

export const sendEditComment = (commentId: number, text:string)=>{
    return API.post('/comment/edit/' + commentId, {"text":text});
}

export const sendReply = (commentId: number, text:string)=>{
    return API.post('/comment/reply/' + commentId, {"text":text});
}

export const deleteComment = (commentId: number)=>{
    return API.get('/comment/delete/' + commentId);
}