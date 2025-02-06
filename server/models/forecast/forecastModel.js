const mongoose = require('mongoose');

const forecastSchema = new mongoose.Schema({
    projectName:String,   
    
    forecastData:[
        {
            forecastHour: String,
            domain: String,
        }
    ],
    availability:String,  
    
    teamMemberId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    
      
    //   Remove below one whole teamMember
    teamMember: {
        name: String,
        id: String,
        teamId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        avatar:String
    },


    week: Number,
    weekStartDate: String,
    weekEndDate: String,
         
     
})



const ForecastModel = mongoose.model('forecast',forecastSchema);

module.exports = ForecastModel;