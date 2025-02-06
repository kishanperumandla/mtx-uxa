
const GuidelineModel = require("../../models/guidelines/guidelineModal");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");



// CREATE Guidelines
exports.createGuideline = asyncWrap(async(req,res,next)=>{

    if(!req.body) return next(new AppErrorGlobal("No guideline Data is Received", 400))
    

    const guideline = await GuidelineModel.create(req.body);
    if(!guideline) return next(new AppErrorGlobal("No guideline is ceated", 400))

    res.status(200).json({
        status: 200,
        message:"Guideline Creates Successfully",
        data:guideline
    })

})


// GET Guidelines
exports.getGuidelines = asyncWrap(async(req,res,next)=>{
    
    const guidelines = await GuidelineModel.find({});
    if(!guidelines) return next(new AppErrorGlobal("No guidelines Are Found", 400))

    res.status(200).json({
        status: 200,
        message:"Guideline are Fectched Successfully",
        data:guidelines
    })

})




// UPDATE Guidelines
exports.updateGuidelines = asyncWrap(async(req,res,next)=>{
    
    // console.log("🅰️UPDATE::", req.body);

    if(!req.body) return next(new AppErrorGlobal("No Update Data is Received", 400))

    const updateData = req.body;
    const id = req.body._id;
    const options = {new: true}

    console.log("🅰️",  updateData, id, options);
    

    const guideline = await GuidelineModel.findByIdAndUpdate(id, updateData, options);
    if(!guideline) return next(new AppErrorGlobal("No guidelines is Updated", 400))


    res.status(200).json({
        status: 200,
        message:"Guideline is Updated Successfully",
        data:guideline
    })

})



// DELETE Guideline

// UPDATE Guidelines
exports.deleteGuideline = asyncWrap(async(req,res,next)=>{
        

    if(!req.body) return next(new AppErrorGlobal("No Update Data is Received", 400))

      const {_id: id} = req.body; 
    console.log("🅰️ Delete", req.body);
        

    const deletedGuideline = await GuidelineModel.findByIdAndDelete(id);
    if(!deletedGuideline) return next(new AppErrorGlobal("No guidelines is Deleted", 400))


    res.status(200).json({
        status: 200,
        message:"Guideline is Deleted Successfully",
        data:deletedGuideline
    })

})