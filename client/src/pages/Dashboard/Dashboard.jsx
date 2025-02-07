import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/user/useUser";
import { getAuthUserFromLocalStorage } from "../../utility/localStorage";
import { Box, Chip, Grid2, Stack, Typography } from "@mui/material";
import { useGetProjectStats } from "../../hooks/project/useProject";
import { useGetReviewProjectStats } from "../../hooks/project-review/useReviewProject";
import { BASE_ORIGIN } from "../../config/config";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Caraousal from "../../components/carousal/Caraousal";
import IconButton from '@mui/material/IconButton';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import {AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, Cell,  } from 'reCharts'





const projectThumbStyle= {
    width: 60,
    height: 60,
    borderRadius: '50%', 
    objectFit: 'cover',
  }


  const projectScores = [
    {
        projectName: "GA SOS",
        score: 2,
    },
    {
        projectName: "PANDA",
        score: 3,
    },
    {
        projectName: "My City",
        score: 3.5,
    },
    {
        projectName: "SWRB",
        score: 4,
    },
    {
        projectName: "RISES",
        score: 3.5,
    },
  ]

  


export default function Dashboard(){

    const navigate = useNavigate();
    
    const authUser = getAuthUserFromLocalStorage();
    // console.log(authUser);


    const {projectStats, isProjectStatsLoading,isProjectStatsError}   = useGetProjectStats();
    const {reviewProjectStats, isReviewProjectStatsLoading,isReviewProjectStatsError} = useGetReviewProjectStats();
    console.log(projectStats);
    console.log(reviewProjectStats);

    const userQueryObj = {
        id: authUser.id
    }
    
    const {users,isGettingUsers, getUserError} = useGetUser(userQueryObj);
    const currentUser = users?.[0];
    // console.log(currentUser);
    
    
    
    return(
        <Box sx={{p:4}} className='dashboard-view' >
            <Typography variant='h1' mb={2}>Dashboard</Typography>   

                   
            {                
                <Stack direction="row" spacing={2} alignItems='center' py={2} borderBottom={1} borderColor={'primary.main'} mb={2} >       
                    {
                        currentUser && currentUser.avatar ? 
                        <Box component="img"  src={`${BASE_ORIGIN}/uploads/${currentUser?.avatar}`}  sx={projectThumbStyle} alt="Example" /> :
                        <AccountCircleIcon/> 
                    }
                    
                    {currentUser && <Typography  variant='h5' > Welcome   {currentUser.firstName + " " + currentUser.lastName }</Typography>                }
                </Stack>
            }


            {/* Project Stats Panel */}

            <Box sx={{py:3}}>
                <Grid2 container spacing={3} >
                    <Grid2 size={6}>
                        <Box sx={{backgroundColor:'white', p:2}}>
                            <Typography variant="h5" sx={{borderBottom:'1px solid grey'}} mb={1} pb={1}>Projects Stats</Typography>
                           
                            <Stack mb={.25} direction='row' spacing={2} alignItems='center'>
                                <Stack direction='row' spacing={.5} alignItems='center'>
                                    <IconButton color='success'> <StarIcon/> </IconButton>
                                    <Typography fontWeight={500}>Excellent Projects</Typography>                            
                                </Stack> 
                                <Stack direction='row' spacing={.5} alignItems='center'>
                                    {reviewProjectStats?.badProjects.map(proj => <Chip key={proj._id} label={proj.project.projectName} size="small" color="success" variant="outlined"/>   )}
                                </Stack>                                                      

                            </Stack>

                            <Stack mb={.25} direction='row' spacing={2} alignItems='center'>
                                <Stack direction='row' spacing={.5} alignItems='center'>
                                    <IconButton color='primary'> <TagFacesIcon/> </IconButton>
                                    <Typography fontWeight={500}>Good Projects</Typography>                            
                                </Stack> 
                                <Stack direction='row' spacing={.5} alignItems='center'>
                                    {reviewProjectStats?.goodProjects.map(proj => <Chip key={proj._id} label={proj.project.projectName} size="small" color="primary" variant="outlined"/>   )}
                                </Stack>                                                      

                            </Stack>

                            <Stack mb={.25} direction='row' spacing={2} alignItems='center'>
                                <Stack direction='row' spacing={.5} alignItems='center'>
                                    <IconButton color='warning'> <ThumbDownOffAltIcon/> </IconButton>
                                    <Typography fontWeight={500}>Bad Projects</Typography>                            
                                </Stack> 
                                <Stack direction='row' spacing={.5} alignItems='center'>
                                    {reviewProjectStats?.badProjects.map(proj => <Chip key={proj._id} label={proj.project.projectName} size="small" color="warning" variant="outlined"/>   )}
                                </Stack>                                                      

                            </Stack>                
                        </Box>
                    </Grid2>


                    <Grid2 size={6}>
                        <Stack sx={{backgroundColor:'white', p:2}} direction='column' alignItems='start' spacing={1} >
                            <Typography variant="h5">Forecast Stats</Typography>
                            <Typography>5 - Available for Development </Typography>
                            <Typography>10 - Available for Design </Typography>
                            <Typography>2 - Available for A11Y</Typography>
                        </Stack>
                    </Grid2>

                </Grid2>
            </Box>



            {/* CHART 1 */}
            <Box bgcolor='white' p={2} borderRadius={2}>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart width={200} height={400} data={reviewProjectStats?.allProjectsScores} >
                        <CartesianGrid strokeDasharray='5 5'/>
                        <XAxis dataKey='projectName'/>  
                        <YAxis/>
                        <Area type="monotone" fill="#ffb5b5ec" stroke="#ffb5b5ec" stackId='1' dataKey='totalReviewScore'/>
                    </AreaChart>
                </ResponsiveContainer>
            </Box>









            {/* <Caraousal/> */}



            {/* <Typography color='secondary' variant="h1" gutterBottom>
                h1. Heading
            </Typography>
            <Typography variant="h2" gutterBottom>
                h2. Heading
            </Typography>
            <Typography variant="h3" gutterBottom>
                h3. Heading
            </Typography>
            <Typography variant="h4" gutterBottom>
                h4. Heading
            </Typography>
            <Typography variant="h5" gutterBottom>
                h5. Heading
            </Typography>
            <Typography variant="h6" gutterBottom>
                h6. Heading
            </Typography>                 
            <Typography variant="subtitle1" gutterBottom>
                Subtitle 1
            </Typography>                 
            <Typography variant="subtitle2" gutterBottom>
                Subtitle 2
            </Typography>                 
            <Typography variant="body1" gutterBottom>
                Body1
            </Typography>                 
            <Typography variant="body2" gutterBottom>
                Body2
            </Typography>                 
            <Typography variant="caption" gutterBottom>
                Caption
            </Typography>                 
            <Typography variant="overline" gutterBottom>
                Overline
            </Typography>                  */}

        </Box>
    )
}
    