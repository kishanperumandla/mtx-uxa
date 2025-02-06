import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid2, IconButton, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, Stack, styled, TextField, Typography,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetProject } from "../../hooks/project/useProject";
import { useCreateReviewProject, useUpdateReviewProject } from "../../hooks/project-review/useReviewProject";
import { useForm } from "react-hook-form";
import { useGetUser } from "../../hooks/user/useUser";
import { useGetGuidelines } from "../../hooks/guideline/useGuideline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const phases = ["Not Started", "Phase 1", "Phase 2"];
const reviewDomains = ["Research", "Design", "Development", "A11Y"];
const reviewRoles = ["Reviewee", "Reviewer"];



export default function ProjectReviewForm({ editSession, project }) {
    console.log(project);

    const existingProject = project
    ? {
      projectID: project.projectID._id || "",
      reviewPhase: project.reviewPhase || "",
      reviewTeam: project.reviewTeam.map(({teamMemberID, reviewDomain, reviewRole  }) => {return {...teamMemberID, reviewDomain, reviewRole} } ) || [],
      // projectReviewScore: project.projectReviewScore || "",
      designFile: project.designFile || "",
      devCreds: project.devCreds || "",
      lastReviewDate: dayjs(project.lastReviewDate).format('MM/DD/YYYY') || "",
    }
    : {};
    
    console.log(existingProject);
    

    const { register, handleSubmit, formState: { errors }, reset, } = useForm(editSession ? existingProject : {});

    const { projects, isFetchingProjects, fetchProjectError } = useGetProject();

    
    const { reviewProjectMutationFn, isCreatingReviewProject, reviewProjectError} = useCreateReviewProject();
    const {updateReviewProjectMutationFn, isUpdatingReviewProject, updateReviewProjectError}   = useUpdateReviewProject()
    const { users, isGettingUsers, getUserError } = useGetUser();
    console.log(users);
    

    const { guidelines, isGuidelinesLoading, guidelinesError } = useGetGuidelines();

    const [selectedProject, setSelectedProject] = useState("");


    

    const [reviewPhase, setReviewPhase] = useState(editSession ? existingProject.reviewPhase : "");
    
    const [reviewTeam, setReviewTeam] = useState( existingProject && existingProject?.reviewTeam?.length >0? existingProject?.reviewTeam : []);
    console.log(reviewTeam);
    
    const [reviewTeamSingle, setReviewTeamSingle] = useState("");

    
  

    const [lastReviewDate, setLastReviewDate] = useState( dayjs( existingProject ? existingProject.lastReviewDate : '2022-04-17'));

  // console.log(lastReviewDate.format('MM/DD/YYYY'));
  
  


    // SELECT Project
    function handleSelectProject(e) {
      console.log(e.target.value);    

      setSelectedProject(e.target.value);
    }



    // SELECT Review Team
    function handleSelectTeam(e) {
      console.log(e.target.value);

      setReviewTeam((prev) => {
        const isSelectedAlready = prev.some(
          (team) => team._id === e.target.value._id
        );
        if (!isSelectedAlready) return [...prev, e.target.value];
        if (isSelectedAlready) return prev;
      });

      setReviewTeamSingle(e.target.value);
    }



    // SELECT Review Phase
    function handleSelectReviewPhase(e) {
      setReviewPhase(e.target.value);
    }

    // SELECT Review Domain
    function handleSelectReviewDomain(e, reviewDomainSelection) {
      const teamId = reviewDomainSelection._id;
      const reviewDomain = reviewDomainSelection.reviewDomain;
    
      const updatedReviewTeam = reviewTeam.map((team) => {
        if (team._id === teamId) {
          return {
            ...team,
            reviewDomain: e.target.checked
              ? [...(team.reviewDomain || []), reviewDomain] // Add the domain if checked
              : (team.reviewDomain || []).filter((domain) => domain !== reviewDomain), // Remove the domain if unchecked
          };
        }
        return team;
      });
    
      console.log(updatedReviewTeam);
      setReviewTeam(updatedReviewTeam);
    }


    function handleSelectReviewRole(e, teamId) {
      console.log(e.target.value);

      const updatedReviewTeam = reviewTeam.map((team) =>
        team._id === teamId ? { ...team, reviewRole: e.target.value } : team
      );
      setReviewTeam(updatedReviewTeam);
    }


  
    // REMOVE Team Member
    function handleRemoveTeamMember(id) {
      const updatedRevieTeam = reviewTeam.filter((team) => team._id !== id);
      setReviewTeam(updatedRevieTeam);
    }



    // CREATE Review Project
    function handleCreateReviewProject(data) {
      // console.log(data);

      const guidelineIDs = guidelines.map((guidln) => {
        return { guidelineID: guidln._id };
      });
      // console.log(guidelineIDs);

      const reviewTeamData = reviewTeam.map((team) => {
        return {
          teamMemberID: team._id,
          reviewDomain: team.reviewDomain,
          reviewRole: team.reviewRole,
        };
      });

      const newReviewProjectUpdatedData = {
        ...data,
        projectID: selectedProject._id,
        
        reviewPhase,
        reviewTeam: reviewTeamData,
        reviewGuidelines: guidelineIDs,
        lastReviewDate : lastReviewDate.format("MM/DD/YYYY")
      };

      

      if(!editSession){       
        console.log(newReviewProjectUpdatedData);
        reviewProjectMutationFn(newReviewProjectUpdatedData);
      }else{

        // console.log("From Update Review Project");

        let editData = {
          ...newReviewProjectUpdatedData,
          reviewProjectId: project._id,
          editReviewProject:true      
        }
        
        delete editData.reviewGuidelines;
        delete editData.projectID;

        console.log(editData);
        updateReviewProjectMutationFn(editData)
        
        
      }

    }



    useEffect(() => {
      if (editSession) {
        reset(existingProject);
      }
    }, [editSession, reset]);
    


  return (
    <Box component="form" onSubmit={handleSubmit(handleCreateReviewProject)}>
      {/* {editSession &&  <Typography variant='h5'>{project.projectID.projectName}</Typography>  } */}

      <Grid2 container spacing={2}>        
        {!editSession && 
          <Grid2 size={6} >                        
            <FormControl fullWidth >
              <InputLabel id="review-project-label">Project</InputLabel>
              <Select
                labelId="review-project-label"
                id="review-project"            
                value={selectedProject }
                label="Project"
                onChange={handleSelectProject}
              >
                {projects?.map((proj, index) => (
                  <MenuItem key={proj._id} value={proj}>
                    { proj.projectName } 
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
                          
          </Grid2>
          }



        <Grid2 size={6}>
        
            <FormControl fullWidth>
              <InputLabel id="review-phase-label">Review phase</InputLabel>
              <Select
                labelId="review-project-label"
                id="review-phase"
                value={!editSession ? reviewPhase : existingProject.reviewPhase}
                label="Project"
                onChange={handleSelectReviewPhase}
              >
                {phases?.map((phase, index) => (
                  <MenuItem key={index} value={phase}>
                    {phase}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
                
        </Grid2>

        {/* PROJECT SCORE */}
        {/* <Grid2 size={6}>

            {
              !editSession &&
              <TextField
                fullWidth
                id="projectReviewScore"
                name="Project Review Score"
                label="Project ReviewScore"
                {...register("projectReviewScore", { required: false })}
                variant="outlined"
              />
            }

        </Grid2> */}
        
        {/* DESIGN FILE Link */}
        <Grid2 size={6}>
            <TextField
              fullWidth
              id="designFile"
              name="designFile"
              label="Design File"
              {...register("designFile", { required: false })}
              variant="outlined"
            />
        </Grid2>


        {/* LAST REVIWED Date */}
        <Grid2 size={6}>

          {/* <TextField
            fullWidth
            id="lastReviewDate"
            name="lastReviewDate"
            type="date"
            label="Last Reviewd Date"
            {...register("lastReviewDate", { required: false })}
            variant="outlined"
          />    */}
          

          <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer components={['DatePicker', 'DatePicker']} >                        
                  <DatePicker fullWidth label="Last Review Date" value={lastReviewDate}  onChange={(newValue) => setLastReviewDate(newValue)} />
              </DemoContainer>
          </LocalizationProvider>
        </Grid2>        

        
        {/* DEV CREDS */}
        <Grid2 size={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            id="devCreds"
            name="devCreds"
            label="Dev Creds"
            {...register("devCreds", { required: false })}
            variant="outlined"
          />  
        </Grid2>
        


          
        
        {/* SELECT REVIEW Team */}
        <Grid2 size={6}>
          <FormControl fullWidth>
            <InputLabel id="review-team-label">Review Team</InputLabel>
            <Select labelId="review-team-label" id="review-team" value={reviewTeamSingle} label="Project Team" onChange={handleSelectTeam} fullWidth >
              {users?.map((user) => (
                <MenuItem key={user._id} value={user}>
                  {user.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>          
        </Grid2>


      </Grid2>
      
      <Stack sx={{bg:'primary.main', height:'200px'}}>
        {reviewTeam?.map((team) => (
          <Item key={team._id} sx={{ backgroundColor:"#F8F8F8" , display: "flex", flexDirection: "column" , marginBottom:2 }} >
           
            <Stack direction="row" justifyContent="space-between"  alignItems="start" >
              
              <Stack justifyContent="flex-start" direction="column" alignItems="start">
                <Typography variant="h6" sx={{marginBottom:1}}>{ team.teamMemberID?  team.teamMemberID.firstName : team.firstName}</Typography>
                <FormLabel component="legend" sx={{textTransform:"uppercase", fontSize:13 }}>Assign responsibility</FormLabel>
              </Stack>

              <IconButton aria-label="delete" size="small" onClick={() => handleRemoveTeamMember(team._id)}>
                {" "} <HighlightOffOutlinedIcon fontSize="small" />{" "}
              </IconButton>
            </Stack>

            <FormControl component="fieldset" variant="standard" sx={{mb:2}}>              
              <FormGroup>
                {reviewDomains.map((reviewDomain, index) => (
                  <FormControlLabel
                    key={index}
                    label={reviewDomain}
                    control={
                      <Checkbox
                        checked = {team?.reviewDomain?.includes(reviewDomain) ? true :false}
                        onChange={(e) =>
                          handleSelectReviewDomain(e, {
                            _id: team._id,
                            reviewDomain,
                          })
                        }
                      />
                    }
                  />
                ))}
              </FormGroup>
            </FormControl>




            <Stack direction="row" justifyContent="start" >
              <FormLabel id="review-role-label" sx={{textTransform:"uppercase", fontSize:13 }}>Review Role</FormLabel>
            </Stack>

            <FormControl>              
              <RadioGroup row aria-labelledby="review-role-label" name="review-role"  onChange={(e) => handleSelectReviewRole(e, team._id)}>
                <FormControlLabel
                  value="Reviewee"
                  control={<Radio/>}
                  label="Reviewee"
                  // checked={ editSession && reviewRoles.includes(team.reviewRole)}
                  checked={ editSession && (team.reviewRole ===  "Reviewee")}
                />
                <FormControlLabel
                  value="Reviewer"
                  control={<Radio/>}
                  label="Reviewer"
                  // checked={ editSession && reviewRoles.includes(team.reviewRole)}
                  checked={ editSession && (team.reviewRole ===  "Reviewer")}                  
                />
              </RadioGroup>
            </FormControl>


          </Item>
        ))}
      </Stack>
        
      <Box className='modal-footer'>
        <Stack direction='row' justifyContent='end'>
          <Button tton variant="contained" type="submit"> {!editSession ? "Create" : "Update" } </Button>
        </Stack>
      </Box>
    </Box>
  );
}
