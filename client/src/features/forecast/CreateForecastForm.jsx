import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid2, IconButton, InputLabel, MenuItem, Select, Stack, styled, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import BackupIcon from "@mui/icons-material/Backup";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetUser } from '../../hooks/user/useUser';


import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useCreateForecast } from '../../hooks/forecast/useForecast';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const domains = ['Design', 'Dev', 'A11Y', 'Research', 'Training', 'Misc']



export default function CreateForecastForm(){
    const [domain, setDomain] = useState('');    
    const [forecastHour, setForecastHour] = useState(0);  
    
    const [forecastData, setForecastData] = useState([]);  
    
    const [weekStartDate, setWeekStartDate] = useState();
    console.log(weekStartDate);
    
    
    // console.log(forecastData);
    

    const {register, handleSubmit, formState: { errors }, reset} = useForm();
    const{users, isGettingUsers, getUserError} = useGetUser();

    const {createForecastMutationFn, isCreatingForecast, forecastError} = useCreateForecast   ();

    const authUser = getAuthUserFromLocalStorage();
    console.log(authUser);
    

    


    function handleSelectDomain(e) {
        e.preventDefault();
        const selectedValue = e.target.value;        
        setDomain(selectedValue);
    }



    function handleCollectForecastData() {
        const data = {
            forecastHour,
            domain
        }

        setForecastData(prev => [...prev, data ] )
    }



    function removeForecastDataEntry(index){
        const updatedForecastData = forecastData.filter( (_,ind) => ind !== index  )        
        setForecastData(updatedForecastData)                
    }


    
    // SUBMIT FORECAST
    function handleForecastSubmit(data){
        const completeForecastData = {
            projectName: data.projectName,
            forecastData,
            weekStartDate,
            teamMemberId:authUser.id,

            // Remove below
            teamMember: {
                name: authUser.userFullName,
                id: authUser.id,
                teamId: authUser.id,
                avatar: authUser.avatar
            }
        };

        createForecastMutationFn(completeForecastData)

        console.log(completeForecastData);
        
    }


    
    
  return (
    <Box component="form"  onSubmit = {handleSubmit(handleForecastSubmit)}>                  
        

        <Grid2 container spacing={2} sx={{mb:2}}>             
            {/* PROJECT NAME */}
                      
                <Grid2 size={6}>
                    <TextField fullWidth id="projectName" name="projectName" label="Project Name"  {...register('projectName', { required: false }) } variant="outlined" />
                </Grid2>
             
                      
           
           {/* DOMAIN */}
           <Grid2 size={6}>
               <FormControl fullWidth>
                   <InputLabel id="domain-label">Domain</InputLabel>
                   <Select
                       labelId="domain-label"
                       id="domain-select"
                       value={domain}
                       label="Domain"
                       onChange={handleSelectDomain}
                   >
                    {domains.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem> )}
                   </Select>
               </FormControl>
           </Grid2>


                       
            {/* FORECAST Hours */}
            <Grid2 size={6}>
               <TextField  type='number' fullWidth id="forecast" name="forecast" label="Forecast"  onChange={(e)=> setForecastHour(e.target.value) } variant="outlined" />
           </Grid2>


                       
            {/* Week Start Date */}
            <Grid2 size={6}>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DemoContainer  components={['DatePicker']}>
                        <DatePicker  label="Week Start Date" onChange={(newValue) => setWeekStartDate(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>                
               
           </Grid2>   

            {/* Add Button */}
            <Grid2 size={12}>
                <Stack direction='row' justifyContent='start'>
                    <Button variant='outlined' size="medium" type="button" onClick={handleCollectForecastData} > + Add Hours </Button>                           
                </Stack>
           </Grid2>                     

       </Grid2>

            
        


        {/* SELECTED Teams Display Card */}
        <Box sx={{bg:'primary.main', height:'200px', overflowY: 'scroll'}}>
            {
                forecastData.map((item, index)=> 
                <Stack key={index} direction="row"  justifyContent='space-between' spacing={2} p={1} mb={1} bgcolor={'#e2efff'} >
                    <Stack key={index} direction="row" spacing={2}>
                        <Box>{item.domain}: </Box>
                        <Box>{item.forecastHour} Hrs</Box>
                    </Stack>


                    <IconButton aria-label="delete" size="small" onClick={()=>removeForecastDataEntry(index)} >
                        <CloseOutlinedIcon fontSize="inherit" />
                    </IconButton>

                </Stack>
                )
            }
            
        </Box>
        
        <Box className="modal-footer">
            <Stack direction="row"  justifyContent='end' >
                <Button variant="contained" type="submit"> Create</Button>
            </Stack>
        </Box>
       

  </Box>
  )

}



