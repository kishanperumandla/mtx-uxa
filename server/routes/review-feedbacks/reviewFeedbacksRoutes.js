const express = require('express');
const { createReviewFeedback, getReviewFeedbacks, updateReviewFeedback, deleteReviewFeedback } = require('../../controllers/feedbacks/reviewFeedbackController');

const router = express.Router();
const multer = require("multer");



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








const upload = multer({ storage });


router
.route("/")
.post(multer({storage}).single('feedbackImage'), createReviewFeedback)
.get(getReviewFeedbacks)
.patch(upload.single("feedbackImage"), updateReviewFeedback)
.delete(deleteReviewFeedback);
// .patch(updateReviewFeedback)





module.exports = router;