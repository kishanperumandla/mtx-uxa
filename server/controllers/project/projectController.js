const ProjectModel = require("../../models/project/projectModal");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");
const mongoose = require('mongoose');




// CREATE Project
exports.createProject = asyncWrap(async(req,res,next)=>{

    if(!req.body) return next(new AppErrorGlobal("No project Data is Received", 400))        
        
    let projectData = {...req.body, projectTeam: JSON.parse(req.body.projectTeam).map(team => team)};    
    
    
    
    // console.log(req.file);

    if(req.file){
        projectData= {...projectData, [req.file.fieldname]: req.file.filename }
    }


    



    const project = await ProjectModel.create(projectData);
    console.log(project);
    if(!project) return next(new AppErrorGlobal("No project is ceated", 400))

    res.status(200).json({
        status: 200,
        message:"Project is created Successfully",
        data:project
    })

})






// UPDATE Project


exports.updateProject = asyncWrap(async (req, res, next) => {
    if (!req.body) {
        return next(new AppErrorGlobal("No update project Data is Received", 400));
    }

    console.log("---from UPDATE Project Controller");


    const filter = { _id: req.body.projectId }; // Ensure filter is defined early
    let updateData = { ...req.body, projectTeam: JSON.parse(req.body.projectTeam) };



    // Convert projectTeam.teamMemberID to ObjectId
    if (updateData.projectTeam) {
        updateData.projectTeam = updateData.projectTeam.map((team) => ({
            ...team,
            teamMemberID: new mongoose.Types.ObjectId(team.teamMemberID), // Correct usage
        }));
    }

    // Convert other fields to ObjectId if needed
    if (updateData.createdByID) {
        updateData.createdByID = new mongoose.Types.ObjectId(updateData.createdByID); // Correct usage
    }

    if (req.file) {
        updateData = { ...updateData, [req.file.fieldname]: req.file.filename };
    }

    delete updateData.projectId; // Remove unnecessary fields from update data

    // console.log("🍒",updateData);
    // console.log("🥝",filter);

    const options = { new: true }; // Ensure updated document is returned
    
    const project = await ProjectModel.findOneAndUpdate(filter, updateData, options);

    console.log('****',project);
    

    if (!project) {
        return next(new AppErrorGlobal("No project is updated", 400));
    }

    res.status(200).json({
        status: 200,
        message: "Project is updated successfully",
        data: project,
    });
});










// GET Projects
exports.getProjects = asyncWrap(async(req,res,next)=>{
    
    const { authUserId } = req.query;
    let queryObj = {};
    
    if (authUserId) {        
        queryObj = { "projectTeam.teamMemberID": { '_id': authUserId} };
    }
        
    
    
    let projects = await ProjectModel.find(queryObj)
    .populate('projectTeam.teamMemberID')
    .populate('createdByID');
  

    // projects = projects.filter(item => item)

    //  projects = await ProjectModel.find()


    console.log(projects);
    



    
    
    

    if(!projects) return next(new AppErrorGlobal("No Project is Created", 400))

    res.status(200).json({
        status: 200,
        message:"Projects are Created Successfully",
        data:projects
    })

})
