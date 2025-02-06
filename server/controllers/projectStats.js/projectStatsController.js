const ProjectModel = require("../../models/project/projectModal");
const asyncWrap = require("../../utility/ayncWrap");



exports.getProjectStats = asyncWrap(async(req,res,next)=>{

    const UATProjects = await ProjectModel.aggregate([
        { $match: { projectStatus: {$eq: 'UAT' } } },
        { 
            $group: { 
                _id: '$projectName', 
                UATProjectsCount: { $sum: 1 } 
            } 
        }
    ]);

    const ResearchProjects = await ProjectModel.aggregate([
        { $match: { projectStatus: {$eq: 'Research' } } },
        { 
            $group: { 
                _id: '$projectName', 
                researchProjectsCount: { $sum: 1 } 
            } 
        },        
    ]);


    const projectStats ={
        UATProjects,
        ResearchProjects
    }

    

    res.status(200).json({
        status: 200,
        message:"Project Stats are fetched Successfully",
        data:projectStats
        // data:{data:"projectStats"}
    })

})

