const mongoose = require('mongoose');

const ReviewProjectSchema =  mongoose.Schema({
    projectID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    },
    
    reviewPhase:{
        type:String,
        enum:['Not Started', 'Phase 1', 'Phase 2']
    },

    reviewTeam:[{
        teamMemberID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        reviewDomain: [String],
        
        reviewRole: String,        
    }],

    // reviewTeam:{
    //     type: String        
    // },

    reviewGuidelines: [
        {
            guidelineID: {
                type: mongoose.Schema.ObjectId,
                ref: 'Guideline'
            },
            guidelineScore: {
                type: Number,
                default: 0
            },
            guidelineStatus:{
                type:String,
                default: "In Progress"
            }
        }
    ],

    feedbacks:String,

    projectReviewScore:Number,
    projectHealth:String,
    designFile:String,
    devCreds:String,    
    lastReviewDate: Date,    
})



const ReviewProjectModel =  mongoose.model('ReviewProject', ReviewProjectSchema );

module.exports = ReviewProjectModel;