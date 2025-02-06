import axios from "axios";
import { BASE_URL } from "../../config/config";
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, setAccessTokenInLocalStorage } from "../../utility/localStorage";
import axiosInstance from "../axiosInstance";





// GET USERS
export async function getUsersApiFn(queryObj) {
    try {                
        const response = await axiosInstance.get(`/user`, {
            params: queryObj
        });  
        // Use the axios instance with interceptors
        return response.data.data;
    } catch (error) {
        console.error("Error fetching users", error);
        throw error;
    }
}



// UPDATE USER
export async function updateUserApiFn(updateData) {

    // console.log(updateData);

    try {                
        const response = await axiosInstance.patch(`/user` , updateData,{ 
            headers:{
                'Content-Type': 'multipart/form-data',
            }     
        });  // Use the axios instance with interceptors
        return response.data.data;
    } catch (error) {
        console.error("Error Updating user", error);
        throw error;
    }
}









// Manual Process

// export async function getUsersApiFn() {
//     let accessToken = getAccessTokenFromLocalStorage();
//     let refreshToken = getRefreshTokenFromLocalStorage();
    
    
//     try {                
//         const response = await axios.get(`${BASE_URL}/user`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             }
//         });
//         return response.data;
//     } catch (error) {
//         // console.log(error.response.data.message);

//         if(error.response.data.message === "Token expired"){
//             try{
//                 const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, {
//                     headers: {
//                         Authorization: `Bearer ${refreshToken}`,
//                     }
//                 });

//                 const newAccessToken = response.data.newAccessToken;
//                 setAccessTokenInLocalStorage(newAccessToken);
                
//                 //Second Time Requesting
//                 const newResponse = await axios.get(`${BASE_URL}/user`, {
//                     headers: {
//                         Authorization: `Bearer ${newAccessToken}`,
//                     }
//                 });
//                 return newResponse.data;
                

//             }catch(err){
//                 // Redirect To Login Page 
//                 window.location.href = '/login';
//                 localStorage.clear()
//                 console.log(err);
//             }
//         }

//       throw error;
//     }
//   }
