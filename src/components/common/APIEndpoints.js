import Config from "react-native-config";
import axios from "axios";
import {saveToken} from "./TokenLogic";

const endpoints = axios.create({
    baseURL: Config.API_URL,
});
// Users operations

async function createNewUser(name, email, age, password){
    try{
        const resp = await endpoints.post("/users", {name, email, age, password});
        if(resp.status === 201){
            saveToken(resp.data.token);
            return {
                error: null,
                data: resp.data
            }
        }
    }catch(error){  
        const serverResponse = error.response.data;
        if(serverResponse.code && serverResponse.name === "MongoError")
            return{
                error: "That email address is already in use",
                data: null
            }
        else{
            const errorData = error.response.data.errors;           
            return {
                error: errorData[Object.keys(errorData)[0]].message,
                data: null
            }
        }
    }
}


module.exports = {
    createNewUser
}