import { useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../hooks/useAuth";
import Alert from "../../ui/alerts/Alert";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";

import TextField from '@mui/material/TextField';


export default function LoginPage() {  
  const {handleSubmit, register} = useForm();
  const navigate = useNavigate()
  const {loginUserMutation, isUserLogging, loginUserError} = useLoginUser();


  function handleLoginSubmit(data){
    // console.log(data);
    loginUserMutation(data);
    
  }
  

  function handleRegisterLink(e){
    // e.preventDefault();
    navigate("/register")
  }

  // console.log(loginUserError);
  
  

  return (
    <Box sx={{maxWidth:"30%", margin:'auto', p:4}} bgcolor={'white'} >

      <Stack direction='column' alignItems='center'>                
        <Typography variant="h4" color='primary' gutterBottom> MTX / Team UXA  </Typography>                
        <h1 style={{marginBottom:'1rem'}}>Login</h1>
      </Stack>
      


      {loginUserError && <Alert message={loginUserError.response.data.message}/>}

      <Box component='form'  onSubmit={handleSubmit(handleLoginSubmit)} >
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField fullWidth id="emailc" {...register("email")} label="Email" variant="outlined" />
            </Grid2>

            <Grid2 size={12}>
              {/* <label htmlFor="password">Password</label>
              <input type="password"  id="password" name="password" {...register("password")}/> */}
              <TextField fullWidth type="password" id="password" {...register("password")} label="password" variant="outlined" />
            </Grid2>


            <Grid2 size={12}>
              <Stack direction='row' spacing={2} justifyContent='space-between' >              
                <Button  type="button" onClick={handleRegisterLink}>Register </Button>
                <Button variant="contained" type="submit">Login </Button>
              </Stack>              
            </Grid2>

          </Grid2>          
      </Box>


      {/* <h1>Login</h1>

        <form action="" onSubmit={handleSubmit(handleLoginSubmit)}>
          
          <label htmlFor="email">Email</label>
          <input type="email"  id="email" name="email" {...register("email")} />
          <br/>

          <label htmlFor="password">Password</label>
          <input type="password"  id="password" name="password" {...register("password")}/>
          <br/>

          <a href="#"  onClick={handleRegisterLink}>Register</a>
          <button>login</button>
        </form> */}

    </Box>
  )

}
