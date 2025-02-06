import React from 'react'
import { Box, IconButton, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateForecastForm from '../../features/forecast/CreateForecastForm';
import { useGetForecast } from '../../hooks/forecast/useForecast';
import EmptyDataImage from '../../assets/empty-data.svg'


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


  import { BASE_ORIGIN } from "../../config/config";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGetUser } from '../../hooks/user/useUser';
import { getAuthUserFromLocalStorage } from '../../utility/localStorage';
import AddIcon from '@mui/icons-material/Add';


const projectThumbStyle= {
    width: 32,
    height: 32,
    borderRadius: '50%', 
    objectFit: 'cover',
  }
  


export default function Forecast() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const authUser = getAuthUserFromLocalStorage();

    
    const [openEditModal, setOpenEditModal] = React.useState(false);

    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);
    
    
    
    // GET Forecast
    const {forecast, isFetchingForecast, fetchForecastError} = useGetForecast();
    // console.log(forecast);
    

    const userQueryObj = {
        id: authUser.id
    }

    
    

    // Updating weekStartDate Date Formate
    const updatedForecast = forecast?.map((item) => {
        const validDate = item?.weekStartDate ? new Date(item.weekStartDate) : null;
    
        return {
            ...item,
            weekStartDate: validDate && !isNaN(validDate)
                ? `${validDate.getMonth() + 1}/${validDate.getDate()}/${validDate.getFullYear()}` // Format as MM/DD/YYYY
                : "Invalid Date", // Handle invalid dates
        };
    });

    // console.log(updatedForecast);
    
    
    
    let weekWiseForecast = {}
    
    for(let i=0; i<updatedForecast?.length; i++){
       if(weekWiseForecast[updatedForecast?.[i].weekStartDate]){
          weekWiseForecast[updatedForecast?.[i].weekStartDate].push(updatedForecast?.[i])
       }else{
         weekWiseForecast[updatedForecast?.[i].weekStartDate] = [updatedForecast?.[i]];
       }
   }

   console.log(weekWiseForecast);






    // const users = [ 
    //     {name:'kishan', city:'hyderabad'},
    //     {name:'ram', city:'banglore'},
    //     {name:'kishan', city:'pune'},
    //     {name:'jai', city:'chennai'},
    //     {name:'ram', city:'kochi'},
    //     {name:'kishan', city:'mumbai'},
    //     {name:'pankaj', city:'gurudwar'},        
    //  ]


    //  let newUsersObj = {}
     
    //  for(let i=0; i<users.length; i++){
    //     if(newUsersObj[users[i].name]){
    //        newUsersObj[users[i].name].push(users[i])
    //     } else {
    //         newUsersObj[users[i].name] = [users[i]];
    //     }
    // }
    // console.log(newUsersObj);
     

    

  return (
    <Box sx={{p:4}} className='forecast-view'> 
        <Stack direction='row' justifyContent='space-between' alignItems='center' py={2} mb={2}>
            <Typography variant='h1'>Forecast</Typography>                   
            <Button variant='contained' aria-label="create forecast" onClick={handleOpen} startIcon={<AddIcon/>}>Create Forecast</Button>
        </Stack>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h1"> Create Forecast </Typography>
                <Box className="modal-body">
                    <CreateForecastForm/>
                </Box>
            </Box>                                    
        </Modal>

        {forecast && forecast.length > 0 ?

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Team Member</TableCell>
                        <TableCell >Project</TableCell>
                        <TableCell >Week</TableCell>
                        <TableCell >Domains</TableCell>
                        <TableCell >Forecast</TableCell>
                        <TableCell >Availability</TableCell>
                        <TableCell >Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>                    
                    {weekWiseForecast && Object.values(weekWiseForecast).map((weekFcast, index) => 
                        <React.Fragment key={index}>
                            <TableRow>
                                <TableCell colSpan={7} > 
                                    <Stack direction='row' spacing={1}   >
                                        <Typography variant='h6' color='primary.dark'>Week:</Typography> 
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold'>{Object.keys(weekWiseForecast)[index]}</Typography> 
                                    </Stack>
                                </TableCell>
                            </TableRow>

                            <React.Fragment>
                                {weekFcast?.map((wFcast, index)=>                                     
                                    <TableRow key={index}>
                                        <TableCell> 
                                            <Stack direction='row' alignItems='center'  spacing={1} >
                                                {
                                                    wFcast.teamMemberId && wFcast.teamMemberId.avatar ? 
                                                    <Box component="img"  src={`${BASE_ORIGIN}/uploads/${wFcast.teamMemberId.avatar}`}  sx={projectThumbStyle} alt="Example" /> :
                                                    <AccountCircleIcon/> 
                                                }

                                                <Box>
                                                    {wFcast.teamMemberId.firstName + " " + wFcast.teamMemberId.lastName} 
                                                </Box>
                                            
                                            </Stack>                                           
                                        </TableCell>

                                        <TableCell >{wFcast.projectName}</TableCell>
                                        <TableCell >{wFcast.weekStartDate}</TableCell>
                                        
                                        <TableCell >
                                            {
                                                wFcast.forecastData.map(item => 
                                                    <Stack key={item._id} direction='row' className='forecast-deet' spacing={1} >
                                                        <Box className="domain">{item.domain}:</Box> 
                                                        <Box className="hour">{item.forecastHour}</Box> 
                                                    </Stack>
                                                )
                                            }
                                        </TableCell>

                                        <TableCell> 
                                            { wFcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) } 
                                        </TableCell>
                                        
                                        <TableCell >
                                            {
                                                wFcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 40 ? <Chip size="small" label="Unavailable" color="error" variant="outlined" /> : 
                                                wFcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 30 ? <Chip size="small" label="Low" color="warning" variant="outlined" /> :
                                                wFcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 20 ? <Chip size="small" label="Half" color="primary" variant="outlined" /> :
                                                wFcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 10 ? <Chip size="small" label="High" color="success" variant="outlined" />: <Chip label="Full" color="success" variant="outlined" />                                
                                            } 
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Stack direction="row">                                
                                                <IconButton  aria-label="edit" onClick={handleOpenEditModal}> <EditIcon /> </IconButton>
                                                
                                                <Modal open={openEditModal} onClose={handleCloseEditModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h1"> Edit Forecast </Typography>
                                                        <Box className="modal-body">
                                                            <CreateForecastForm/>
                                                        </Box>
                                                    </Box>
                                                </Modal>
                                                                                            
                                                <IconButton aria-label="delete">  
                                                    <DeleteIcon/>  
                                                </IconButton>                            

                                            </Stack>
                                        </TableCell>                                              
                                                
                                    </TableRow>
                                        
                                    
                                )
                                }
                            </React.Fragment>
                        </React.Fragment>
                    )}



                    {/* {updatedForecast && updatedForecast.map(fcast=>
                        <TableRow key={fcast._id}>
                            <TableCell> {fcast.teamMember.name} </TableCell>
                            <TableCell >{fcast.projectName}</TableCell>
                            <TableCell >{fcast.weekStartDate}</TableCell>
                            <TableCell >
                                {
                                    fcast.forecastData.map(item => 
                                        <Stack key={item._id} direction='row' spacing={1}>
                                            <Box>{item.domain}:</Box> 
                                            <Box>{item.forecastHour}</Box> 
                                        </Stack>
                                    )
                                }
                            </TableCell>

                            <TableCell> 
                                { fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) } 
                            </TableCell>
                            
                            <TableCell >
                                {
                                    fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 40 ? <Chip size="small" label="Unavailable" color="error" variant="outlined" /> : 
                                    fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 30 ? <Chip size="small" label="Low" color="warning" variant="outlined" /> :
                                    fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 20 ? <Chip size="small" label="Half" color="primary" variant="outlined" /> :
                                    fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 10 ? <Chip size="small" label="High" color="success" variant="outlined" />: <Chip label="Full" color="success" variant="outlined" />                                
                                } 
                            </TableCell>
                            
                            <TableCell>
                                <Stack direction="row">                                
                                    <IconButton  aria-label="edit" onClick={handleOpenEditModal}> <EditIcon /> </IconButton>
                                    
                                    <Modal open={openEditModal} onClose={handleCloseEditModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2"> Edit Forecast </Typography>
                                            <CreateForecastForm/>
                                        </Box>
                                    </Modal>
                                                                                
                                    <IconButton aria-label="delete">  
                                        <DeleteIcon/>  
                                    </IconButton>                            

                                </Stack>
                            </TableCell>                
                        </TableRow>   
                    )} */}

                </TableBody>
            </Table>
        </TableContainer>

        :

          // Empty UI Panel
          <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f5f9ff', }} >         
            <Box component="img"  src={EmptyDataImage}  sx={{width: '20%', height: '20%'}} alt="Example" /> 
              <Typography variant="h6" component="p" sx={{ color: '#666', fontWeight: 500, textAlign: 'center', }} >
                No, Forecast is available. Create now.
            </Typography>
          </Box>         
        

        }

        


        {/* <TableBody>
            {updatedForecast && updatedForecast.map(fcast=>

            <TableRow key={fcast._id}>
                <TableCell> {fcast.teamMember.name} </TableCell>
                <TableCell >{fcast.projectName}</TableCell>
                <TableCell >{fcast.weekStartDate}</TableCell>
                <TableCell >
                    {
                        fcast.forecastData.map(item => 
                            <Stack key={item._id} direction='row' spacing={1}>
                                <Box>{item.domain}:</Box> 
                                <Box>{item.forecastHour}</Box> 
                            </Stack>
                        )
                    }
                </TableCell>

                <TableCell> 
                    { fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) } 
                </TableCell>
                
                <TableCell >
                    {
                        fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 40 ? <Chip size="small" label="Unavailable" color="error" variant="outlined" /> : 
                        fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 30 ? <Chip size="small" label="Low" color="warning" variant="outlined" /> :
                        fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 20 ? <Chip size="small" label="Half" color="primary" variant="outlined" /> :
                        fcast.forecastData.reduce((accumulator, current) => { return accumulator + Number(current.forecastHour);} , 0) >= 10 ? <Chip size="small" label="High" color="success" variant="outlined" />: <Chip label="Full" color="success" variant="outlined" />                                
                    } 
                </TableCell>
                
                <TableCell>
                    <Stack direction="row">                                
                        <IconButton  aria-label="edit" onClick={handleOpenEditModal}> <EditIcon /> </IconButton>
                        
                        <Modal open={openEditModal} onClose={handleCloseEditModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2"> Edit Forecast </Typography>
                                <CreateForecastForm/>
                            </Box>
                        </Modal>
                                                                    
                        <IconButton aria-label="delete">  
                            <DeleteIcon/>  
                        </IconButton>                            

                    </Stack>
                </TableCell>                
            </TableRow>   
            )}
        </TableBody> */}

    </Box>

  )
}
