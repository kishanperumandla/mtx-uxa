
const mongoose = require('mongoose');

const GuidelineCommentSchema = new mongoose.Schema({    
        reviewProjectID:String,
        
        commentGuidelineID: String,
        
        commenterID: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

        comment:String, 
        images:[String],
        isCommentRead:{
            type:Boolean,
            default: false
        }               
});


const GuidelineCommentModel = mongoose.model('guidelineComment', GuidelineCommentSchema);

module.exports = GuidelineCommentModel;





// const GuidelineCommentSchema = new mongoose.Schema({    
//     reviewProjectID:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Project'
//     },
//     commentGuidelineID: {
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'Guideline'
//     },
//     commenterID: {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     },

//     comment:String, 
//     images:[String]                    
// });
