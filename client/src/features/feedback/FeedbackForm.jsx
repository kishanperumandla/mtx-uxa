import React, { useEffect } from "react";
import { Box, Button, FormControl, Grid2, InputLabel, MenuItem, Modal, Paper, Select, Stack, styled, TextField, Typography, } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getAuthUserFromLocalStorage } from "../../utility/localStorage";
import { useCreateReviewFeedback, useUpdateReviewFeedback } from "../../hooks/review-feedbacks/useReviewFeedbacks";
import BackupIcon from "@mui/icons-material/Backup";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


export default function FeedbackForm({ reviewProject, editSession, feedback }) {
  // console.log(editSession);
  console.log(feedback);

  const authUser = getAuthUserFromLocalStorage();
  const { createReviewFeedbackMutationFn, isCreatingReviewFeedback, reviewFeedbackError} = useCreateReviewFeedback();
  const {updateReviewFeedbackMutationFn, isUpdatingReviewFeedback, updateReviewFeedbackError}  = useUpdateReviewFeedback()

  const existingFeedbackData = feedback
    ? {
        domain: feedback.domain || "",
        category: feedback.category || "",
        priority: feedback.priority || "",
        comment: feedback.comment || "",
        location: feedback.location || "",
        feedbackImage: feedback.feedbackImage || "",
        feedbackID: feedback._id || "",
      }
    : {};

  // console.log(existingFeedbackData);


  const { register, handleSubmit, reset, control } = useForm({ defaultValues: editSession ? existingFeedbackData : {}});

  function handleSubmitPost(data) {
    const formData = new FormData();
    // formData.append("feedbackImage", data.feedbackImage[0]);
    formData.append("domain", data.domain);
    formData.append("reviewProjectID", reviewProject._id);
    formData.append("commenterId", authUser.id);
    formData.append("comment", data.comment);    
    formData.append("category", data.category);
    formData.append("priority", data.priority);
    formData.append("location", data.location);

    // DETECTING an Image File Type 
    if ( data.feedbackImage instanceof FileList &&  data.feedbackImage.length > 0) {        
        formData.append("feedbackImage", data.feedbackImage[0]);
        console.log("HELLooo..");        
    }

    if(typeof data.feedbackImage === 'string'){        
        formData.append("feedbackImage", data.feedbackImage);
    }

    
    if(editSession){
        console.log('🍓 From Edit Session');
        for(let [key, val] of formData){
            console.log(key,":",val);
        }

        formData.append("feedbackID", feedback._id)
        updateReviewFeedbackMutationFn(formData);

    }else{
        console.log('🍊 From Create Session');
        for(let [key, val] of formData){
            console.log(key,":",val);
        }
        createReviewFeedbackMutationFn(formData);
    }
  }



  // Reset the form if `editSession` or `feedback` changes
  useEffect(() => {
    if (editSession) {
      reset(existingFeedbackData);
    }
  }, [editSession, feedback, reset]);


  
  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitPost)}>      
      <Grid2 container spacing={2} >
        
        <Grid2 size={6}>
          <FormControl fullWidth>
            <InputLabel id="domain-label">Domain</InputLabel>
            <Controller  name="domain" control={control} 
                render={({field})=>(
                    <Select {...field} labelId="domain-label" id="domain" value={field.value || ""} >
                        <MenuItem value={"Research"}>Research</MenuItem>
                        <MenuItem value={"Design"}>Design</MenuItem>
                        <MenuItem value={"Development"}>Development</MenuItem>
                        <MenuItem value={"Accessibility"}>NA</MenuItem>
                    </Select>            
                )} 
            />
          </FormControl>
        </Grid2>

        <Grid2 size={6}>
          <FormControl fullWidth>
            <InputLabel id="category-label">category</InputLabel>
            <Controller name="category" control={control} 
                render={({field})=>(
                    <Select {...field} labelId="category-label" id="category" value={field.value || ""} >
                        <MenuItem value={"Typography"}>Typography</MenuItem>
                        <MenuItem value={"Color"}>Color</MenuItem>
                        <MenuItem value={"Spacings"}>Spacings</MenuItem>
                        <MenuItem value={"Styleguide"}>Styleguide</MenuItem>
                        <MenuItem value={"Alignment"}>Alignment</MenuItem>
                    </Select>          
                )} 
            />        
          </FormControl>
        </Grid2>
        
        <Grid2 size={6}>
          <FormControl fullWidth>
            <InputLabel id="priority-label">priority</InputLabel>
            <Controller  name="priority" control={control} 
                render={({field})=>(
                    <Select {...field}  labelId="priority-label" id="priority" value={field.value || ""}  >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                        <MenuItem value={"Blocker"}>Blocker</MenuItem>
                    </Select>        
                )} 
            />          
        </FormControl>
        </Grid2>

        <Grid2 size={12}>
          <Controller  name="comment" control={control} render={({field})=> ( 
            <TextField fullWidth  {...field}  id="feedback-comment" label="Comment" multiline rows={2} placeholder="Write Feedback Comment"  value={field.value || ""}   />     
            )} 
          />                  
        </Grid2>

        <Grid2 size={12}>
          <Controller  name="location" control={control} render={({field})=>(
                  <TextField fullWidth {...field}  id="location-comment" label="Location" placeholder="Location" value={field.value || ""} />
              )} 
          />                   
        </Grid2>

      </Grid2>





      <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<BackupIcon />} >
        Upload files
        <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple {...register("feedbackImage")} />
      </Button>

      <Box className='modal-footer'>
        <Stack direction='row' justifyContent='end' spacing={1}>
          <Button type="button">Clear</Button>
          <Button variant="contained" type="submit"> Post </Button>
        </Stack>
      </Box>


    </Box>
  );
}
