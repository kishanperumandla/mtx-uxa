import React from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, styled, TextField, Typography } from '@mui/material'
import { useCreateReviewFeedback } from '../../hooks/review-feedbacks/useReviewFeedbacks';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import { useForm } from 'react-hook-form';
import BackupIcon from '@mui/icons-material/Backup';
import FeedbackForm from './FeedbackForm';
import AddIcon from '@mui/icons-material/Add';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const VisuallyHiddenInput = styled('input')({
clip: 'rect(0 0 0 0)',
clipPath: 'inset(50%)',
height: 1,
overflow: 'hidden',
position: 'absolute',
bottom: 0,
left: 0,
whiteSpace: 'nowrap',
width: 1,
}); 



export default function CreateFeedback({reviewProject}) {
    const{register, handleSubmit}=useForm();
    const [open, setOpen] = React.useState(false);
    const {createReviewFeedbackMutationFn, isCreatingReviewFeedback, reviewFeedbackError} = useCreateReviewFeedback()

    const authUser = getAuthUserFromLocalStorage();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    // function handleSubmitPost(data){
    //     // console.log(data);

    //     const formData = new FormData();

    //     formData.append('feedbackImage', data.feedbackImage[0]);
    //     formData.append('domain', data.domain);
    //     formData.append('reviewProjectID', reviewProject._id );
    //     formData.append('commenterId', authUser.id);
    //     formData.append('comment', data.feedbackComment);
    //     formData.append('feedbackStatus', data.feedbackStatus);
    //     formData.append('category', data.category);
    //     formData.append('priority', data.priority);
    //     formData.append('location', data.location);
        
    //     for (const [key, value] of formData.entries()) {
    //         console.log(`${key}:`, value);
    //     }

    //     createReviewFeedbackMutationFn(formData)


    //     // const commenterId = authUser.id;
    //     // const comment = data.feedbackComment;
    //     // const feedbackStatus = "New";
    //     // const category = data.category;
    //     // const priority = data.priority;        
    //     // const location = data.location;

    //     // const payload = { commenterId, comment, feedbackStatus, category, priority, location,  reviewProjectID:reviewProject._id };
    //     // console.log(payload);
        

    //     // createReviewFeedbackMutationFn(payload)
        
    // }

  
    return (
    <div>

        <Stack direction='row' justifyContent='space-between' mb={2}>
          <Typography variant='h2'>Detailed Feedback</Typography> 
          <Button variant='contained' onClick={handleOpen} startIcon={<AddIcon/>} >Create Feedback </Button>
        </Stack>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">            
            <Box sx={style}>
                <Typography variant='h1' mb={3}>Create Feedback</Typography>
                <Box className='modal-body'>
                  <FeedbackForm reviewProject={reviewProject}/>
                </Box>
            </Box>
        </Modal>
    </div> 
  )
}
