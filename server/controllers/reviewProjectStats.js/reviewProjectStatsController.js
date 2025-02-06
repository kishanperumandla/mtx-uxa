
const ReviewProjectModel = require("../../models/review-project/reviewProjectModal");
const asyncWrap = require("../../utility/ayncWrap");



exports.getReviewProjectStats = asyncWrap(async(req,res,next)=>{

    const excellentProjects = await ReviewProjectModel.aggregate([
        { $match: { projectReviewScore: { $eq: 5 } } },
        {
            $lookup: {
                from: "projects",
                localField: "projectID",
                foreignField: "_id",
                as: "projectDetails",
            },
        },
        {
            $unwind: "$projectDetails",
        },
        {
            $group: {
                _id: "$projectID", // Keep `_id` as the original `projectID`
                project: { $first: "$projectDetails" }, // Include the full object separately                
            },
        },
    ]);

    const goodProjects = await ReviewProjectModel.aggregate([
        { $match: { projectReviewScore: { $gte: 3 } } },
        {
            $lookup: {
                from: "projects",
                localField: "projectID",
                foreignField: "_id",
                as: "projectDetails",
            },
        },
        {
            $unwind: "$projectDetails",
        },
        {
            $group: {
                _id: "$projectID", // Keep `_id` as the original `projectID`
                project: { $first: "$projectDetails" }, // Include the full object separately                
            },
        },
    ]);


    const badProjects = await ReviewProjectModel.aggregate([
        { $match: { projectReviewScore: { $lt: 3 } } },
        {
            $lookup: {
                from: "projects",
                localField: "projectID",
                foreignField: "_id",
                as: "projectDetails",
            },
        },
        {
            $unwind: "$projectDetails",
        },
        {
            $group: {
                _id: "$projectID", // Keep `_id` as the original `projectID`
                project: { $first: "$projectDetails" }, // Include the full object separately                
            },
        },
    ]);



    const reviewProjectStats ={
        excellentProjects,
        goodProjects, 
        badProjects
    }

    

    res.status(200).json({
        status: 200,
        message:"Review Project Stats are fetched Successfully",
        data:reviewProjectStats

    })

})

