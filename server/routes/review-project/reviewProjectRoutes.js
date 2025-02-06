const express = require('express');
const { createReviewProject, getReviewProjects, getSingleReviewProject, updateReviewProject } = require('../../controllers/review-project/reviewProjectController');



const router = express.Router();





router
.route("/")
.post(createReviewProject)
.get(getReviewProjects)
.patch(updateReviewProject)


// router
// .route("/:id")
// .get(getSingleReviewProject)




module.exports = router;