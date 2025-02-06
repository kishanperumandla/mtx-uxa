import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDeleteFeedbackComment, useGetFeedbackComments, useUpdateFeedbackComment } from '../../hooks/review-feedbacks/useFeedbackComments'
import { useForm } from 'react-hook-form';
import { BASE_ORIGIN } from '../../config/config';


const avatarStyle= {
    width: 24,
    height: 24,
    borderRadius: '16px', 
    objectFit: 'cover',    
  }

export default function FeedbackComment({ reviewProjectID, feedbackCommentID, comment}) {

    const {register, handleSubmit} =useForm();
    const[showEditBox, setShowEditBox ] = useState(false);

    // console.log(comment);
    


    const {updateFeedbackCommentMutationFn, isUpdatingFeedbackComment, updateFeedbackCommentError}  = useUpdateFeedbackComment()
    const {deleteFeedbackCommentMutationFn, isDeletingFeedbackComment, deleteFeedbackCommentError}   = useDeleteFeedbackComment()
    

    function handleUpdateComment(e){
        console.log(e);
        setShowEditBox(true)                
    }


    function handleSaveFeedbackComment(data){
        const updateData  = {feedbackCommentID, comment: data.comment};
        console.log(updateData);
                
        updateFeedbackCommentMutationFn(updateData);
        setShowEditBox(false)
    }
    

    // DELETE Feedback Comment
    function handleDeleteComment(){      
        deleteFeedbackCommentMutationFn(feedbackCommentID);
      }
  
      

    return (  
        
            !showEditBox?
            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>        
                <Stack direction='row' spacing={1} alignItems='center'>                    
                    <Box component="img" src={`${BASE_ORIGIN}/uploads/${comment?.commenterID.avatar}`}  sx={avatarStyle} alt="User Avatar" />
                    <Typography  variant='p'> {comment.feedbackComment} </Typography>
                </Stack>

                <Stack direction='row' spacing={.5} alignItems='center'> 
                    <Button onClick={handleUpdateComment}>Edit</Button>
                    <Button onClick={handleDeleteComment}>Delete</Button>
                </Stack>
            </Stack> :

            <Box component="form" onSubmit={handleSubmit(handleSaveFeedbackComment)}>

                <TextField
                id="comment"          
                label="Comment"
                multiline
                rows={2}
                placeholder="Write Comment"
                defaultValue={comment.feedbackComment}
                {...register('comment')}
                />

                <Button variant="contained" type="submit"> Post </Button>

                <Button type="button">Clear</Button>                          
                <Button type="button" onClick={()=>setShowEditBox(false)}>Cancel</Button>                        
            </Box>
        





        // feedbackComments && feedbackComments.map(comment => 
        //     <Box key={comment._id}>        
        //         <Typography  variant='p'> {comment.feedbackComment} </Typography>
        //         <Button>Edit</Button>
        //         <Button>Delete</Button>
        //     </Box>
        // )        
  )
}
