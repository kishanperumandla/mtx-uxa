
const GuidelineCommentModel = require("../../models/guidelines/guidelineCommentModel");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");



// CREATE Guideline comment
exports.createGuidelineComment = asyncWrap(async(req,res,next)=>{

    if(!req.body) return next(new AppErrorGlobal("No guideline comments Data is Received", 400))
    

    const guidelineComment = await GuidelineCommentModel.create(req.body);
    if(!guidelineComment) return next(new AppErrorGlobal("No guideline comment is ceated", 400))
      
    console.log(guidelineComment.comment);
    
        
    // Emit the new comment to all connected clients
    req.app.get('io').emit('newComment', guidelineComment);

    res.status(200).json({
        status: 200,
        message:"Guideline Comment is Posted Successfully",
        data:guidelineComment
    })

})



// GET Guidelines Comments
exports.getGuidelinesComments = asyncWrap(async(req,res,next)=>{
    
    const guidelineComments = await GuidelineCommentModel.find({})     
    .populate('commenterID')
    if(!guidelineComments) return next(new AppErrorGlobal("No guidelines comments are Found", 400))

    res.status(200).json({
        status: 200,
        message:"Guideline Comments are Fectched Successfully",
        data:guidelineComments
    })

})



// UPDATE Guideline comment
exports.updateGuidelineComment = asyncWrap(async (req, res, next) => {
    console.log('Hello');
    console.log("🍏", req.body);

    // Validate request body
    if (!req.body._id) return next(new AppErrorGlobal("No comment ID provided for update", 400));
    if (req.body.isCommentRead === undefined) return next(new AppErrorGlobal("No update data received", 400));

    // Find the comment by ID and update the isCommentRead field
    const guidelineComment = await GuidelineCommentModel.findByIdAndUpdate(
        req.body._id, // Filter: Comment ID
        { isCommentRead: req.body.isCommentRead }, // Update data
        { new: true } // Return the updated document
    );

    if (!guidelineComment) return next(new AppErrorGlobal("No guideline comment found for the provided ID", 404));

    // Emit the updated comment to all connected clients
    req.app.get('io').emit('updatedComment', guidelineComment);

    res.status(200).json({
        status: 200,
        message: "Guideline Comment updated successfully",
        data: guidelineComment,
    });
});

