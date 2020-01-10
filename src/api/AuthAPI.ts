import API from "./API";

export const login = (username:string , password:string)=>{
    return API.get('/auth/login/' + username + "/" + password + "/");
}

export const registerUser = (user: object)=>{
    return API.post('/auth/register/', user);
}
