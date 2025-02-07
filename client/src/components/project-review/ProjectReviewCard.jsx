import { Box, Button, Grid2, IconButton, Link, Modal, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CreateProjectForm from '../../features/projects/CreateProjectForm';
import ProjectReviewForm from './ProjectReviewForm';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import { BASE_ORIGIN } from '../../config/config';
import { motion } from "framer-motion"

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';


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


  const avatarStyle= {
    width: '28px',
    height: '28px',
    borderRadius: '50%', // Rounded corners
    objectFit: 'cover', // Crop image if necessary
  }

  

  const CredentialsViewMotion = motion.create(Box);
  const TeamFullViewMotion = motion.create(Box);


export default function ProjectReviewCard({project}) {
    const [showCreds, setShowCreds] = useState(false)
    const [showFullTeam, setShowFullTeam] = useState(false)
    const navigate = useNavigate();    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const authUser = getAuthUserFromLocalStorage();

    const reviewerTeam = project?.reviewTeam.filter(team => team.reviewRole === "Reviewer");
    const revieweeTeam = project?.reviewTeam.filter(team => team.reviewRole === "Reviewee");

    // console.log(reviewerTeam);    
    console.log(project);
    

    // CREATE Review Project
    function handleGotoReviewProjDetails(e, projectId) {
        e.preventDefault();          
        navigate(`/project-review/${projectId}`); 
    }


    // EDIT Project Review
    function handleEditProjectReviewCard(){
        
    }
  
    return (

    <Grid2 size={4} key={project._id} className="project-review-card"   position='relative' >
        
        <Stack direction="row" >  

            <Typography variant="h6" className="review-score-panel" >                   
                <Box sx={{fontSize:'13px', color:'grey'}}>Project Score</Box>
                <Box className="score-number">{project.totalScore} </Box> 
            </Typography>
      
            <Box className='project-review-card-maincontent' flexGrow={1}>
                <Typography variant="h4"  mb={1}> {project.projectID.projectName} </Typography>
                
                {/* Details */}
                <Box className="project-review-card-deets" mb={1}>
                    <Box className="deet-row">
                        <Typography className='label'> Review Phase: </Typography>
                        <Typography className='value'> {project.reviewPhase} </Typography>
                    </Box>
                    
                    <Box className="deet-row">
                        <Typography className='label'> Status: </Typography>
                        <Typography className='value'> {project.projectID.projectStatus} </Typography>
                    </Box>
                </Box>


                {/* Team List */}
                <Box className="team-avatars-container"  mb={2} > 
                    <Typography mb={1} fontSize={13} textTransform={'uppercase'} fontWeight={500}  >Team</Typography>
                    <Box className='team-avatars-row'>
                        { project?.reviewTeam.map(team =>                             
                            <Box key={team._id} component="img"  src={`${BASE_ORIGIN}/uploads/${team.teamMemberID.avatar}`}  sx={avatarStyle} alt="Example" />                                                         
                        )}

                        <IconButton size="small"  sx={{ color: '#3333' }}  aria-label="Show Creds" onClick={()=>setShowFullTeam(true)} > <OpenInFullOutlinedIcon /> </IconButton>
                    </Box>

                </Box>


                {/* POPUP - Credentials */}   
                <Stack direction='row'  justifyContent='space-between'  >                     
                    <Box>
                        <IconButton aria-label="Show Creds" color='primary' size="small" onClick={()=>setShowCreds(true)} > <BadgeOutlinedIcon /> </IconButton>

                        {showCreds &&
                            <CredentialsViewMotion initial={{scale: 0.85}} animate={ { scale: 1 }}  bgcolor={'#cee6ff'} p={2} position='absolute' top='0px' left='0px' height="100%" width="100%" zIndex='10' >
                                {/* Title and Close */}
                                <Stack direction="row" spacing={1} alignItems='center' mb={2} justifyContent='space-between'>
                                    <Typography color='#265996'> Project Credentials </Typography>
                                    <IconButton aria-label="Show Creds" size="small" onClick={()=>setShowCreds(false)} > <HighlightOffIcon /> </IconButton>    
                                </Stack>
                                
                                {/* Creds Details */}
                                <Box flexGrow={1}>
                                    {/* <Typography> DESIGN </Typography> */}
                                    <Typography mb={.25} fontSize={13} textTransform={'uppercase'} fontWeight={600} >Design</Typography>
                                    <Stack direction="row" spacing={1} mb={3} >
                                        <Typography> Design File: </Typography>
                                        <Link href={project.designFile} underline="none"> View </Link>
                                    </Stack>                 


                                    {/* <Typography> DEV </Typography> */}
                                    <Typography mb={.25} fontSize={13} textTransform={'uppercase'} fontWeight={600} >DEV</Typography>
                                    <Stack direction="row" spacing={1} >

                                        <Typography> {project.devCreds} </Typography>

                                    </Stack>                            
                                </Box>                                    
                                
                            </CredentialsViewMotion>
                        }

                    </Box>
                    
                    <Box>
                        <Button onClick={handleOpen}>Edit</Button>                                 
                        <Button onClick={(e)=>handleGotoReviewProjDetails(e, project._id)} > Start Review </Button>
                    </Box>
                </Stack>



                {/* Team Full View */}   
                <Stack direction='row'  justifyContent='space-between'  >                     
                    <Box>
                        {/* <IconButton aria-label="Show Creds" size="small" onClick={()=>setShowFullTeam(true)} > <GroupsOutlinedIcon /> </IconButton> */}

                        {showFullTeam &&
                            <TeamFullViewMotion initial={{scale: 0.85}} animate={ { scale: 1 }} sx={{overflowY:'scroll'}}  bgcolor={'#cee6ff'} p={2} position='absolute' top='0px' left='0px' height="100%" width="100%" zIndex='10' >
                                {/* Title and Close */}
                                <Stack direction="row" spacing={1} alignItems='center' mb={2} justifyContent='space-between'>
                                    <Typography color='#265996'> Project Review Team </Typography>
                                    <IconButton aria-label="Show Creds" size="small" onClick={()=>setShowFullTeam(false)} > <HighlightOffIcon /> </IconButton>    
                                </Stack>
                                
                                {/* POPUP - Team Details */}
                                <Stack className="team-list-container" direction="row" spacing={4} mb={2} p={3} > 

                                    <Box>
                                        <Typography mb={1} fontSize={13} textTransform={'uppercase'} fontWeight={600} >Reviewers</Typography>
                                        { reviewerTeam.map(team => 
                                            <Box key={team._id} className='team-list-row' mb={1}>
                                                <Box component="img"  src={`${BASE_ORIGIN}/uploads/${team.teamMemberID.avatar}`}  sx={avatarStyle} alt="Example" /> 
                                                <Box>
                                                    <Typography> {team.teamMemberID.firstName} </Typography>
                                                    
                                                    {/* Domains */}
                                                    <Stack>
                                                        {team.reviewDomain.map((dom, index)=> <Typography variant='caption'  key={index}> - {dom} </Typography> )}                                                     
                                                    </Stack>
                                                </Box>
                                                
                                            </Box>
                                        )}
                                    </Box>

                                    <Box>
                                        <Typography mb={1} fontSize={13} textTransform={'uppercase'} fontWeight={600} >Reviewee</Typography>
                                            { revieweeTeam.map(team => 
                                                <Box key={team._id} className='team-list-row' mb={1}>
                                                    <Box component="img"  src={`${BASE_ORIGIN}/uploads/${team.teamMemberID.avatar}`}  sx={avatarStyle} alt="Example" /> 
                                                    <Box>
                                                        <Typography> {team.teamMemberID.firstName} </Typography>
                                                        
                                                        {/* Domains */}
                                                        <Stack>
                                                        {team.reviewDomain.map((dom, index)=> <Typography variant='caption'  key={index}> - {dom} </Typography> )}                                                     
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            )}                        
                                    </Box>

                                </Stack>                                   
                                
                            </TeamFullViewMotion>
                        }

                    </Box>                             
                </Stack>





                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">                              
                    <Box sx={style}> 
                            <Typography variant='h1' mb={1}>{project.projectID.projectName}</Typography> 
                        <Box sx={{ flexGrow: 1 }} className='modal-body'>

                            <ProjectReviewForm editSession={true} project={project}/>
                        </Box>
                        
                    </Box>
                </Modal> 

            </Box>

        </Stack>


    </Grid2>  
  )
}
