import API from "./API";

export const login = (username:string , password:string)=>{
    return API.get('/auth/login/' + username + "/" + password + "/");
}