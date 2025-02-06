import axios from "axios";
import { BASE_URL } from "../../config/config";



// GET Guideline
export async function getGuidelinesApiFn(){
    try{
        const response  = await axios.get(`${BASE_URL}/guidelines`);
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}




// CREATE Guideline
export async function createGuidelineApiFn(data){

    console.log(data);
    
    try{
        const response  = await axios.post(`${BASE_URL}/guidelines`, data );
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}



// UPDATE Guideline
export async function updateGuidelineApiFn(data){
    console.log(data);
    
    try{
        const response  = await axios.patch(`${BASE_URL}/guidelines`, data );
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}



// DELETE Guideline
export async function deleteGuidelineApiFn(id){
    console.log(id);
    
    try{
        const response  = await axios.delete(`${BASE_URL}/guidelines`, { data: { _id: id }} );
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}