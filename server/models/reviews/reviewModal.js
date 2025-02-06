const mongoose = require('mongoose');

const ReviewSchema =  mongoose.Schema({
    reviewProjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'  // This is optional, and used if you are referencing another collection
      },
    domain: "Desgin", 
    
    guidelineReviews:[
        {
            guidelineID:{
                type: mongoose.Schema.Types.ObjectId,
                type:"Guideline"
            },
            guidelineScore:Number,
            guidelineStatus:String,
            guidelineComments:[
                {
                    comment:String,
                    images:[String],
                    commentedDate: Date,
                    commenterID:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"Guideline"
                    }
                }
            ]
        }
    ],


    feedbacks:[
        {
            guidelineID:{
                type: mongoose.Schema.Types.ObjectId,
                type:"Guideline"
            },
            feedbackArea:String,
            feedbackTitle:String,
            description:String,
            images:[String],
            priority:String,
            assignedTo:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"                
            },
            status:String,

            feedbackComments:[
                {
                    comment:String,
                    images:[String],
                    commentedDate: Date,
                    commenterID:{
                        type: mongoose.Schema.Types.ObjectId,
                        type:"Guideline"
                    }
                }
            ]
        }
    ],





    // reviews:[
    //     {
    //         name:{
    //             type: String,
    //             enum:['Research', "Design", "Development", "Accessibility"]                
    //         },
    //         guideline: String,
    //         status: String,
    //         projectTeamComment:[String],          
    //         reviewerComment: [String],
    //         referenceLink:String,
    //         ReviewScore: Number
    //     }
    // ]
})




const ReviewModel =  ProjectName.model('Review', ReviewSchema );

module.exports = ReviewModel;