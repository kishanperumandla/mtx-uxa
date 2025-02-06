import { useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/useAuth";
import Alert from "../../ui/alerts/Alert";
import { Box, Button, Grid2, Stack, TextField, Typography } from "@mui/material";






export default function RegisterPage(){
  
  const {handleSubmit, register, formState:{errors}} = useForm();
  const navigate = useNavigate()
  console.log(errors);

  // Tocollectio All UseForm Error Messages at Once
  const errorMessages = Object.values(errors).map(item => item.message);




  const {registerUserMutation, isuserRegistering, registerUserError } = useRegisterUser()

  console.log(registerUserError?.response.data.message);
  // console.log(registerUserError.response.data.message);
  


  // Handle Submit Register
  function handleRegisterUserSubmit(data){
    const role = "Employee";
    data = {
      ...data,
      role
    }
    // console.log(data);    
    registerUserMutation(data);
    navigate("/login")
  }
  


  // Handle Navigate to Login
  function handleLoginNav(e){
    e.preventDefault();
    navigate("/login")
  }
  




  // If Loading Register
  if(isuserRegistering) return <h1>User is registering...</h1>



  return (
    <Box sx={{maxWidth:"30%", margin:'auto', p:4, bgcolor:'white'}}>

  
      <Stack direction='column' alignItems='center'>                
        <Typography variant="h4" color='primary' gutterBottom> MTX / Team UXA  </Typography>                
        <h1 style={{marginBottom:'1rem'}}>Register</h1>
      </Stack>


      {/* API Error Rendering */}
      {registerUserError && <Alert message={registerUserError.response.data.message}/>}


      <Box component='form'  onSubmit={handleSubmit(handleRegisterUserSubmit)}>

        <Grid2 container spacing={2}>

          {/* First name */}

          <Grid2 size={12}>
            <TextField fullWidth id="firstName" {...register("firstName")} label="First Name" variant="outlined" />
            {errors.firstName && <Alert  message={errors.firstName.message}/>}
          </Grid2>    


          {/* LastName */}
          <Grid2 size={12}>
            <TextField fullWidth id="lastName" {...register("lastName")} label="Last Name" variant="outlined" />
            {errors.lastName &&  <Alert  message={errors.lastName.message}/>}
          </Grid2> 


          {/* Email */}
          <Grid2 size={12}>
            <TextField fullWidth id="email" {...register("email")} label="Email" variant="outlined" />
            {errors.email &&  <Alert  message={errors.email.message}/>}
          </Grid2> 


          {/* Password */}
          <Grid2 size={12}>
            <TextField fullWidth type="password" id="password" {...register("password")} label="Password" variant="outlined" />
            {errors.password &&  <Alert  message={errors.password.message}/>}
          </Grid2> 


          {/* Confirm Password */}
          <Grid2 size={12}>
            <TextField fullWidth type="password" id="confirmPassword" {...register("confirmPassword")} label="Confirm Password" variant="outlined" />
            {errors.password &&  <Alert  message={errors.password.message}/>}
          </Grid2> 


          <Grid2 size={12}>
              <Stack direction='row'  spacing={2} justifyContent='space-between' >              
                <Button  type="button"  onClick={handleLoginNav}>Login </Button>
                <Button  variant="contained" type="submit">Register </Button>
              </Stack>
              
            </Grid2>
        </Grid2>

      </Box>

    </Box>
  )
}





