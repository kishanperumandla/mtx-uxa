const express = require('express');
const {getUsers, updateUser} = require('../../controllers/user/userController');
const { protectRoute } = require('../../controllers/auth/authController');
const router = express.Router();
const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where files will be stored
        // console.log("🍒", file);        
        cb(null, 'uploads');
    },

    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        return cb(null, fileName); // Generate a unique filename
    }

})

const upload = multer({ storage: storage });





router
.route('/')
.get( protectRoute, getUsers)
.patch( upload.single('avatar'), updateUser)


module.exports = router;