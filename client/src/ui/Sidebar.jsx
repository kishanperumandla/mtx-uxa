import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PunchClockOutlinedIcon from '@mui/icons-material/PunchClockOutlined';
import { useEffect, useRef, useState } from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

import { motion } from "framer-motion";



const SidebarMotion = motion.create(Box)

export default function Sidebar({handleMainContentContainerShrink}) {
  const[showTabLabel, setShowTabLebel] = useState(false);
  const[sidebarWidth, setDidebarWidth] = useState('min-content');
  const sidebarRef = useRef(null);

  

  function handleToggle(){
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle('smallView');
    }
     
    handleMainContentContainerShrink()
      
  }

  
  useEffect(()=>{
    console.log(sidebarRef.current.style.width);
    sidebarRef.current.style.width = '15rem';

  },[sidebarRef, sidebarWidth])




  return (
    <SidebarMotion initial={{x: '-100px'}} animate={{x: '0px'}} className="sidebar" ref={sidebarRef}> 
      <Box className="nav-tabs-container" >
        <NavLink to="/dashboard">
          <Stack direction='row' alignItems='center' spacing={.5}>
            <IconButton aria-label="Dashboard" size="small" >
                <SpaceDashboardOutlinedIcon />
            </IconButton>
            <Typography>Dashboard</Typography>
          </Stack>
          
        </NavLink>   
        <NavLink to="/projects">
          <Stack direction='row' alignItems='center' spacing={.5}>
            <IconButton aria-label="projects" size="small" >
                <AccountTreeOutlinedIcon />
            </IconButton>
            <Typography>My Projects</Typography>
          </Stack>      
        </NavLink>  

        <NavLink to="/guidelines">
          <Stack direction='row' alignItems='center' spacing={.5}>
            <IconButton aria-label="Guidelines" size="small" >
                <FactCheckOutlinedIcon />
            </IconButton>
            <Typography>Guidelines</Typography>
          </Stack>      
        </NavLink>

        <NavLink to="/project-review">
          <Stack direction='row' alignItems='center' spacing={.5}>
            <IconButton aria-label="Guidelines" size="small" >
                <TaskAltOutlinedIcon />
            </IconButton>
            <Typography>Project Review</Typography>       
          </Stack>      
        </NavLink>   

        <NavLink to="/forecast">
          <Stack direction='row' alignItems='center' spacing={.5}>
            <IconButton aria-label="Forecast" size="small" >
                <PunchClockOutlinedIcon />
            </IconButton>
            <Typography>Forecast</Typography>        
          </Stack>      
        </NavLink>
      </Box>

      <Box>
        <IconButton onClick={handleToggle}> <MenuOutlinedIcon/> </IconButton>
      </Box>

    </SidebarMotion>
  )
}
