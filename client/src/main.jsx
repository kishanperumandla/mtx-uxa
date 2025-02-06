import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
// #007ADE

const theme = createTheme({
  components:{
    MuiButton:{
      styleOverrides:{
        root:{          
          boxShadow:'none',
          textTransform: 'unset',
        },

        sizeSmall: {
          paddingInline: 12 ,
          borderRadius:  16,
        },
        sizeMedium: {
          paddingInline: 16,
          borderRadius: 20,
        },
        sizeLarge: {
          paddingInline: 16,
          borderRadius: 28,
        },
      }
    },
  },

  palette:{
    primary:{
      main: '#007ADE'
    },
    secondary:{
      main: '#009c8a'
    }
  },

  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 },  // 36px
    h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.3 }, // 30px
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },   // 24px
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },  // 20px
    h5: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.4 }, // 18px
    h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.5 },     // 16px
    
    subtitle1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },   // 16px
    subtitle2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 }, // 14px
  
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },  // 16px
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 }, // 14px
  
    caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.4 }, // 12px
    overline: { fontSize: '0.625rem', fontWeight: 400, textTransform: 'uppercase' }, // 10px
  },

})



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* <CssBaseline />
      <style>
        {`:root {
            --mui-primary-main: ${theme.palette.primary.main};
            --mui-primary-light: ${theme.palette.primary.light};
            --mui-primary-dark: ${theme.palette.primary.dark};
            --mui-secondary-main: ${theme.palette.secondary.main};
            --mui-secondary-light: ${theme.palette.secondary.light};
            --mui-secondary-dark: ${theme.palette.secondary.dark};
            --mui-background: ${theme.palette.background.default};
            --mui-background-paper: ${theme.palette.background.paper};
            --mui-success-main: ${theme.palette.success.main};
            --mui-success-light: ${theme.palette.success.light};
            --mui-success-dark: ${theme.palette.success.dark};
            --mui-error-main: ${theme.palette.error.main};
            --mui-error-light: ${theme.palette.error.light};
            --mui-error-dark: ${theme.palette.error.dark};
            --mui-warning-main: ${theme.palette.warning.main};
            --mui-warning-light: ${theme.palette.warning.light};
            --mui-warning-dark: ${theme.palette.warning.dark};
            --mui-info-main: ${theme.palette.info.main};
            --mui-info-light: ${theme.palette.info.light};
            --mui-info-dark: ${theme.palette.info.dark};
            --mui-text-primary: ${theme.palette.text.primary};
            --mui-text-secondary: ${theme.palette.text.secondary};
            --mui-text-disabled: ${theme.palette.text.disabled};
            --mui-text-hint: ${theme.palette.text.hint};
            --mui-common-white: ${theme.palette.common.white};
            --mui-common-black: ${theme.palette.common.black};
            --mui-common-transparent: ${theme.palette.common.transparent};
            --mui-divider: ${theme.palette.divider};
            --mui-action-active: ${theme.palette.action.active};
            --mui-action-hover: ${theme.palette.action.hover};
            --mui-action-selected: ${theme.palette.action.selected};
            --mui-action-disabled: ${theme.palette.action.disabled};
            --mui-grey-50: ${theme.palette.grey[50]};
            --mui-grey-100: ${theme.palette.grey[100]};
            --mui-grey-200: ${theme.palette.grey[200]};
            --mui-grey-300: ${theme.palette.grey[300]};
            --mui-grey-400: ${theme.palette.grey[400]};
            --mui-grey-500: ${theme.palette.grey[500]};
            --mui-grey-600: ${theme.palette.grey[600]};
            --mui-grey-700: ${theme.palette.grey[700]};
            --mui-grey-800: ${theme.palette.grey[800]};
            --mui-grey-900: ${theme.palette.grey[900]};
            // Add any other palette color variables here
          }
        `}
      </style> */}
      <App/>
    </ThemeProvider>
  </StrictMode>,
)
