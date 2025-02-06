import React from 'react'
import { Box, Button, IconButton, Link, Modal, Stack, TableCell, TableRow, Typography } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateGuidelineForm from '../../features/guideline/CreateGuidelineForm';
import { useDeleteGuideline } from '../../hooks/guideline/useGuideline';



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
  


export default function GuidelineTableRow({guideline}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {deleteGuidelineMutationFn, isDeletingGuideline, deleteGuidelineError}   = useDeleteGuideline();


    function handleDeteGuideline(){
        deleteGuidelineMutationFn(guideline._id)
    }



  return (
    <TableRow  key={guideline._id}>
        <TableCell> {guideline.guidelineName} </TableCell>
        <TableCell >{guideline?.description}</TableCell>
        <TableCell >{guideline?.category}</TableCell>
        <TableCell >{guideline?.domain}</TableCell>
        <TableCell ><Link href={guideline?.referenceLink}>Tutorial</Link></TableCell>
        
        <TableCell >
            <Stack direction="row">
                
                <IconButton aria-label="edit" onClick={handleOpen}> <EditIcon /> </IconButton>
                
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                    
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h1" component="h2"> Edit Guideline </Typography>
                        <Box className="modal-body" sx={{ flexGrow: 1 }}>
                            <CreateGuidelineForm guideline={guideline} />
                        </Box>
                    </Box>
                    
                </Modal>
                                                             
                <IconButton aria-label="delete"  onClick={handleDeteGuideline} > <DeleteIcon /> </IconButton>
            
            </Stack>
        </TableCell>                
    </TableRow>
)
}
