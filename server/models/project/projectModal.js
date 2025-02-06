const mongoose = require('mongoose');

const ProjectSchema =  mongoose.Schema({
    projectName: String,
    

    projectTeam:[{
        teamMemberID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        roleInProject: [String]
    }],

    
    // projectTeam:String,

    projectStatus:{
        type:String, 
        enum:['Research', 'Development', 'Design', 'UAT', 'Closed', 'Enhancements' ],        
    },

    startDate: Date,
    endDate: Date,
    createdByID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    projectThumbnail:String,
    // reviewStatus:{
    //     type:String,
    //     enum:['Not Reviewed', 'Pahse 1', 'Pahse 2']
    // },


    // projectReviewScore:Number,
    // projectHealth:String,
    // designFile:String,
    // DevCreds:String,
})



const ProjectModel =  mongoose.model('Project', ProjectSchema );

module.exports = ProjectModel;