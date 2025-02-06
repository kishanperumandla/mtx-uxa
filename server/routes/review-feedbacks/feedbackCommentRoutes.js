const express = require('express');
const { createFeedbackComment, getFeedbackComments, updateFeedbackComment, deleteFeedbackComment } = require('../../controllers/feedbacks/feedbackCommentController');


const router = express.Router();


router
.route("/")
.post(createFeedbackComment)
.get(getFeedbackComments)
.patch(updateFeedbackComment)
.delete(deleteFeedbackComment)






module.exports = router;