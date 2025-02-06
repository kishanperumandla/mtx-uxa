const UserModel = require("../../models/user/userModel");
const AppErrorGlobal = require("../../utility/appErrorGlobal");
const asyncWrap = require("../../utility/ayncWrap");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//REGISTER
exports.register = asyncWrap(async (req, res, next) => {
    const user = await UserModel.create(req.body);
    if(!user) return next(new AppErrorGlobal("No user was Created", 400))

    res.status(200).json({
        message: "Success",
        data: user,
    });
});





//LOGIN
exports.login = asyncWrap(async (req, res, next) => {
    // Fetch existing user based on email
    const user = await UserModel.findOne({email: req.body.email}).select('+password');
    
    if (!user) return next(new AppErrorGlobal("No user is found with the email", 404));
    
    // Validate password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return next(new AppErrorGlobal("Your password is incorrect", 404));

    // Remove password from user object before sending to client
    user.password = undefined;

    
    // Create JWT tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, { expiresIn: '2h' });



    // Send access token and user data (excluding sensitive info)
    res.status(200).json({
        message: "Success",
        accessToken,  // send access token separately
        refreshToken,
        user: {
            id: user._id,
            email: user.email,
            userFullName: user.firstName +" "+ user.lastName ,
            avatar: user.avatar,
            // Include other non-sensitive fields you want to send
        }
    });
});





//PROTECTED 
exports.protectRoute = asyncWrap(async (req,res,next)=>{
   
    
    const accessToken =  req.headers.authorization.split(' ')[1];
    const decoded =  jwt.verify(accessToken, process.env.JWT_PASSWORD);
        

    // if(!decoded) 

    // console.log("🍋",decoded);
    


    next();
})





//REFRESH token
exports.refreshToken = asyncWrap(async (req,res,next)=>{

    // console.log("🥑Helooo");
    console.log("🥑", req.headers.authorization);
    
    const refreshToken =  req.headers.authorization.split(' ')[1];
    const decoded =  jwt.verify(refreshToken, process.env.JWT_PASSWORD);

    console.log(decoded);
    
    const userId = decoded.id;

    const user = await UserModel.findById(userId);
    
    const newAccessToken = jwt.sign({id: decoded.id}, process.env.JWT_PASSWORD, {expiresIn: '15m'} );



    res.status(200).json({
        newAccessToken,
        user,
    })

    // console.log("🥑", decoded);
    
    
})
