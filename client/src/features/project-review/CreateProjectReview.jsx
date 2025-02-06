import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid2, IconButton, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, Stack, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useCreateReviewProject } from '../../hooks/project-review/useReviewProject';
import { useForm } from 'react-hook-form';
import { useGetProject } from '../../hooks/project/useProject';
import { useGetUser } from '../../hooks/user/useUser';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useGetGuidelines } from '../../hooks/guideline/useGuideline';
import ProjectReviewForm from '../../components/project-review/ProjectReviewForm';
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


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));  

  const phases = ['Not Started', 'Phase 1', 'Phase 2']
  const reviewDomains = ['Research', 'Design', 'Development', 'A11Y']
  const reviewRoles = ['reviewee', 'reviewer']
  


export default function CreateProjectReview() {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    

  return (
    <div>
        <Stack direction='row' justifyContent='space-between' alignItems='center' py={2} mb={2}>            
          <Typography variant='h1'>Project Review</Typography>                   
          <Button variant='contained' onClick={handleOpen} startIcon={<AddIcon/>} >Create Project Review</Button>
        </Stack>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">                    
          <Box sx={style}> 
            {/* <Typography id="modal-modal-title" variant="h6" component="h2"> Text in a modal </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}> Duis mollis, est non commodo luctus, nisi erat porttitor ligula. </Typography> */}
              <Typography variant='h1' mb={3}>Create Project Review</Typography>

              <Box className='modal-body' sx={{ flexGrow: 1 }} >
                <Alert severity="warning" sx={{marginBottom: '16px'}}>Review Project CANNOT BE DELETED, after creating</Alert>
                <ProjectReviewForm/>
              </Box>
            
          </Box>

        </Modal>        
    </div>
  )
}
