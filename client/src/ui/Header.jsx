import { NavLink, useNavigate } from "react-router-dom"

import { Box, Button, IconButton, Stack } from "@mui/material"
import { useState } from "react"
import { getAuthUserFromLocalStorage } from "../utility/localStorage";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


export default function Header() {

  const [isCliecked, setIsClicked] = useState(false);
  const authUser = getAuthUserFromLocalStorage();

  const navigate = useNavigate();

  function handleLogout(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("refreshToken");
    navigate('/login')    
  }

  return (
    // <Box sx={{ p: 2, backgroundColor: '#ffffff',  boxShadow: (theme)=> theme.shadows[3] }}>
    <Box className="header">
        <Stack direction="row" justifyContent='space-between' >
          <NavLink to="/dashboard" color='primary'> MTX / Team UXA </NavLink>
          <Stack direction="row" spacing={1} >
            <Button  onClick={()=>navigate('/my-profile')} startIcon={<PersonIcon />}> {authUser.userFullName} </Button>
            
            <IconButton aria-label="delete" onClick={handleLogout}>
              <PowerSettingsNewIcon/>
            </IconButton>
          </Stack>
        </Stack>


        {/* <Button disabled onClick={()=> setIsClicked(true)} 
          sx={[ 
            { bgcolor:'common.white', 
              color:'primary.main' ,
              "&:hover":{
                bgcolor: 'primary.light',
                color: 'common.white'
              },

              "&.Mui-disabled":{
                color:'red'
              }
            },
            isCliecked &&{
              bgcolor:'primary.main',
              color:'common.white'
            }
            ]}>

          <span> {authUser.userFullName} </span>
          
        </Button> */}





        
    </Box>
  )
}
