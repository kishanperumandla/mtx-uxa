import React from 'react'

import { Button, Rating, styled } from '@mui/material'

const CustomeSecondaryButton = styled(Button)( ({theme, ...ownerstate}) => theme.unstable_sx({
    bgcolor: 'secondary.main',
    p: ownerstate.size === "medium" ? '1rem' : '4px'
}))




// MUI TEST 
export default function MuiTest() {


  return (
    <div>
        {/* <Button> Click Me </Button> */}
        <CustomeSecondaryButton  variant='contained' size="small"  > Go now </CustomeSecondaryButton>

        <Rating name="simple-controlled" value={2} sx={{
            '&.MuiRating-root':{                
                color: 'red'
            },

            '& .MuiRating-icon':{
                color: 'red'
            }
        }}/>


    </div>
  )
}
