const express = require('express');
const { createGuidelineComment, getGuidelinesComments, updateGuidelineComment } = require('../../controllers/guideline/guidelineCommentController');


const router = express.Router();



router
.route("/")
.post(createGuidelineComment)
.get(getGuidelinesComments)
.patch(updateGuidelineComment)



module.exports = router;