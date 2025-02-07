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

import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

import {AreaChart, Area,  ResponsiveContainer, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, Cell, BarChart, Bar, Rectangle,Tooltip, Legend, } from 'reCharts'





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
                    
                    {currentUser && <Typography  variant='h5'> Welcome   {currentUser.firstName + " " + currentUser.lastName }</Typography>                }
                </Stack>
            }


            {/* PROJECT STATS and FORECAST Panel */}        
            <Grid2 container spacing={3} sx={{py:3}} >
                {/* Project Stats */}
                <Grid2 size={6}>
                    <Box sx={{backgroundColor:'white', p:2,  borderRadius:'8px'}}>
                        <Stack direction='row' spacing={.5} alignItems='center' sx={{borderBottom:'1px solid #cecece'}}  mb={1} pb={1.5}>
                            <HealthAndSafetyOutlinedIcon sx={{color:'#9a9a9a'}}/>
                            <Typography variant="h5" >Projects Health</Typography>
                        </Stack>
                        
                        <Stack mb={.25} direction='row' spacing={2} alignItems='center'>
                            <Stack direction='row' spacing={.5} alignItems='center'>
                                <IconButton color='success'> <StarIcon/> </IconButton>
                                <Typography fontWeight={500}>Excellent</Typography>                            
                            </Stack> 
                            <Stack direction='row' spacing={.5} alignItems='center'>
                                {reviewProjectStats?.badProjects.map(proj => <Chip key={proj._id} label={proj.project.projectName} size="small" color="success" variant="outlined"/>   )}
                            </Stack>                                                      

                        </Stack>

                        <Stack mb={.25} direction='row' spacing={2} alignItems='center'>
                            <Stack direction='row' spacing={.5} alignItems='center'>
                                <IconButton color='primary'> <TagFacesIcon/> </IconButton>
                                <Typography fontWeight={500}>Good</Typography>                            
                            </Stack> 
                            <Stack direction='row' spacing={.5} alignItems='center'>
                                {reviewProjectStats?.goodProjects.map(proj => <Chip key={proj._id} label={proj.project.projectName} size="small" color="primary" variant="outlined"/>   )}
                            </Stack>                                                      

                        </Stack>

                        <Stack mb={.25} direction='row' spacing={2} alignItems='center'>
                            <Stack direction='row' spacing={.5} alignItems='center'>
                                <IconButton color='warning'> <ThumbDownOffAltIcon/> </IconButton>
                                <Typography fontWeight={500}>Poor</Typography>                            
                            </Stack> 
                            <Stack direction='row' spacing={.5} alignItems='center'>
                                {reviewProjectStats?.badProjects.map(proj => <Chip key={proj._id} label={proj.project.projectName} size="small" color="warning" variant="outlined"/>   )}
                            </Stack>                                                      

                        </Stack>                
                    </Box>
                </Grid2>


                {/* Forecast */}
                <Grid2 size={6}>
                    <Box sx={{backgroundColor:'white', p:2,  borderRadius:'8px'}}>                                                
                        <Stack direction='row' spacing={.5} alignItems='center' sx={{borderBottom:'1px solid #cecece'}}  mb={1} pb={1.5}>
                            <DateRangeOutlinedIcon sx={{color:'#9a9a9a'}}/>
                            <Typography variant="h5" >Team Forecast</Typography>
                        </Stack>
                        <Typography>5 - Available for Development </Typography>
                        <Typography>10 - Available for Design </Typography>
                        <Typography>2 - Available for A11Y</Typography>
                    </Box>                    
                </Grid2>

            </Grid2>
     



            {/* CURV CHART */}            
            {/* <Box bgcolor='white' p={2} borderRadius={2}>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart width={200} height={400} data={reviewProjectStats?.allProjectsScores} >
                        <CartesianGrid strokeDasharray='5 5'/>
                        <XAxis dataKey='projectName'/>  
                        <YAxis/>
                        <Area type="monotone" fill="#ffb5b5ec" stroke="#ffb5b5ec" stackId='1' dataKey='totalReviewScore'/>
                    </AreaChart>
                </ResponsiveContainer>
            </Box> */}
            


            {/* BAR CHART */}
            <Box bgcolor='white' p={2} borderRadius={2}>
                <Stack direction='row' spacing={.5} alignItems='center' sx={{borderBottom:'1px solid #cecece'}}  mb={4} pb={1.5}>
                    <SportsScoreOutlinedIcon sx={{color:'#9a9a9a'}}/>
                    <Typography variant="h5" >Project Score Trends</Typography>
                </Stack>                
              
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        width={500}
                        height={300}
                        data={reviewProjectStats?.allProjectsScores}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="projectName" />
                        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalReviewScore" fill="#4b9ee3" activeBar={<Rectangle fill="#64b4f6" stroke="#64b4f6" />} />
                        {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
                        </BarChart>
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
    