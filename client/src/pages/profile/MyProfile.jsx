import React, { useState } from 'react'
import { useRegisterUser } from '../../hooks/useAuth'
import { getAuthUserFromLocalStorage } from '../../utility/localStorage'
import { Alert, Box, Button, Grid2, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useGetUser, useUpdateUser } from '../../hooks/user/useUser';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BASE_ORIGIN } from '../../config/config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const projectThumbStyle= {
    width: 140,
    height: 140,
    borderRadius: '8px', 
    objectFit: 'cover',
  }


  const uploadFileStyle ={
    
  }



export default function MyProfile() {

    const authUser = getAuthUserFromLocalStorage();
    const {registerUserMutation, isuserRegistering, registerUserError } = useRegisterUser()

    const[showUserForm, setShowUserForm] = useState(false);
    const[showPasswordForm, setShowPasswordForm] = useState(false);

    
      
    // For User Info Form
    //*** We cannot use the same useform Controls for two differnet forms ***/
    const {handleSubmit, register, formState:{errors}} = useForm();
    

    // * For Password Info
    const {handleSubmit: handleSubmitPswd, register:registerPswd, formState:{errors:errorsPswd}} = useForm();
    const navigate = useNavigate()
    
    
    const userQueryObj = { id: authUser.id }

    const {users,isGettingUsers, getUserError} = useGetUser(userQueryObj);
    const currentUser = users?.[0];
    const{updateUserMutateFn,isUserUpdating, isUpdateUserError} = useUpdateUser();
    



    
    // UPDATE User Avatar
    function handleUpdateAvatar(e){        
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        formData.append('userId', authUser.id);
        
        updateUserMutateFn(formData);                        
    }



    // UPDATE User Info
    function handleUpdateUserInfo(data){
        // console.log(data);  
        data = { ...data, updateUserInfo: true, userId:authUser.id } ;            
        updateUserMutateFn(data);

        setShowUserForm(false)
    }
        

    // UPDATE User Password
    function handleUpdatePassword(data){
        console.log(data);                
        // updateUserMutateFn();

        setShowPasswordForm(false)
    }




  return (
    <Box className='full-width-page-content-container' sx={{width:'75%', margin:'auto'}} bgcolor={'white'} p={4}>
        
        {/* Title */}
        <Stack direction='row'  justifyContent='space-between'  alignItems='center'>
            <Typography variant='h1' mb={4}> MyProfile  </Typography>
            <IconButton onClick={()=>navigate(-1) }> <HomeIcon color={'primary'}/> </IconButton>
        </Stack>
        

        {/* AVATAR */}                
        <Stack mb={5} direction='row' spacing={2} alignItems='center'>                        
            {currentUser?.avatar ?
                <Box component="img" src={`${BASE_ORIGIN}/uploads/${currentUser?.avatar}`}  sx={projectThumbStyle} alt="Example" /> :
                <AccountCircleIcon/> 
            }
            
            {/* FORM */}
            <Grid2 container spacing={2}>
                {/* Photo */}
                <Grid2 size={12}>
                    <TextField type='file'  sx={{...uploadFileStyle}}  id="avatar" name="avatar" variant="outlined"  onChange={handleUpdateAvatar} />                   
                </Grid2>             
            </Grid2>

        </Stack>
         


        {/* USER INFO */}
        <Stack direction="row" justifyContent='space-between' alignItems='start' mb={1}>
            <Typography mb={1} variant='h3'> User Information  </Typography>
            {!showUserForm && <Button variant='outlined' size='small' onClick={()=>setShowUserForm(true)} >update</Button> }            
        </Stack>
        
        <Box sx={{bgcolor:'#e9f6ff'}} p={2} borderRadius={2} mb={5}>
            {currentUser && !showUserForm &&                
                <Box>
                    <Stack direction='row' spacing={1}>
                        <PersonOutlineOutlinedIcon/>                        
                        <Typography> {currentUser.firstName + " " + currentUser.lastName} </Typography>
                    </Stack>

                    <Stack direction='row' spacing={1}>                       
                        <EmailOutlinedIcon/>
                        <Typography> {currentUser.email}  </Typography>
                    </Stack>                    
                </Box>                                    
            }

            {/* USER FORM */}
            {showUserForm && 
                <Box component='form'  onSubmit={handleSubmit(handleUpdateUserInfo)} bgcolor={'#'} >                                            
                    <Grid2 container spacing={2}>
                        {/* First name */}
                        <Grid2 size={4}>
                            <TextField  fullWidth id="firstName" {...register("firstName")} label="First Name" variant="outlined" />
                            {/* <TextField fullWidth label="fullWidth" id="fullWidth" /> */}
                            {errors.firstName && <Alert  message={errors.firstName.message}/>}
                        </Grid2>    

                        {/* LastName */}
                        <Grid2 size={4}>
                            <TextField fullWidth  id="lastName" {...register("lastName")} label="Last Name" variant="outlined" />
                            {errors.lastName &&  <Alert  message={errors.lastName.message}/>}
                        </Grid2> 

                        {/* Email */}
                        <Grid2 size={4}>
                            <TextField fullWidth  id="email" {...register("email")} label="Email" variant="outlined" />
                            {errors.email &&  <Alert  message={errors.email.message}/>}
                        </Grid2> 

                        <Grid2 size={12}>
                            <Stack direction='row'  spacing={1} justifyContent='end' >              
                                <Button  variant="outlined" type="button" size='small' onClick={()=>setShowUserForm(false)} >Cancel </Button>
                                <Button  variant="contained" type="submit" size='small'>Save </Button>
                            </Stack>                    
                        </Grid2>
                        
                    </Grid2>

                </Box>
            } 
        </Box>

        
        

        {/* USER PASSWORD */}
        <Stack direction="row" justifyContent='space-between' alignItems='start' mb={1}>
            <Typography mb={1} variant='h3'> Password  </Typography> 
            {!showPasswordForm && <Button variant='outlined' size='small' onClick={()=>setShowPasswordForm(true)}>Updated Password</Button>}
        </Stack>
        
        {/* PASSWORD Form */}
        {showPasswordForm &&
            <Box sx={{bgcolor:'#e9f6ff'}} p={2} borderRadius={2} mb={5}>                
                <Box component='form'  onSubmit={handleSubmitPswd(handleUpdatePassword)}>                                                                          
                    <Grid2 container spacing={2}>
                        {/* Password */}
                        <Grid2 size={6}>
                            <TextField fullWidth  type="password" id="password" {...registerPswd("password")} label="Password" variant="outlined" />
                            {errors.password &&  <Alert  message={errors.password.message}/>}
                        </Grid2> 


                        {/* Confirm Password */}
                        <Grid2 size={6}>
                            <TextField fullWidth  type="password" id="confirmPassword" {...registerPswd("confirmPassword")} label="Confirm Password" variant="outlined" />
                            {errors.password &&  <Alert  message={errors.password.message}/>}
                        </Grid2> 


                        <Grid2 size={12}>
                            <Stack direction='row'  spacing={1} justifyContent='end' >              
                                <Button  variant="outlined" size='small' type="button" onClick={()=>setShowPasswordForm(false)} >Cancel</Button>
                                <Button  variant="contained" size='small' type="submit" >Save </Button>
                            </Stack>                    
                        </Grid2>
                        
                    </Grid2>                    
                </Box>               
            </Box>
        }

        
    </Box>
  )
}
