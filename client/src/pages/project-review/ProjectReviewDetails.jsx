import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"

import { BASE_ORIGIN } from '../../config/config';
// import io from 'socket.io-client';
// const socket = io(BASE_ORIGIN, { withCredentials: true });



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, Link, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useGetReviewProject } from '../../hooks/project-review/useReviewProject';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import GuidelineRow from '../../components/project-review/GuidelineRow';
import ReviewFeedback from '../../components/review-feedback/ReviewFeedback';





export default function ProjectReviewDetails(){
    const navigate = useNavigate();

    const [showGuidelines, setShowGuidelines] = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);

    const[filteredReviewGuidelines, setFilteredReviewGuidelines] = useState([]);
    const[gdlineFilterKey, setGdlineFilterKey] = useState('Design');

    // console.log(filteredReviewGuidelines);
    // console.log(gdlineFilterKey);
    

    
    const { id } = useParams(); // Access 'id' directly

    const projectQury = {_id: id}
    const {reviewProjects, isFetchingReviewProjects, fetchReviewProjectError} = useGetReviewProject(projectQury)    
    const reviewProject = reviewProjects?.[0]



    

    function handleGuidelineFilter(filterKey){
        const filteredGdlines = reviewProject?.reviewGuidelines?.filter(gdline => gdline.guidelineID.domain === filterKey  );   
        setFilteredReviewGuidelines(filteredGdlines)
        setGdlineFilterKey(filterKey)
         
        // setFilteredGuidelines(filteredGdlines);
        // setguidekineKey(filterKey)
      }



      useEffect(()=>{
          handleGuidelineFilter('Design')
      },[reviewProject?.reviewGuidelines])




      if(!reviewProject || isFetchingReviewProjects) return <h3>Loading...</h3>
 


    return (
        <Box sx={{p:4}} className="project-review-details-view">
            <Stack direction='row'  justifyContent='space-between'  alignItems='center' mb={4}>
                <Typography variant='h1'> {reviewProject.projectID.projectName} Review</Typography>
                <IconButton onClick={()=>navigate(-1) }> <KeyboardBackspaceIcon color={'primary'}/> </IconButton>
            </Stack>
            
            {/* TABS Buttons */}
            <Stack direction="row" alignItems='center' gap={1}  sx={{py:2, borderBottom:'1px solid gray'}} mb={2}>                
                <NavLink style={showGuidelines ? { color:'white', backgroundColor:'#007ade', borderRadius:10, padding: '.5rem 3.75rem'   } : { color:'white', backgroundColor:'#ababab', borderRadius:10, padding: '.5rem 3.75rem'  } } onClick={ (e)=> { e.preventDefault();  setShowGuidelines(true); setShowFeedback(false)  } }>Guidelines</NavLink>
                <NavLink style={showFeedback ? { color:'white', backgroundColor:'#007ade', borderRadius:10, padding: '.5rem 3.75rem'   }: { color:'white', background:'#ababab', borderRadius:10, padding: '.5rem 3.75rem' } } onClick={ (e)=> { e.preventDefault();  setShowGuidelines(false); setShowFeedback(true)  } }>Feedback</NavLink>
            </Stack>
            

            
            {
                showFeedback &&
                <div> <ReviewFeedback reviewProject={reviewProject} /> </div>
            }

            
            {
                showGuidelines &&
                <Box>
                    <Typography variant="h2" mb={2}>Guidelines Review</Typography>
                    

                    {/* TAB Button */}
                    <Stack direction='row' spacing={1} mb={1}>
                        <Button  sx={ gdlineFilterKey === 'Design' ? { backgroundColor: 'primary.main', color:'common.white'} : { backgroundColor: 'none', color:'common.black'} }  onClick={()=>handleGuidelineFilter('Design')}>Design</Button>
                        <Button sx={ gdlineFilterKey === 'Development' ? { backgroundColor: 'primary.main', color:'common.white'} : { backgroundColor: 'none', color:'common.black'} } onClick={()=>handleGuidelineFilter('Development')}>Development</Button>
                        <Button sx={ gdlineFilterKey === 'Accessibility' ? { backgroundColor: 'primary.main', color:'common.white'} : { backgroundColor: 'none', color:'common.black'} } onClick={()=>handleGuidelineFilter('Accessibility')}>Accessibility</Button>          
                    </Stack>

                    {/* REVIEW GUIDELINES Table */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Guideline Name</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Score</TableCell>

                                </TableRow>
                            </TableHead>
                            
                            <TableBody>                        
                                {filteredReviewGuidelines?.length>0 && filteredReviewGuidelines?.map((gdline) => <GuidelineRow key={gdline._id} reviewProject={reviewProject} reviewGuideline = {gdline}/> )}
                            </TableBody>
                        </Table>
                    </TableContainer>            
                </Box>
            }
        </Box>
    );
}
