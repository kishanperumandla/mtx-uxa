import axios from "axios";
import { BASE_URL } from "../../config/config";


// CREATE Feedback Comments
export async function createFeedbackCommentApiFn(data){
    
    console.log(data);
    
    try{
        const response = await axios.post(`${BASE_URL}/feedback-comment`, {...data})
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}




//GET Feedbacks Comments
export async function getFeedbackCommentsApiFn(query){

    // console.log(query);
    
    
    try{
        const response  = await axios.get(`${BASE_URL}/feedback-comment`, {params: query});
        // console.log(response.data.data);
        return response.data.data;
        
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}




// UPDATE Feedback Comments
export async function updateFeedbackCommentApiFn(data){
    
    // console.log(data);
    
    try{
        const response = await axios.patch(`${BASE_URL}/feedback-comment`, data)
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}



// DELETE Feedback Comment
export async function deleteFeedbackCommentApiFn(feedbackId){    
    // console.log(feedbackId);
    
    try{
        const response = await axios.delete(`${BASE_URL}/feedback-comment`, {
            data: { feedbackId }  // Pass the payload inside 'data' key for DELETE Method
        });           
        return response.data.data;            

    }catch(err){
        console.log(err);        
        throw err;
    }
}

