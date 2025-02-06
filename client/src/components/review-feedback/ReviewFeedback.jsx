import React from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useCreateReviewFeedback, useGetReviewFeedbacks } from '../../hooks/review-feedbacks/useReviewFeedbacks';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import CreateFeedback from '../../features/feedback/CreateFeedback';
import FeedbackBox from './FeedbackBox';
import { useCreateFeedbackComment, useGetFeedbackComments } from '../../hooks/review-feedbacks/useFeedbackComments';




export default function ReviewFeedback({reviewProject}) {

    const {reviewFeedbacks, isFetchingReviewFeedbacks, fetchReviewFeedbacksError} = useGetReviewFeedbacks()        
    const filteredReviewFeedbacks = reviewFeedbacks && reviewFeedbacks.filter(feedback => feedback.reviewProjectID === reviewProject._id )

    // console.log(filteredReviewFeedbacks);
    
  return (
    <>

        <CreateFeedback reviewProject={reviewProject}/>               

        {
          filteredReviewFeedbacks?.map((feedback, index) => 
          <FeedbackBox key={feedback._id} index={index} feedback={feedback} reviewProject={reviewProject} />
        )    
        }
    </>
  )
}
