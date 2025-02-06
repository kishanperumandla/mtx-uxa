
function errorHandlerFn (err,req,res,next){
    let message =  err.message;

    if(process.env.ENV === "PROD"){        
        
        // Operational Errors
        if(err.isOperational){
            console.log("PROD -- ⭕️ OPERATIONAL ERROR");      
            res.status(400).json({
                message: err.message,
                status: err.status,
                statusCode: err.statusCode,
                err,
            }) 
        }

        
        // Program Errors
        if(!err.isOperational){
            console.log("PROD -- ❌ PROGRAM ERROR", err );
            
    
            // If Validation Errors
            if(err.name === "ValidationError"){                        
                const errorMessages = Object.values(err.errors).map(error => {
                    if(error.kind === "enum") return `${error.value} is not accepted`;
                    if(error.kind === "required") return `${error.path} is ${error.kind}`;                
                });
                
                
                // Join the error messages for all fields
                message = errorMessages.join(', ');            
            }
    
            //Duplicate Values
            if(err.code === 11000){
                message = `${Object.values(err.keyValue)[0]} is found Duplicate`
            }
    
    
            // Cast Error (Invalid ObjectId)
            if (err.name === "CastError") {
                message = `Invalid ${err.path}: ${err.value}`;
                return res.status(400).json({ message, statusCode: 400 });
            }
    
            // JWT Errors
            if (err.name === "JsonWebTokenError") {
                message = "Invalid Token";
                return res.status(401).json({ message, statusCode: 401 });
            }
    
            if (err.name === "TokenExpiredError") {
                message = "Token expired";
                return res.status(401).json({ message, statusCode: 401 });
            }        
            
    
            res.status(500).json({
                message: message || "Something went wrong",
                status: "Error", 
                statusCode: 500,
                err, // Remove this later to Send to client in responds
            })         
        }

    }else{

        console.log("DEV -- 🛑 BOTH OPS/PROG ERRORS", err );   
        res.status(err.statusCode || 500).json({
            message: message || "Something went wrong",
            status: "Errorr", 
            statusCode: 500,
            err, // Remove this later to Send to client in responds
        })  
    }        
   
}


module.exports = errorHandlerFn;