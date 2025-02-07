import React from 'react'

import { useGetProject, useUpdateProject } from '../../hooks/project/useProject'
import CreateProject from '../../features/projects/CreateProjects';
import { Box, Button, Chip, Grid2, Paper, Stack, styled, Typography } from '@mui/material';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import ProjectCard from '../../components/projects/ProjectCard';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import EmptyDataImage from '../../assets/empty-data.svg'
import { BASE_ORIGIN } from '../../config/config';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#e7f6ff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',

}));






export default function Projects() {

  const authUser = getAuthUserFromLocalStorage();

  
  
  const projectQuery = {
    authUserId: authUser.id
  };

  const {projects, isFetchingProjects, fetchProjectError}  = useGetProject(projectQuery)
  // console.log(projects);

  
  if(isFetchingProjects) return  <> <h2>Loading...</h2> </>
  

  return (
    <Box sx={{p:4}} className='projects-view'>

        <CreateProject/>

        { projects?.length>0 ? 
            <Grid2 container spacing={5}>          
              { projects?.map(proj => <ProjectCard key={proj._id} proj={proj}/>)}
            </Grid2>
          :
          
          // Empty UI Panel
          <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f5f9ff', }} >         
            <Box component="img"  src={EmptyDataImage}  sx={{width: '20%', height: '20%'}} alt="Example" /> 
              <Typography variant="h6" component="p" sx={{ color: '#666', fontWeight: 500, textAlign: 'center', }} >
                No, projects are available. Create now.
            </Typography>
          </Box>                
        }

    </Box>
  )

}
