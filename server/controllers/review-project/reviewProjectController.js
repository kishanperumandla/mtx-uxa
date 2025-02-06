const { default: mongoose } = require("mongoose");
const GuidelineModel = require("../../models/guidelines/guidelineModal");
const ReviewProjectModel = require("../../models/review-project/reviewProjectModal");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");






// CREATE Review Project
exports.createReviewProject = asyncWrap(async(req,res,next)=>{    
    if(!req.body) return next(new AppErrorGlobal("No project Data is Received", 400))
        
    let reviewProjectData = req.body;

    console.log(reviewProjectData);
    
    
    // // IF Guidelines Exist
    // const allGuidelines = await GuidelineModel.find();

    // if(allGuidelines.length>0){
    //     const guidelines = allGuidelines.map(item => ({guidelineID: item.id, guidelineScore:10, guidelineStatus:"Satisfied" }) );
    //     reviewProjectData = { ...req.body, guidelines };
    //     // reviewProjectData = { ...req.body, guidelineIDs };
    // }



    const reviewProject = await ReviewProjectModel.create(reviewProjectData);
    if(!reviewProject) return next(new AppErrorGlobal("No Review project is ceated", 400))

    res.status(200).json({
        status: 200,
        message:"Review Project is created Successfully",
        data:reviewProject
    })

})




// GET Review Project
exports.getReviewProjects = asyncWrap(async(req,res,next)=>{

    let query = req.query;
    

    // const reviewProjects = await ReviewProjectModel.find().populate('guidelineIDs');
    const reviewProjects = await ReviewProjectModel.find(query)
        .populate({
            path: 'projectID',
            populate: [
                { path: 'createdByID', model: 'User' }, // Populates createdByID with User data
                { path: 'projectTeam.teamMemberID', model: 'User' } // Populates team members if needed
            ]
        })
        .populate({
            path: 'reviewGuidelines',
            populate: [
                { path: 'guidelineID', model: 'Guideline' }, // Populates createdByID with User data
                
            ]
        })
        .populate('reviewTeam.teamMemberID'); // Populates review team members

    if(!reviewProjects) return next(new AppErrorGlobal("No Review projects Found", 400))


    res.status(200).json({
        status: 200,
        message:"Review Projects are Fetched Successfully",
        data:reviewProjects
    })

})






// UPDATE Review Project
exports.updateReviewProject = asyncWrap(async (req, res, next) => {
    if (!req.body) {
        return next(new AppErrorGlobal("No project update data is received", 400));
    }


    console.log("🍎", req.body);
    

    let filter;
    let update;
    let options;

    const {guidelineScore } = req.body;
    const { guidelineStatus } = req.body;
    const { editReviewProject } = req.body;
    

    
    if(guidelineScore) {
        const { reviewProjectId, reviewGuidelineId } = req.body;
        filter = {_id:reviewProjectId, "reviewGuidelines._id":reviewGuidelineId}; // Find project and specific guideline
        update = {"reviewGuidelines.$.guidelineScore": guidelineScore} // Update the guidelineScore      
        options = { new: true }
    }

    if(guidelineStatus) {
        const { reviewProjectId, reviewGuidelineId } = req.body;
        filter = {_id:reviewProjectId, "reviewGuidelines._id":reviewGuidelineId}; // Find project and specific guideline
        update = {"reviewGuidelines.$.guidelineStatus": guidelineStatus} // Update the guidelineScore      
        options = { new: true }
    }

    if(editReviewProject){
        let { reviewProjectId, ...updateData } = req.body;
        filter = {_id: reviewProjectId};
        update = updateData;
        options = { new: true }
    }
    


    // Update
    const updatedReviewProject = await ReviewProjectModel.findOneAndUpdate(filter, update, { new: true } );

    if (!updatedReviewProject) {
        return next(new AppErrorGlobal("No review project is updated", 400));
    }

    res.status(200).json({
        status: 200,
        message: "Review project is updated successfully",
        data: updatedReviewProject
    });
});













// GET SIngle Review Project
exports.getSingleReviewProject = asyncWrap(async(req,res,next)=>{
    console.log("🍊GET Single Review Project Controller");
    const projId = req.params.id

    const reviewProject = await ReviewProjectModel.findOne({ _id: projId }).populate('guidelineIDs');
    console.log(reviewProject);
    
  
    if(!reviewProject) return next(new AppErrorGlobal("No Review project is Found", 400))


    res.status(200).json({
        status: 200,
        message:"Review Project is Fetched Successfully",
        data:reviewProject
    })

})