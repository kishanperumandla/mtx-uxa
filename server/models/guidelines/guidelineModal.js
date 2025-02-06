const mongoose = require('mongoose');

const GuidelineSchema = new mongoose.Schema({    
    domain:{
        type: String,
        enum: ['Research', 'Design', 'Development', 'Accessibility'],  // Defined categories
    },
    category:{
        type: String,                   
    },
    guidelineName: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    referenceLink: {
        type: String,        
    },
    guidelineScore: {
        type: Number,
        min: 0,   // Minimum score of 0
        max: 5,   // Maximum score of 5
    },
    createdBy: String    
});


const GuidelineModel = mongoose.model('Guideline', GuidelineSchema);

module.exports = GuidelineModel;
