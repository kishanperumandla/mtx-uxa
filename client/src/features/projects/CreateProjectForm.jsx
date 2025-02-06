import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid2, IconButton, InputLabel, MenuItem, Select, Stack, styled, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../hooks/user/useUser';
import { useForm } from 'react-hook-form';
import { useCreateProject, useUpdateProject } from '../../hooks/project/useProject';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import BackupIcon from "@mui/icons-material/Backup";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const rolesInProject = ['Researcher', 'Designer', 'Developer', 'Accessibility', 'Hybrid']

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





export default function CreateProjectForm({project, editSession}){

    console.log(project);
    

    const existingProjectData = project
    ? {
        startDate:  dayjs(project.startDate).format('MM/DD/YYYY')  || "",
        endDate: dayjs(project.endDate).format('MM/DD/YYYY') || "",
        createdByID: project.createdByID || "",
        projectName: project.projectName || "",
        projectStatus: project.projectStatus || "",
        // projectTeam: project.projectTeam || [],
        // projectTeam: project.projectTeam.map(team => {  const newObj = {...team.teamMemberID, ...team.roleInProject }; return newObj } ) || [],
        projectTeam: project.projectTeam.map(({ teamMemberID, roleInProject }) => ({
            ...teamMemberID,
            roleInProject
        })) 
        || [],
        
        projectThumbnail: project.projectThumbnail || "",
      }
    : {};

    console.log(existingProjectData);
    


    

    const {register, handleSubmit, formState: { errors }, reset} = useForm({ defaultValues: editSession ? existingProjectData : {}});
    
    const [selectedProjectTeam, setSelectedProjectTeam] = useState( existingProjectData && existingProjectData.projectTeam?.length>0 ? existingProjectData.projectTeam : []);     
    // console.log(selectedProjectTeam);
      



    const [projectSingleTeamMemberId, setProjectSingleTeamMemberId] = useState('');
    const [projectTeamSingle, setProjectTeamSingle] = useState("");
    
    const [projectStatus, setProjectStatus] = useState('Research');
    
    const [startDate, setStartDate] = useState(dayjs( existingProjectData? existingProjectData.startDate : '2022-04-17'));
   
    const [endDate, setEndDate] = useState(dayjs(existingProjectData? existingProjectData.endDate : '2022-04-17'));
    

    
    
    
    
    // console.log('Day.js Object:', startDate); // Logs the actual Day.js object
    // console.log('Formatted Date:', startDate.format('MM/DD/YYYY')); // Logs the formatted string
    // console.log('Type of startDate:', typeof startDate); // Verifies that it's an object
    // console.log('Is Day.js object:', dayjs.isDayjs(startDate)); // Confirms it's a Day.js object
    

    
    
    
    
    // console.log(selectedProjectTeam);
    // console.log(teamRolesInProject);

    


    const{users, isGettingUsers, getUserError} = useGetUser();
    const {projectMutationFn, isCreatingProject, projectError} = useCreateProject();
    const {updateProjectMutationFn, isUpdateProject, updateProjectError}  = useUpdateProject();
    const authUser = getAuthUserFromLocalStorage();
    


    // console.log(selectedProjectTeam);
    // console.log(projectTeamSingle);
    // console.log(projectStatus);
    // console.log(project);
    // console.log(users);
    // console.log(startDate);
    // console.log(endDate);
    


    
    //----> SELECT TEAM
    const handleSelectTeam = (event) => {
        console.log(event.target.value);
        
        setSelectedProjectTeam(prev =>{
          const isRedundentEntry = prev.some(item => item === event.target.value)
          if(isRedundentEntry) return prev;
  
          return [...prev, event.target.value]
  
        });

        setProjectTeamSingle(event.target.value);
  
        setProjectSingleTeamMemberId(event.target.value)
      };
      
  
  
    // SELECT ROLES
    function handleSelectRole(e, roleSelection) {
      console.log(e.target.checked);
      console.log(roleSelection);
      
  
      if (e.target.checked) {      
        const projectTeamWithRoles = 
        selectedProjectTeam.map(team => team._id === roleSelection._id ? {...team, roleInProject:[...team.roleInProject || [], roleSelection.role]} : team  )
        
        setSelectedProjectTeam(projectTeamWithRoles)
        
      } else {
        // Remove role if unchecked
        const projectTeamWithUpdatedRoles = 
        selectedProjectTeam.map(team => { 
            if(team._id === roleSelection._id){
                const updatedRoles = team.roleInProject.filter(role => role !== roleSelection.role);
                return {...team, roleInProject: updatedRoles}
            }else{
                return team
            }
        });

        setSelectedProjectTeam(projectTeamWithUpdatedRoles)                
      }    
    }
  
  

    //----> REMOVE User Selections
    function handleRemoveTeamMember(id) {      
    const newTeam = selectedProjectTeam.filter(prjTm => prjTm._id !== id);

    setSelectedProjectTeam(newTeam);
    // console.log(newTeam);
    
    }
  
  
      
  
    //----> CREATE Project
    function handleCreateProject(data) {
        // console.log(data);                    
        const updatedProjectTeamMembers = selectedProjectTeam.map(item => { return {teamMemberID: item._id , roleInProject: item.roleInProject} } );
        
        // console.log(updatedProjectTeamMembers);
        

        const formData = new FormData();
        formData.append('startDate', startDate.format('MM/DD/YYYY'));
        formData.append('endDate', endDate.format('MM/DD/YYYY'));
        formData.append('projectName', data.projectName);
        formData.append('projectTeam', JSON.stringify(updatedProjectTeamMembers));
        formData.append('createdByID', authUser.id);
        formData.append('projectStatus', projectStatus);


        // DETECTING an Image File Type 
        if ( data.projectThumbnail instanceof FileList &&  data.projectThumbnail.length > 0) {        
            formData.append("projectThumbnail", data.projectThumbnail[0]);               
        }

        if(typeof data.projectThumbnail === 'string'){        
            formData.append("projectThumbnail", data.projectThumbnail);
        }

        
        for(let[key, val] of formData){
            // console.log(key,":", val);            
        }
        

        if(!editSession){
            console.log('This is CREATE Project');            
            
            projectMutationFn(formData);

        }else{
            console.log('This is EDIT Project');
            formData.append("projectId", project._id );
            for(let[key, val] of formData){
                console.log(key, val);            
            }                           
            updateProjectMutationFn(formData);
        }
        

    }



    useEffect(() => {
        if (editSession) {
          reset(existingProjectData);
        }
      }, [editSession, project, reset]);
    
  



  return (
    <Box component="form"  onSubmit = {handleSubmit(handleCreateProject)}>
                  
        <Grid2 container spacing={2} sx={{mb:2}}>
            
             {/* PROJECT Name */}
            <Grid2 size={6}>
                <TextField fullWidth id="projectName" name="projectName" label="Project Name"  {...register('projectName', { required: false }) } variant="outlined" />
            </Grid2>


            {/* PROJECT Status */}
            <Grid2 size={6}>
                { users &&
                    <FormControl fullWidth>
                        <InputLabel id="projectStatus">Project Status</InputLabel>
                        <Select
                        labelId="projectStatus"
                        id="projectStatus"
                        value={projectStatus}
                        label="Project Status"
                        onChange={(e)=> setProjectStatus(e.target.value)}                            
                        >
                            <MenuItem key={"Research"} value={'Research'}> Research </MenuItem>
                            <MenuItem key={"Design"} value={'Design'}> Design </MenuItem>                        
                            <MenuItem key={"Development"} value={'Development'}> Development </MenuItem>                        
                            <MenuItem key={"UAT"} value={'UAT'}> UAT </MenuItem>                        
                            <MenuItem key={"Enhancements"} value={'Enhancements'}> Enhancements </MenuItem>                        
                            <MenuItem key={"Closed"} value={'Closed'}> Closed </MenuItem>                        
                        </Select>                        
                    </FormControl>
                }
            </Grid2>


            {/* START Date */}
            <Grid2 size={6}>
                {/* <TextField fullWidth id="startDate" name="startDate" label="Start Date" {...register('startDate', { required: false })}  /> */}
                {/* <TextField fullWidth id="startDate" name="startDate" label="Start Date"  type="date"  {...register( "startDate" ) }/> */}

                {/* <DatePicker
                label="Controlled picker"
                value={value}
                onChange={(newValue) => setValue(newValue)} /> */}

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker', 'DatePicker']} >                        
                        <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue) }/>
                    </DemoContainer>
                </LocalizationProvider>                
            </Grid2>


            {/* END Date */}
            <Grid2 size={6}>
                {/* <TextField fullWidth id="endDate" name="endDate" label="End Date" {...register('endDate', { required: false })} /> */}
                {/* <TextField fullWidth id="endDate" name="endDate" label="End Date"  type="date"  {...register( "endDate" ) }/>
                <TextField fullWidth id="endDate" name="endDate" label="End Date" type="date" {...register("endDate")} /> */}


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>                        
                        <DatePicker                        
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue) }
                        />
                    </DemoContainer>
                </LocalizationProvider>   
            </Grid2>


            {/* SELECTED Team */}
            <Grid2 size={12}>
                { users &&
                    <FormControl fullWidth>
                        <InputLabel id="projectTeamLabel">Team Members</InputLabel>
                        
                        <Select
                        labelId="projectTeamLabel"
                        id="projectTeam"
                        value={projectTeamSingle}
                        label="Project Team"
                        onChange={handleSelectTeam}
                        >

                        {users?.map((user) => (
                            <MenuItem key={user._id} value={user}>
                                {user.firstName}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                }
            </Grid2> 


            {/* <Grid2 size={6}>
                <TextField fullWidth id="time" type="date"  {...register( "projectStartDate" ) }/>
            </Grid2> */}

        </Grid2>

            
        


        {/* SELECTED Teams Display Card */}
        <Box sx={{bg:'primary.main'}}>
            { selectedProjectTeam?.length > 0 && selectedProjectTeam.map(team => 
                
                <Box sx={{border: '1px solid #c8c8c8', mb:2 }} key={team._id}>
                    {/* Title and Close Button*/}
                    <Stack spacing={2} direction="row" sx={{justifyContent: "space-between", alignItems: "center", bgcolor:'grey.200', p: 2 }}>
                        <span> {team?.firstName || team?.teamMemberID?.firstName}</span>
                        <IconButton aria-label="delete" size="small" onClick={()=>handleRemoveTeamMember(team._id)}> <HighlightOffOutlinedIcon fontSize="small"/> </IconButton>
                    </Stack>
                    
                    {/* Check Boxes */}
                    <FormGroup sx={{p: 2}}>
                        {rolesInProject?.map((role, index) => (
                        <FormControlLabel
                            key={index}
                            label={role}
                            control={ <Checkbox checked={ editSession && team.roleInProject?.includes(role)} onChange={(e) => handleSelectRole(e, {_id:team._id, role})} /> }
                        />
                        ))}
                    </FormGroup>                
                </Box> 
            )}
        </Box>

        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<BackupIcon />} >
            Upload Project banner
            <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple {...register('projectThumbnail')} />
        </Button>
       


        <Box className="modal-footer">
            <Stack direction='row' justifyContent='end' spacing={1}>
                <Button variant="contained" type="submit"> {editSession?"update":"Create"}</Button>
            </Stack>
        </Box>    

  </Box>    
  )

}



