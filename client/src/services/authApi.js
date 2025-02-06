import axios from "axios";
import { BASE_URL } from "../config/config";
import { setAccessTokenInLocalStorage, setAuthUserInLocalStorage, setRefreshTokenInLocalStorage } from "../utility/localStorage";




// Register Api Fn
export async function registerUserApiFn(data){
    // console.log(data);
        
    try{
        const response = await axios.post(`${BASE_URL}/auth/register`, {...data});
        console.log(response);
                        
    } catch (error){               
        throw error
    }
}




// Login Api Fn
export async function loginUserApiFn(data){

    // console.log(data);        
    try{
        const response = await axios.post(`${BASE_URL}/auth/login`, {...data}, {withCredentials: true } );
        // console.log(response);
        setAccessTokenInLocalStorage(response.data.accessToken);        
        setRefreshTokenInLocalStorage(response.data.refreshToken);
        setAuthUserInLocalStorage( JSON.stringify( response.data.user) )        
    } catch (error){                    
        throw error                
    }  
}




