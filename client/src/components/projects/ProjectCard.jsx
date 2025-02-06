import { Box, Button, Chip, Grid2, Modal, Paper, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { useUpdateProject } from '../../hooks/project/useProject';
import CreateProjectForm from '../../features/projects/CreateProjectForm';
import { BASE_ORIGIN } from '../../config/config';

import { motion } from "framer-motion"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#e7f6ff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  
  }));


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
  


  const projectThumbStyle= {
    width: '100%',
    height: 120,
    // borderRadius: '8px', // Rounded corners
    objectFit: 'cover', // Crop image if necessary
  }


  const avatarStyle= {
    width: '28px',
    height: '28px',
    borderRadius: '50%', // Rounded corners
    objectFit: 'cover', // Crop image if necessary
  }

  


  const MotionGrid = motion.create(Grid2);

export default function ProjectCard({proj}) {

    const {updateProjectMutationFn, isUpdateProject, updateProjectError}  = useUpdateProject();
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(proj);
    

    function handleEditProject(){
        // const updateData = {projectId: proj._id }
        // updateProjectMutationFn(data)

        
    }
    
  
    return (

      <MotionGrid size={4}  bgcolor={'white'} animate={{ scale: 1.05 }} borderRadius={3}  sx={{border: '2px solid #ffffff', boxShadow: '0 3px 16px #c1e3ff'}}  >
      {/* <Box key={proj._id} className="proj-card" > */}

          {/* Project Title */}
          <Stack py={2} px={2} direction="row"  sx={{ justifyContent: "space-between", alignItems: "flex-start" }}> 
              <Typography variant="h3" sx={(theme) => ({ fontWeight: theme.typography.fontWeightBold })}> {proj.projectName} </Typography>          
              <Chip label={proj.projectStatus} color="success"  size="small" />
          </Stack> 

          

          {/* Project Image */}
          <Box component="img"  src={`${BASE_ORIGIN}/uploads/${proj.projectThumbnail}`}  sx={projectThumbStyle} alt="Example" />
                                      
          
          {/* TEAM */}
          <Box px={2} py={.5}> 
            {/* <Typography component="p" mb={1} >Team</Typography> */}
            <Typography mb={.5} fontSize={13} textTransform={'uppercase'} fontWeight={600}> Project Team </Typography>

            <Grid2 container spacing={2} p={1.5} bgcolor={'#def0ff'} borderRadius={2}>
              { proj.projectTeam.map(teamMem =>                   
                    <Stack  key={teamMem?._id} direction="row"  spacing={1} >
                      <Box component="img"  src={`${BASE_ORIGIN}/uploads/${teamMem?.teamMemberID?.avatar}`}  sx={avatarStyle} alt="Example" /> 
                      <Typography variant='h6' sx={{mb:.5, fontSize:16, fontWeight: 500}}>{teamMem?.teamMemberID?.firstName} </Typography>
                    
                      <Stack direction="row" sx={{flexWrap: 'wrap', rowGap:1}}  spacing={1}>
                        {teamMem?.roleInProject.map((role, index) =>                     
                          <Box className="project-role-chip" sx={{ py: 0.5, boxShadow: 0 }} key={index}> {role} </Box>
                        )} 
                      </Stack>
                    </Stack>                              
              )}
            </Grid2>
            
          </Box> 
          
          <Stack  direction='row' justifyContent='end' p={2} >
            <Button size="small" onClick={handleOpen} variant="outlined">Edit Peoject</Button>
          </Stack>

          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}> 
                  <Typography variant="h1" sx={{mb:3}} >Edit Project</Typography>
                  <Box className="modal-body" sx={{ flexGrow: 1 }} >
                    <CreateProjectForm  project = {proj} editSession={true}/>
                  </Box>              
              </Box>
          </Modal>         

          {/* <Button onClick={handleEditProject}>Edit</Button> */}
      
      </MotionGrid>    
 
  )
}
