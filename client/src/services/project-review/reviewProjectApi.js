import axios from "axios";
import { BASE_URL } from "../../config/config";






// CREATE Review Project
export async function createReviewProjectApiFn(data){
    
    // console.log(data);
    
    try{
        const response = await axios.post(`${BASE_URL}/project-review`, {...data})
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}



// GET Multiple Review Projects
export async function getReviewProjectApiFn(projectQuery){        
    try{
        const response = await axios.get(`${BASE_URL}/project-review`, {params: projectQuery })        
        // console.log(response);
        return response.data.data;        
    
    }catch(err){
        console.log(err);
        
        throw err;
    }
}





// UPDATE Review Project
export async function updateReviewProjectApiFn(updateData){    

    console.log(updateData);
    
    
    try{
        const response = await axios.patch(`${BASE_URL}/project-review`, updateData)
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}






// GET Review Project Stats
export async function getReviewProjectStatsApiFn(){             
    try{
        const response = await axios.get(`${BASE_URL}/review-project-stats`)        
        // console.log(response);
        return response.data.data;
    
    }catch(err){
        console.log(err);        
        throw err;
    }
}