const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const cookieParser = require('cookie-parser');
// const { Server } = require('socket.io');

const app = express();



// CONFIGURATIONS
dotenv.config({ path: './.env' });
app.use(cors({ origin: ['https://mtx-uxa.netlify.app', 'http://localhost:5174'], credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));





//ROUTES
const errorHandlerFn = require('./controllers/error/errorController');
const authRoutes = require('./routes/auth/authRoutes');
const userRoutes = require('./routes/user/userRoutes');
const guidelineRoutes = require('./routes/guidelines/guidelineRoutes');
const guidelineCommentRoutes = require('./routes/guidelines/guidelineCommentRoutes');
const projectRoutes = require('./routes/projects/projectRoutes');
const reviewProjectRoutes = require('./routes/review-project/reviewProjectRoutes');
const reviewFeedbackRoutes = require('./routes/review-feedbacks/reviewFeedbacksRoutes');
const feedbackCommentRoutes = require('./routes/review-feedbacks/feedbackCommentRoutes');
const projectStatsRoutes =  require ('./routes/project-stats/projectStatsRoutes')
const reviewProjectStatsRoutes =  require ('./routes/review-project-stats/reviewProjectStatsRoutes')
const forecastRoutes = require ('./routes/forecast/forecastRoutes')


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/guidelines', guidelineRoutes);
app.use('/api/v1/guidelines/comment', guidelineCommentRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/project-review', reviewProjectRoutes);
app.use('/api/v1/project-stats', projectStatsRoutes);
app.use('/api/v1/review-project-stats', reviewProjectStatsRoutes);

app.use('/api/v1/review-feedback', reviewFeedbackRoutes);
app.use('/api/v1/feedback-comment', feedbackCommentRoutes);

app.use('/api/v1/forecast', forecastRoutes);






// DATABASE Connections
mongoose.connect(process.env.MONGODB_URL).then(
    () => console.log("Database is connected")
).catch(err => console.log(err.message));




// SERVER Starting
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});




// ERROR Handling

app.use(errorHandlerFn);

// app.use((err,req,res,next)=>{
//     let message =  err.message;

//     if(process.env.ENV === "PROD"){        
        
//         // Operational Errors
//         if(err.isOperational){
//             console.log("PROD -- ⭕️ OPERATIONAL ERROR");      
//             res.status(400).json({
//                 message: err.message,
//                 status: err.status,
//                 statusCode: err.statusCode,
//                 err,
//             }) 
//         }

        
//         // Program Errors
//         if(!err.isOperational){
//             console.log("PROD -- ❌ PROGRAM ERROR", err );
            
    
//             // If Validation Errors
//             if(err.name === "ValidationError"){                        
//                 const errorMessages = Object.values(err.errors).map(error => {
//                     if(error.kind === "enum") return `${error.value} is not accepted`;
//                     if(error.kind === "required") return `${error.path} is ${error.kind}`;                
//                 });
                
                
//                 // Join the error messages for all fields
//                 message = errorMessages.join(', ');            
//             }
    
//             //Duplicate Values
//             if(err.code === 11000){
//                 message = `${Object.values(err.keyValue)[0]} is found Duplicate`
//             }
    
    
//             // Cast Error (Invalid ObjectId)
//             if (err.name === "CastError") {
//                 message = `Invalid ${err.path}: ${err.value}`;
//                 return res.status(400).json({ message, statusCode: 400 });
//             }
    
//             // JWT Errors
//             if (err.name === "JsonWebTokenError") {
//                 message = "Invalid Token";
//                 return res.status(401).json({ message, statusCode: 401 });
//             }
    
//             if (err.name === "TokenExpiredError") {
//                 message = "Token has expired";
//                 return res.status(401).json({ message, statusCode: 401 });
//             }        
            
    
//             res.status(500).json({
//                 message: message || "Something went wrong",
//                 status: "Error", 
//                 statusCode: 500,
//                 err, // Remove this later to Send to client in responds
//             })         
//         }

//     }else{

//         console.log("DEV -- 🛑 BOTH OPS/PROG ERRORS", err );   
//         res.status(err.statusCode || 500).json({
//             message: message || "Something went wrong",
//             status: "Errorr", 
//             statusCode: 500,
//             err, // Remove this later to Send to client in responds
//         })  
//     }        
   
// })