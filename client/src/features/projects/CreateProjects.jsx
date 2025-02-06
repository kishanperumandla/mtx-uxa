import { Box, Button, Grid2, MenuItem, Modal, TextField, Checkbox, Autocomplete, InputLabel, Select, IconButton, FormControl, FormGroup, FormControlLabel, Typography, Stack, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCreateReviewProject } from '../../hooks/project-review/useReviewProject';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '../../hooks/project/useProject';
import { useGetUser } from '../../hooks/user/useUser';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CreateProjectForm from './CreateProjectForm';
import AddIcon from '@mui/icons-material/Add';


const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const rolesInProject = ['Researcher', 'Designer', 'Developer', 'Accessibility', 'Hybrid']



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
  


export default function CreateProject() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



  return (
    <div>
        <Stack direction='row' justifyContent='space-between' alignItems='center' py={2} mb={2}>            
          <Typography variant='h1'>Projects</Typography>
          <Button variant='contained' size="medium" onClick={handleOpen} startIcon={<AddIcon />}>Create Project</Button>

          
        </Stack>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">                    
          <Box sx={style}> 
              <Typography variant="h1" sx={{mb:2}} >Create Project</Typography>
              <Box className="modal-body" sx={{ flexGrow: 1 }} >
                <Alert severity="warning" sx={{marginBottom: '16px'}}> Project CANNOT BE DELETED, after creating</Alert>                
                <CreateProjectForm/>                
              </Box>
          </Box>

        </Modal>        
    </div>
  )
}
