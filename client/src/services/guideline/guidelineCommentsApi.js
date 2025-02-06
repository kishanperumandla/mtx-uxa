import axios from "axios";
import { BASE_URL } from "../../config/config";



// CREATE guideline Comments

export async function createGuidelinesCommentsApiFn(data){
    try{
        const response  = await axios.post(`${BASE_URL}/guidelines/comment` , {...data} );
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}






// GET guideline Comments
export async function getGuidelinesCommentsApiFn(){
    try{
        const response  = await axios.get(`${BASE_URL}/guidelines/comment`);
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}




// UPDATE guideline Comments

export async function updateGuidelinesCommentsApiFn(data){
    
    try{
        const response  = await axios.patch(`${BASE_URL}/guidelines/comment` , {...data} );
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}


