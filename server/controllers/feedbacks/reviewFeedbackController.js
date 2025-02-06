const ReviewFeedbackModel = require("../../models/feedbacks/reviewFeedbackModel");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");




// CREATE Feedback
exports.createReviewFeedback = asyncWrap(async(req,res,next)=>{

    // console.log(req.body);
    // console.log(req.file);

    let data = req.body;

    
    if(req.file){
        data = {...req.body, feedbackImage:req.file.filename }
    }

    // console.log(data);
    


    if(!req.body) return next(new AppErrorGlobal("No Review Feedback Data is Received", 400))
    

    const reviewFeedback = await ReviewFeedbackModel.create(data);    
    if(!reviewFeedback) return next(new AppErrorGlobal("No Review Feedback is ceated", 400))

    res.status(200).json({
        status: 200,
        message:"Review Feedback Created Successfully",
        data:reviewFeedback
    })

})



// GET Feedback
exports.getReviewFeedbacks = asyncWrap(async(req,res,next)=>{

    let query = req.params;
    

    const reviewFeedbacks = await ReviewFeedbackModel.find({});    
    if(!reviewFeedbacks) return next(new AppErrorGlobal("No Review Feedbacks are Found", 400))

    res.status(200).json({
        status: 200,
        message:"Review Feedback is Fetched Successfully",
        data:reviewFeedbacks
    })

})




// UPDATE Feedback
exports.updateReviewFeedback = asyncWrap(async(req,res,next)=>{

    console.log(req.body);        
    let filter; 
    let updateData;
    let options;

    if(!req.body) return next(new AppErrorGlobal("No Review Feedback Data is Received", 400))



    // All Feedback Updates
    const {reviewProjectID} = req.body;   
    if(reviewProjectID){        
        filter = {_id:req.body.feedbackID}

        const data =  req.file? {...req.body, feedbackImage:req.file.filename} : {...req.body}                
        delete data.feedbackID;
        
        updateData  = {...data};
        options  = {new: true};
    }    
    

    
    // Only Feedback Status Update
    const {feedbackStatus} = req.body;    
     
    if(feedbackStatus){
        filter = {_id:req.body.feedbackID}
        updateData  = {feedbackStatus: feedbackStatus};
        options  = {new: true};
    }


    const updatedReviewFeedback = await ReviewFeedbackModel.findOneAndUpdate(filter,updateData, options);    
    if(!updatedReviewFeedback) return next(new AppErrorGlobal("No Review Feedback is Updated", 400))

    res.status(200).json({
        status: 200,
        message:"Review Feedback is Updated Successfully",
        data:updatedReviewFeedback
    })

})





// DELETE Feedback
exports.deleteReviewFeedback = asyncWrap(async(req,res,next)=>{
    if(!req.body) return next(new AppErrorGlobal("No Review Feedback Data is Received", 400))

    // All Feedback Updates
    const {feedbackId} = req.body;  
    


    const deleteReviewFeedback = await ReviewFeedbackModel.findByIdAndDelete(feedbackId);    
    if(!deleteReviewFeedback) return next(new AppErrorGlobal("No Review Feedback is deleted", 400))


    res.status(200).json({
        status: 200,
        message:"Review Feedback is deleted Successfully",
        data:deleteReviewFeedback
    })

})









// // UPDATE Feedback
// exports.updateReviewFeedback = asyncWrap(async (req, res, next) => {
//     console.log(req.body);
  
//     const { feedbackID } = req.body;
//     if (!feedbackID) {
//       return next(new AppErrorGlobal("Feedback ID is required", 400));
//     }
  
//     // Prepare update data
//     let updateData = { ...req.body };
  
//     // If a new file is uploaded, add its filename to the update data
//     if (req.file) {
//       updateData.feedbackImage = req.file.filename;
//     }
  
//     // Update the document in the database
//     const updatedReviewFeedback = await ReviewFeedbackModel.findByIdAndUpdate(
//       feedbackID,
//       updateData,
//       { new: true, runValidators: true }
//     );
  
//     if (!updatedReviewFeedback) {
//       return next(new AppErrorGlobal("No Review Feedback found with that ID", 404));
//     }
  
//     res.status(200).json({
//       status: 200,
//       message: "Review Feedback updated successfully",
//       data: updatedReviewFeedback,
//     });
//   });
  









