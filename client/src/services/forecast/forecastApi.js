import axios from "axios";
import { BASE_URL } from "../../config/config";





// CREATE Forecast
export async function createForecastApiFn(data){

    
    try{
        const response  = await axios.post(`${BASE_URL}/forecast`, data );
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}




// GET Forecast
export async function getForecastApiFn(){
    try{
        const response  = await axios.get(`${BASE_URL}/forecast`);
        // console.log(response.data.data);
        return response.data.data;

    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}



