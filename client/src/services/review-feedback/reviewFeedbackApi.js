import axios from "axios";
import { BASE_URL } from "../../config/config";


// CREATE Review Feedback
export async function createReviewFeedbackApiFn(data){        
    
    try{
        const response = await axios.post(`${BASE_URL}/review-feedback`, 
            data, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}




//GET Review Feedbacks
export async function getReviewFeedbacksApiFn(){
    try{
        const response  = await axios.get(`${BASE_URL}/review-feedback`);
        // console.log(response.data.data);
        return response.data.data;
        
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}



// UPDATE Review Feedback
export async function updateReviewFeedbackApiFn(data){
     
    try{
        const response = await axios.patch(`${BASE_URL}/review-feedback`, data,             {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        } )
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}



// DELETE Review Feedback
export async function deleteReviewFeedbackApiFn(feedbackId){
    //  console.log(feedbackId);
     
    try{
        const response = await axios.delete(`${BASE_URL}/review-feedback`, {
            data:{feedbackId}
        } )
        
        // console.log(response);        
        return response.data.data;            

    }catch(err){
        console.log(err);
        
        throw err;
    }
}