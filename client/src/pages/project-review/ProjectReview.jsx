import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useGetGuidelines } from '../../hooks/guideline/useGuideline';
import {useCreateReviewProject, useGetReviewProject} from '../../hooks/project-review/useReviewProject';
import CreateProjectReview from '../../features/project-review/CreateProjectReview';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import ProjectReviewCard from '../../components/project-review/ProjectReviewCard';
import { Grid2 } from '@mui/material';


import EmptyDataImage from '../../assets/empty-data.svg'




export default function ProjectReview() {

  const {reviewProjects, isFetchingReviewProjects, fetchReviewProjectError}   = useGetReviewProject()
  console.log(reviewProjects);


  
  // Storing Total Score Value
  const updatedReviewProjects = reviewProjects?.map((proj)=>{
    // console.log(proj);
    const totalScore = proj.reviewGuidelines.reduce((accum, cur) => {
      return accum + cur.guidelineScore;
    }, 0);
    return {...proj, totalScore: totalScore / proj.reviewGuidelines.length}
    
  })

  console.log(updatedReviewProjects);
  

  

  const authUser = getAuthUserFromLocalStorage();

  let currentUserReviewProjects = []

  updatedReviewProjects?.forEach(proj => {
    proj.reviewTeam.forEach(item => {
      if(item.teamMemberID._id === authUser.id ){
        currentUserReviewProjects.push(proj)
      }      
    })    
  });


  if(isFetchingReviewProjects) return <h2>Loading...</h2>



  return (
    <Box sx={{p:4}} className="project-review-view">                
        
        <CreateProjectReview/>

        { currentUserReviewProjects?.length>0 ?                   
          <Grid2 container spacing={3} >            
            {currentUserReviewProjects.map( project => 
             <ProjectReviewCard key={project._id} project={project}/> 
            )}
          </Grid2>
          :   
          
          // Empty UI Panel
          <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f5f9ff', }} >         
            <Box component="img"  src={EmptyDataImage}  sx={{width: '20%', height: '20%'}} alt="Example" /> 
              <Typography variant="h6" component="p" sx={{ color: '#666', fontWeight: 500, textAlign: 'center', }} >
               No Review Projects are Avaialble! Create now.
              </Typography>
          </Box>
        }



    </Box>
  )

}
