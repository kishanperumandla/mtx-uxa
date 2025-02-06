import React, { useEffect, useState } from 'react'
import { useGetGuidelines } from '../../hooks/guideline/useGuideline'
import CreateGuidelineForm from '../../features/guideline/CreateGuidelineForm';
import { Box, Modal, FormControl, Grid2, InputLabel, MenuItem, Select, TextField, Typography, Button, IconButton, Stack } from '@mui/material';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GuidelineTableRow from '../../components/guideline/GuidelineTableRow';
import AddIcon from '@mui/icons-material/Add';



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Guidelines() {
  const [open, setOpen] = useState(false);
  const [filteredGuidelines, setFilteredGuidelines] = useState([]);
  const [guidelineKey, setguidelineKey] = useState(null);
  console.log(guidelineKey);
  
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {guidelines, isGuidelinesLoading, guidelinesError } = useGetGuidelines();
  
  
  function handleGuidelineFilter(filterKey){
    const filteredGdlines = guidelines?.filter(gdline => gdline.domain === filterKey  );    
    setFilteredGuidelines(filteredGdlines);
    setguidelineKey(filterKey)
  }


  

  // const designGuidelines = guidelines?.filter(gdline => gdline.domain === 'Design');
  // const accessibilityGuidelines = guidelines?.filter(gdline => gdline.domain === 'Accessibility');
  // const developmentGuidelines = guidelines?.filter(gdline => gdline.domain === 'Development');
  // console.log(designGuidelines);

  useEffect(()=>{
    handleGuidelineFilter('Design')
  },[guidelines])
  
  


  return (
    <Box sx={{p:4}} className='guidelines-view'>
      
      <Stack direction='row' justifyContent='space-between' alignItems='center' py={2} mb={2}>  
        <Typography variant='h1'>Guidelines</Typography>        
        <Button variant='contained' onClick={handleOpen} startIcon={<AddIcon/>}>Create Gudeline</Button>
      </Stack>
            
      {/* MODAL */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">        
        <Box sx={style}> 
            <Typography variant='h1'  mb={3}> Create Guideline </Typography>
            
            <Box className="modal-body" sx={{ flexGrow: 1 }}  >
              <CreateGuidelineForm/>
            </Box>
        </Box>  
      </Modal> 


      {/* TAB Button */}
      <Stack direction='row' spacing={1} mb={1}>
        <Button  sx={ guidelineKey === 'Design' ? { backgroundColor: 'primary.main', color:'common.white'} : { backgroundColor: 'none', color:'common.black'} }  onClick={()=>handleGuidelineFilter('Design')}>Design</Button>
        <Button sx={ guidelineKey === 'Development' ? { backgroundColor: 'primary.main', color:'common.white'} : { backgroundColor: 'none', color:'common.black'} } onClick={()=>handleGuidelineFilter('Development')}>Development</Button>
        <Button sx={ guidelineKey === 'Accessibility' ? { backgroundColor: 'primary.main', color:'common.white'} : { backgroundColor: 'none', color:'common.black'} } onClick={()=>handleGuidelineFilter('Accessibility')}>Accessibility</Button>          
      </Stack>

      {/*GUIDELINES Table*/}
       <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >Guideline Name</TableCell>
                <TableCell >Description</TableCell>
                <TableCell >Category</TableCell>
                <TableCell >Domain</TableCell>
                <TableCell >Reference Link</TableCell>
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>    
              {filteredGuidelines?.length>0 &&  filteredGuidelines?.map(guideline => <GuidelineTableRow key={guideline._id} guideline={guideline} />) }      
            </TableBody>

          </Table>
        </TableContainer>




    </Box>

    
  )
}
