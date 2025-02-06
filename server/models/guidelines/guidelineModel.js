const mongoose = require('mongoose');

const GuidelineSchema = new mongoose.Schema({    
    guidelineName:{
        type: String,
        enum: ['Research', 'Design', 'Development', 'Accessibility'],  // Defined categories
    },
    category:{
        type: String,                   
    },
   
});


const GuidelineModel = mongoose.model('Guideline', GuidelineSchema);

module.exports = GuidelineModel;
