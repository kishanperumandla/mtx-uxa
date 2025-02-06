import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/user/useUser";
import { getAuthUserFromLocalStorage } from "../../utility/localStorage";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useGetProjectStats } from "../../hooks/project/useProject";
import { useGetReviewProjectStats } from "../../hooks/project-review/useReviewProject";
import { BASE_ORIGIN } from "../../config/config";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Caraousal from "../../components/carousal/Caraousal";


const projectThumbStyle= {
    width: 60,
    height: 60,
    borderRadius: '50%', 
    objectFit: 'cover',
  }



  


export default function Dashboard(){

    const navigate = useNavigate();
    
    const authUser = getAuthUserFromLocalStorage();
    // console.log(authUser);


    const {projectStats, isProjectStatsLoading,isProjectStatsError}   = useGetProjectStats();
    const {reviewProjectStats, isReviewProjectStatsLoading,isReviewProjectStatsError} = useGetReviewProjectStats();
    // console.log(projectStats);
    // console.log(reviewProjectStats);

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

            <Box sx={{py:3}}>
                <Grid2 container spacing={3} >

                    <Stack sx={{backgroundColor:'white', p:2}}  direction='column' alignItems='start' spacing={1} >
                        <Typography variant="h5">Projects Stats</Typography>
                        <Typography>4 - Excellent Projects</Typography>
                        <Typography>6 - Good Projects</Typography>
                        <Typography>0 - Bad Projects</Typography>
                    </Stack>

                    <Stack sx={{backgroundColor:'white', p:2}} direction='column' alignItems='start' spacing={1} >
                        <Typography variant="h5">Forecast Stats</Typography>
                        <Typography>5 - Available for Development </Typography>
                        <Typography>10 - Available for Design </Typography>
                        <Typography>2 - Available for A11Y</Typography>
                    </Stack>
                </Grid2>
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
    