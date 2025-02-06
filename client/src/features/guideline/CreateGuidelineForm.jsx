
import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid2, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateGuideline, useDeleteGuideline, useUpdateGuideline } from '../../hooks/guideline/useGuideline';


export default function CreateGuidelineForm({guideline}) {
    const isEditSession = guideline?.guidelineName ? true : false;
    
    console.log(guideline);
    console.log(isEditSession);
    
    const{register, handleSubmit, reset} = useForm( {defaultValue: isEditSession? guideline : {}  } );

    const[domain, setDomain] = useState(isEditSession? guideline.domain : "");
    const[category, setCategory] = useState( isEditSession ? guideline.category : "" );
    
    const {createGuidelineMutationFn, isCreatingGuideline, createGuidelineError}  = useCreateGuideline();
    const {updateGuidelineMutationFn, isUpdatingGuideline, updateGuidelineError}   = useUpdateGuideline();
    
    
    function handleCreateGuideline(data){
        const createGuidelineData = {...data, domain, category};
        // console.log(createGuidelineData);

        if(!isEditSession){
            createGuidelineMutationFn(createGuidelineData)
        }else{

            delete data['__v']
            console.log(data);
            

            updateGuidelineMutationFn(data)
        }
        
    }


    useEffect(()=>{
        if(guideline){
            reset(guideline)
        }

    },[isEditSession, guideline])


    return (
    <Box component="form" onSubmit={handleSubmit(handleCreateGuideline)}>
        
        <Grid2 container spacing={2}>
            <Grid2 size={6}>
                <FormControl fullWidth>
                    <InputLabel id="domain">Domain</InputLabel>
                    <Select
                    labelId="domain" id="domain" 
                    value={domain}
                    label="Domain"
                    onChange={(e)=> setDomain(e.target.value)}
                    >
                        <MenuItem key={"Research"} value={'Research'}> Research </MenuItem>
                        <MenuItem key={"Design"} value={'Design'}> Design </MenuItem>                        
                        <MenuItem key={"Development"} value={'Development'}> Development </MenuItem>                        
                        <MenuItem key={"Accessibility"} value={'Accessibility'}> Accessibility </MenuItem>                        
                    </Select>
                </FormControl>
            </Grid2>


            <Grid2 size={6}>
                <FormControl fullWidth>
                    <InputLabel id="domain">Category</InputLabel>
                    <Select labelId="category" id="category"
                    value={category}
                    label="Category"
                    onChange={(e)=> setCategory(e.target.value)}
                    >                      
                        <MenuItem key={"Auto Layout"} value={'Auto Layout'}> Auto Layout </MenuItem>
                        <MenuItem key={"Alignments"} value={'Alignments'}> Alignments </MenuItem>                    
                        <MenuItem key={"Design System"} value={'Design System'}> Design System </MenuItem>                    
                        <MenuItem key={"Code Structure"} value={'Code Structure'}> Code Structure </MenuItem>
                        <MenuItem key={"Theme Setups"} value={'Theme Setups'}> Theme Setups </MenuItem>
                        <MenuItem key={"Static Resource"} value={'Static Resource'}> Static Resource </MenuItem>
                        <MenuItem key={"Color"} value={'Color'}> Color </MenuItem>
                        <MenuItem key={"Typography"} value={'Typography'}> Typography </MenuItem>
                        <MenuItem key={"Componentization"} value={'Componentization'}> Componentization </MenuItem>
                        <MenuItem key={"Variables"} value={'Variables'}> Variables </MenuItem>
                        <MenuItem key={"Other"} value={'Other'}> Other </MenuItem>
                    </Select>
                </FormControl>
            </Grid2>   
            
            <Grid2 size={6}>
                <TextField fullWidth id="guidelineName" name="guidelineName" label="Guideline Name" {...register('guidelineName')} variant="outlined" />
            </Grid2>

            <Grid2 size={6}>
                <TextField fullWidth id="description" name="description" label="Description" {...register('description')} variant="outlined" />
            </Grid2>

            <Grid2 size={6}>
                <TextField fullWidth id="referenceLink" name="referenceLink" label="Reference Link" {...register('referenceLink')} variant="outlined" />
            </Grid2>
        </Grid2>
             

        <Box className="modal-footer">
            <Stack direction='row' justifyContent='end' spacing={1}>
            <Button variant="contained" type="submit"> {!isEditSession ? "Create" : "Update" }</Button>
            </Stack>
        </Box> 
    

</Box>   
  )
}
