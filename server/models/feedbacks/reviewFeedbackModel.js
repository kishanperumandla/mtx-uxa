
const mongoose = require('mongoose');


const ReviewFeedbackSchema = new mongoose.Schema({    
        reviewProjectID:String,            
        feedbackStatus: String, 
        domain:String,   
        comment:String, 
        category:String, 
        location:String, 
        priority:String, 
        // status:String, 
        feedbackImage:String,

        images:[String],

        commenterID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

        isCommentRead:{
            type:Boolean,
            default: false
        },
        

        feedbackComments:[
            {
                feedbackID:String,
                feedbackComment:String ,
                commenterID: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                }                               
            }
        ]

});



const ReviewFeedbackModel = mongoose.model('ReviewFeedback', ReviewFeedbackSchema);

module.exports = ReviewFeedbackModel;




