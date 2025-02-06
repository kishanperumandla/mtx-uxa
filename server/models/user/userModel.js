const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    avatar:String,
    
    firstName: {
        type: String,
        required: true,
        // enum:["ram"],
        // trim: true,
    },
    
    lastName: {
        type: String,
        required: true,
        // trim: true,
        // unique: true,
    
    },

    email: {
        type: String,
        // required: true,
        trim: true,
        // unique: true,
    },

    password: {
        type: String,
        // required: true,
        trim: true,
        select:false
        
    },

    confirmPassword: {
        type: String,
        // required: true,
        // trim: true,
        select:false
    },

    role:{
        type: String,
        // required: true,
        enum:['Admin', 'Employee'],
        // trim: true,
    },

    job:{
        type: [String],
        enum:['Designer', 'Developer', 'Researcher', 'Accessibility-Tester', 'Unicorn'],
    },

    position:{
        type: String,
        enum:['Director', 'Manager', 'Team-Lead', 'Senior Associate', 'Associate' ],  
    },

    reviewAccess: {
        type: Boolean,
        default: true,
    },
    
    projects:{
        type:[
            { projectID: {
                    type: mongoose.Schema.ObjectId, 
                    ref:"Project"
                },
                workingCurrently: {
                    type:Boolean,                    
                } 
            }
        ],        
    },

    
    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
});





// Crypting Password
userSchema.pre('save', async function(next){
    console.log(this.password);

    if(!this.isModified('password')) return next();

    try{
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    }catch(err){
        return next(err); 
    }

})



const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;