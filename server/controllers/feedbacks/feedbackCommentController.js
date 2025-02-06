
const FeedbackCommentModel = require("../../models/feedbacks/feedbackCommentModel");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");




// CREATE Feedback Comment
exports.createFeedbackComment = asyncWrap(async(req,res,next)=>{    
    if(!req.body) return next(new AppErrorGlobal("No Feedback Comment Data is Received", 400))
    
    const reviewFeedback = await FeedbackCommentModel.create(req.body);    
    if(!reviewFeedback) return next(new AppErrorGlobal("No Feedback Comment is ceated", 400))

    res.status(200).json({
        status: 200,
        message:"Feedback Comment is Created Successfully",
        data:reviewFeedback
    })

})



// GET Feedback Comment
exports.getFeedbackComments = asyncWrap(async(req,res,next)=>{
    let queryObj;

    // const {reviewProjectID} = req.query 


    // if(reviewProjectID){
    //     queryObj = {reviewProjectID};
    // }

    // console.log(queryObj);
    
    const reviewFeedbacks = await FeedbackCommentModel.find(queryObj)
    .populate("commenterID"); 
    // console.log(reviewFeedbacks);
       
    if(!reviewFeedbacks) return next(new AppErrorGlobal("No Feedback Comments are Found", 400))

    res.status(200).json({
        status: 200,
        message:"Feedback comments are Fetched Successfully",
        data:reviewFeedbacks
    })

})



// UPDATE Feedback Comment
exports.updateFeedbackComment = asyncWrap(async(req,res,next)=>{
    if(!req.body) return next(new AppErrorGlobal("No Feedback Comment Update Data is Received", 400))

    console.log(req.body);

    let filter;
    let update;
    let options;

    const {comment} = req.body;

    if(comment){
        filter={_id:req.body.feedbackCommentID};
        update = { feedbackComment: req.body.comment };
        options = {new: true}
    }    

    const updatedFeedbackCommnet = await FeedbackCommentModel.findOneAndUpdate(filter, update, options);    
    if(!updatedFeedbackCommnet) return next(new AppErrorGlobal("No Feedback Comment is Updated", 400))

    res.status(200).json({
        status: 200,
        message:"Feedback Comment is updated Successfully",
        data:updatedFeedbackCommnet
    })  

})




// // DELETE Feedback Comment
exports.deleteFeedbackComment = asyncWrap(async (req, res, next) => {
    if (!req.body) {
        return next(new AppErrorGlobal("No Feedback Comment Update Data is Received", 400));
    }

    const { feedbackId } = req.body;
    console.log("ID:",feedbackId);

    const deleteFeedbackComment = await FeedbackCommentModel.findByIdAndDelete(feedbackId);  // Corrected

    if (!deleteFeedbackComment) {
        return next(new AppErrorGlobal("No Feedback Comment is Deleted", 400));
    }

    res.status(200).json({
        status: 200,
        message: "Feedback Comment is deleted Successfully",
        data: deleteFeedbackComment
    });
});

