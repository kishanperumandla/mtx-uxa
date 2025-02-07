const ReviewProjectModel = require("../../models/review-project/reviewProjectModal");
const asyncWrap = require("../../utility/ayncWrap");

exports.getReviewProjectStats = asyncWrap(async (req, res, next) => {
    const getProjectsByScore = async (minScore, maxScore) => {
        return await ReviewProjectModel.aggregate([
            {
                $addFields: {
                    numericReviewScore: { $toDouble: "$totalReviewScore" }
                }
            },
            {
                $match: {
                    numericReviewScore: { $gte: minScore, $lt: maxScore }
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "projectID",
                    foreignField: "_id",
                    as: "projectDetails"
                }
            },
            { $unwind: "$projectDetails" },
            {
                $group: {
                    _id: "$projectID",
                    project: { $first: "$projectDetails" }
                }
            }
        ]);
    };

    // Fetch categorized projects
    const excellentProjects = await getProjectsByScore(4.5, 5.1);
    const goodProjects = await getProjectsByScore(3, 4.5);
    const badProjects = await getProjectsByScore(1, 3);

    // Fetch all projects with name and score
    const allProjectsScores = await ReviewProjectModel.aggregate([
        {
            $addFields: {
                numericReviewScore: { $toDouble: "$totalReviewScore" }
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "projectID",
                foreignField: "_id",
                as: "projectDetails"
            }
        },
        { $unwind: "$projectDetails" },
        {
            $project: {
                _id: 0,
                projectName: "$projectDetails.projectName",
                totalReviewScore: "$numericReviewScore"
            }
        }
    ]);

    // Combine results
    const reviewProjectStats = { excellentProjects, goodProjects, badProjects, allProjectsScores };

    res.status(200).json({
        status: 200,
        message: "Review Project Stats fetched successfully",
        data: reviewProjectStats
    });
});
