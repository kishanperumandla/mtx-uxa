import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import { useCreateGuidelineComments, useGetGuidelineComments } from '../../hooks/guideline/useGuidelineComment';
import GuidelineComment from '../comments/GuidelineComment';
// import { socket } from '../../utility/sockets';
import { useUpdateReviewProject } from '../../hooks/project-review/useReviewProject';



////// as///
///////

const guidelineStatuses = ['In Progress', 'Satisfied', 'Not Reviewed']



export default function GuidelineRow({reviewGuideline, reviewProject}) {
    const [showGuidelineDeets, setShowGuidelineDeets] = useState(false);
    const [guidelineFlag, setGuidelineFlag] = useState(null);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const authUser = getAuthUserFromLocalStorage();
   
    const {guidelineCommentMutationFn, isCreatingguidelineComment, guidelineCommentError}  = useCreateGuidelineComments();
    const {guidelineComments, isGuidelineCommentsLoading, guidelineCommentsError } = useGetGuidelineComments();    
    const {updateReviewProjectMutationFn, isUpdatingReviewProject, updateReviewProjectError}   = useUpdateReviewProject()



    const[score, setscore] = useState(0);
    const[status, setStatus] = useState( reviewGuideline.guidelineStatus || '');
    const reviewProjectId = reviewProject?._id;
    // console.log(reviewProject.reviewTeam);

    const currentReviewTeamMember =  reviewProject.reviewTeam.filter(item => item.teamMemberID._id === authUser.id  )
    // console.log(currentReviewTeamMember);
    
    
    

    // console.log(status);    
    // console.log(guidelineComments);
    // console.log(reviewProjectId);
    // console.log(reviewProject);
    // console.log(reviewGuideline);
    

    const currentProjectGuidelineComments = guidelineComments?.filter(comment => comment.reviewProjectID === reviewProjectId).filter(comment => comment.commentGuidelineID === reviewGuideline._id )

    const unredComments = currentProjectGuidelineComments?.filter(comment => comment.isCommentRead === false).length
    
    const isCurrentUserExistInReviewProjectReviewTeam = reviewProject.reviewTeam.some( team => team?.teamMemberID?._id === authUser.id );
    const currentReviewTeamMemberRole = currentReviewTeamMember[0]?.reviewRole;


    
    

    

    
    // Guideline Collapse
    function handleGuidelineExpand(gdlineId){
        setShowGuidelineDeets(null);        
        setShowGuidelineDeets(prev => !prev);  

        setGuidelineFlag(gdlineId);
    }


    // POST Comment
    function handlePostComment(data){        
        const updatedData = {
            commenterID: authUser.id,
            comment: data.guidelineComment,
            commentGuidelineID: reviewGuideline._id,
            reviewProjectID: reviewProjectId
        }        

        guidelineCommentMutationFn(updatedData)                
    }



    // UPDATE SCORE
    function handleGuidelineScore(e){
        const score = e.target.value;
        setscore(score);

        const updateData = { 
            reviewProjectId,
            reviewGuidelineId:reviewGuideline._id,
            guidelineScore: score
        }

        updateReviewProjectMutationFn(updateData)
    }




    // STATUS
    function handleGuidelineStatus(e){
        setStatus(e.target.value);

        const updateData = {reviewProjectId,   
            reviewGuidelineId:reviewGuideline._id, 
            guidelineStatus:e.target.value};

        updateReviewProjectMutationFn(updateData)
    }

    // useEffect(()=>{
    //     socket.on('newComment', (comment)=>{
    //         console.log('🍎', comment);  
            
    //         setCommentNotification(prev => [...prev, comment])
    //     })

    //    // Clean up the event listener when the component unmounts
    //     return () => {
    //         socket.off('newComment');
    //     };        
    // },[])



        // // Clear new notification
        // function handleClearNotification() {
        //     setNewNotification(false);
        // }


  return (
    <>          
        <TableRow  key={reviewGuideline._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            
            {/* Guideline Name */}
            <TableCell component="th" scope="row"> 
                {reviewGuideline.guidelineID.guidelineName}  
                <Badge badgeContent={unredComments} color="secondary"> </Badge>
                                
                <IconButton onClick={()=>handleGuidelineExpand(reviewGuideline._id)} aria-label="Expand" size="small"> <ExpandMoreIcon fontSize="inherit" /> </IconButton>  
            </TableCell>


            {/* Category */}
            <TableCell align="right">{reviewGuideline.guidelineID.category}</TableCell>
            
            {/* Status */}
            <TableCell align="right">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="guideline-status-label">Status</InputLabel>
                <Select
                    labelId="guideline-status-label"
                    id="guideline-status"
                    value={status}
                    label="Status"
                    onChange={handleGuidelineStatus}    
                >
                    
                    {guidelineStatuses?.map((status, index) => (
                        <MenuItem key={index} value={status}>
                            {status}
                        </MenuItem>
                        )
                    )}
                </Select>
                </FormControl>                
            </TableCell>                                    
            
            {/* Score */}
            <TableCell align="right">

                { currentReviewTeamMemberRole === "Reviewee" && 
                    <span> { reviewGuideline?.guidelineScore} </span>                   
                }

                { currentReviewTeamMemberRole === "Reviewer" && 
                    <TextField label="Score" id="outlined-size-small" defaultValue={ reviewGuideline?.guidelineScore } size="small" onChange={handleGuidelineScore} /> 
                }
            </TableCell>                                 
        </TableRow>
        

        {showGuidelineDeets && guidelineFlag === reviewGuideline._id && 
            <TableRow>
                <TableCell colSpan={4}>
                    <div>                                    
                        <div className="comments-head">
                            <span>Comments</span>
                            <span>-</span>
                        </div>

                        { currentProjectGuidelineComments && 
                        currentProjectGuidelineComments.map(comment => 
                            <GuidelineComment key={comment._id} comment={comment}/>  
                        )}
                    

                        <Box component="form"  onSubmit={handleSubmit(data => handlePostComment(data))} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}  noValidate autoComplete="off" >
                            <TextField id="guideline-comment-label" {...register('guidelineComment')}  name={'guidelineComment'}  label="Comment" multiline fullWidth  />
                            
                            <Button type="button">Clear</Button>
                            <Button type="submit">Post</Button>
                        </Box>
                    </div>

                </TableCell>
            </TableRow>
        }
    </>    
  )
}
