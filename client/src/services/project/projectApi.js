import axios from "axios";
import { BASE_URL } from "../../config/config";






// CREATE Project
export async function createProjectApiFn(data){
    
    // console.log(data);
    
    try{
        const response = await axios.post(`${BASE_URL}/project`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}




// GET Multiple Projects
export async function getProjectApiFn(projectQury){    
    // console.log(projectQury);
    
    
    try{
        const response = await axios.get(`${BASE_URL}/project`, {
            params: projectQury
        })        
        // console.log(response);
        return response.data.data;        
    
    }catch(err){
        console.log(err);
        
        throw err;
    }
}



// UPDATE Multiple Projects
export async function updateProjectApiFn(updateData){
    // console.log(updateData);
            
    try{
        const response = await axios.patch(`${BASE_URL}/project`, updateData, {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })        
        // console.log(response);
        return response.data.data;        
    
    }catch(err){
        console.log(err);        
        throw err;
    }
}





// GET Project Stats
export async function getProjectStatsApiFn(){             
    try{
        const response = await axios.get(`${BASE_URL}/project-stats`)        
        // console.log(response);
        return response.data.data;
    
    }catch(err){
        console.log(err);        
        throw err;
    }
}


