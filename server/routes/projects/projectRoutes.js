const express = require('express');
const { createProject, getProjects, updateProject } = require('../../controllers/project/projectController');
const multer = require('multer');


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'uploads'); // Define the uploads folder
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        return cb(null, fileName); // Generate a unique filename
    }
});


const router = express.Router();



router
.route('/')
.post( multer({storage}).single('projectThumbnail'),createProject)
.get( getProjects)
.patch( multer({storage}).single('projectThumbnail'), updateProject)



module.exports = router;