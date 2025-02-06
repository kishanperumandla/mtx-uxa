const mongoose = require('mongoose');

const FeedbackCommentSchema = new mongoose.Schema({    
        feedbackID:String, 
        reviewProjectID:String,
        feedbackComment:String, 
        commenterID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
});



const FeedbackCommentModel = mongoose.model('FeedbackComment', FeedbackCommentSchema);

module.exports = FeedbackCommentModel;




