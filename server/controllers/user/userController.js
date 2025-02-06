const UserModel = require("../../models/user/userModel");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");



// GET Gusers
exports.getUsers = asyncWrap(async(req,res,next)=>{
    let queryObj={};

    const {id: userId} = req.query



    // Query user by ID
    if(userId){
        queryObj = {'_id': userId}
    }

    
    
    const users = await UserModel.find(queryObj);
    if(!users) return next(new AppErrorGlobal("No users Found", 400))

    res.status(200).json({
        status: 200,
        message:"Success",
        data:users
    })

})




//UPDATE User

exports.updateUser = asyncWrap(async (req, res, next) => {
    // console.log('🅰️', req.file);

    let filter = {}; 
    let updateData = {}; 




    // UPDATE Avatar
    const file = req.file;

    if (file) {
        updateData = { avatar: file.filename };
        filter = { _id: req.body.userId }; 
    }



    // UPDATE User Info
    const userUpdateDate = req.body;
    const {updateUserInfo} = userUpdateDate;


    if(updateUserInfo){
        // Remove the Flag "updateUserInfo"
        delete userUpdateDate.updateUserInfo;        

        updateData = userUpdateDate;
        filter = {_id: userUpdateDate.userId }
        
    }

    





    const updatedUser = await UserModel.findOneAndUpdate(
        filter,                 // Filter to match the user
        { $set: updateData },   // Data to update
        { new: true }           // Return the updated document
    );


    if (!updatedUser) {return next(new AppErrorGlobal("No users found with the provided ID", 400))}

    res.status(200).json({
        status: 200,
        message: "User is updated successfully",
        data: updatedUser
    });
});

