import { Outlet } from "react-router-dom"
import Header from "../Header"
import Sidebar from "../Sidebar"
import { Box } from "@mui/material"
import { useEffect, useRef, useState } from "react"



export default function DashboardLayout() {
    const mainContentContainerRef =  useRef(null);
    const [mainContentContainer, setMainContentContainer] = useState(null)
    
    console.log(mainContentContainer);
    

    function handleMainContentContainerShrink(){
        mainContentContainerRef.current.style.gridTemplateColumns = 'min-content 1fr';
    }


    useEffect(()=>{         
        setMainContentContainer(mainContentContainerRef.current)        
    },[])
    

    return( 
        <Box className="main-container">
            <Header/>
            
            <div className="main-content-container" ref={mainContentContainerRef}>
                <Sidebar handleMainContentContainerShrink={handleMainContentContainerShrink}/>         
                <Outlet/>
            </div>
        </Box>
    )
}
