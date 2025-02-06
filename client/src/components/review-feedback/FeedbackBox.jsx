import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import { useDeleteReviewFeedback, useUpdateReviewFeedback } from '../../hooks/review-feedbacks/useReviewFeedbacks';
import { useCreateFeedbackComment, useDeleteFeedbackComment, useGetFeedbackComments } from '../../hooks/review-feedbacks/useFeedbackComments';
import FeedbackComment from './FeedbackComment';
import { BASE_ORIGIN } from '../../config/config';
import CreateFeedback from '../../features/feedback/CreateFeedback';
import FeedbackForm from '../../features/feedback/FeedbackForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const feedbackImageStyle= {
  width: 100,
  height: 100,
  borderRadius: '8px', // Rounded corners
  objectFit: 'cover', // Crop image if necessary
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export default function FeedbackBox({feedback, reviewProject, index}) {
    // console.log(feedback);

    
    const [open, setOpen] = React.useState(false);

    const[fdbackStatus, setFdbackStatus ] = useState( feedback.feedbackStatus || 'New');


    const{register, handleSubmit}=useForm();
    const authUser = getAuthUserFromLocalStorage();    
    
    const {updateReviewFeedbackMutationFn, isUpdatingReviewFeedback, updateReviewFeedbackError}  = useUpdateReviewFeedback()
    const {deleteReviewFeedbackMutationFn, isDeletingReviewFeedback, deleteReviewFeedbackError} = useDeleteReviewFeedback()
    

    const {createFeedbackCommentMutationFn, isCreatingFeedbackComment, FeedbackCommentError} = useCreateFeedbackComment()
    



    const reviewProjectID = reviewProject._id;
    const {feedbackComments, isFetchingfeedbackComments, fetchfeedbackCommentsError}   = useGetFeedbackComments()


    //  Filtering with "Current Review Project ID" and  "Current Feedback IDs"  
    const filteredfeedbackCommnets  =  
    feedbackComments?.filter(fdback => fdback.reviewProjectID === reviewProjectID)
    .filter(fdback => fdback.feedbackID === feedback._id)

    // console.log(filteredfeedbackCommnets);
    



    // POST Feedback Comment
    function handlePostFeedbackComment(data){
        const feedbackID = feedback._id;
        const commenterID = authUser.id;
        const feedbackComment = data.comment;
        // const reviewProjectID = reviewProject._id;

        const commentData = {feedbackID, commenterID, feedbackComment, reviewProjectID}
        createFeedbackCommentMutationFn(commentData)        
    }


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    



    // DELETE Feedback
    function handleDeleteFeedback(feedbackId){      
      deleteReviewFeedbackMutationFn(feedbackId);
    }





    // UPDATE Feedback Status
    useEffect(()=>{
      if(fdbackStatus){
        const payload = {
          reviewProjectID,
          feedbackID: feedback._id,
          feedbackStatus: fdbackStatus,
        }
        updateReviewFeedbackMutationFn(payload)
      }

    },[fdbackStatus])






  return (
    

    <Paper elevation={2} sx={{p:2, mb:4}}>
      <Stack flexDirection='row' gap={2}>
        <Typography variant='body1' fontWeight={600}> {index+1} </Typography>

        <Box key={feedback._id} flexGrow={1} >   
          <Stack direction="row" justifyContent='space-between' spacing={2} mb={2} >
            <Box flexGrow='1' >
              <Typography variant='body1' color='grey' textTransform='uppercase' fontWeight='600' mb={.5} >Feedback</Typography>
              <Typography variant='body1'  mb={2}>{feedback.comment}</Typography>

              {/* Status Picklist */}
              <FormControl sx={{width:'300px'}} >
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                  labelId="status-label"
                  id="status"
                  value={fdbackStatus}
                  {...register('status')}
                  onChange={(e)=>setFdbackStatus(e.target.value)}
                  >
                    <MenuItem value={'New'}>New</MenuItem>
                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                    <MenuItem value={'Dev Done'}>Dev Done</MenuItem>
                    <MenuItem value={'Deployed'}>Deployed</MenuItem>                                              
                    <MenuItem value={'Cannot Implement'}>Cannot Implement</MenuItem>  
            
                  </Select>
              </FormControl>

            </Box>

            {/* EDIT / DELET FEEDBACK  */} 
            <Box>
              <IconButton aria-label="edit" onClick={handleOpen}>
                <EditIcon />
              </IconButton> 

              <IconButton aria-label="delete" onClick={()=>handleDeleteFeedback(feedback._id)}>            
                <DeleteIcon />
              </IconButton>                    
            </Box>          
          </Stack>
          
          {/* SCREENSHOT Images */}
          <Box  p={1.5} mb={4} border={1} borderColor={'#bababa'} borderRadius={1.5}  >
            <Box component="img" src={`${BASE_ORIGIN}/uploads/${feedback.feedbackImage}`}  sx={feedbackImageStyle} alt="Example" />      
          </Box>

    
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >        
            <Box sx={style}>          
              <FeedbackForm reviewProject={reviewProject} editSession={true} feedback={feedback}/>
            </Box>
          </Modal>          
          

          {/* Feedback Comments */}
          <Typography variant='body1' color='grey' textTransform='uppercase' fontWeight='600' mb={.5} >Comments</Typography>
          
          <Box bgcolor={'#e9f5ff'} p={2} mb={4} borderRadius={1.5} >     

            { filteredfeedbackCommnets && filteredfeedbackCommnets.map(comment => <FeedbackComment key={comment._id} comment={comment} feedbackCommentID={comment._id}/> ) }

            <Box component="form" onSubmit={handleSubmit(handlePostFeedbackComment)}>

                <TextField
                fullWidth
                id="comment"          
                label="Comment"
                multiline
                rows={2}
                placeholder="Write Comment"
                {...register('comment')}
                />

                <Button type="button">Clear</Button>                                  
                <Button type="submit"> Post </Button>          
            </Box>
          </Box>

        </Box> 
      </Stack>

    </Paper>

  )
}
