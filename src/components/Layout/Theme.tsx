import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Theme as ThemeType } from '@mui/material/styles'
import { ReactNode } from 'react'

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
    fontWeightBold: 600,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
  },
  palette: {
    background: {
      default: '#f7f9fc',
    },
    common: {
      black: '#333',
    },
    primary: {
      main: '#c24b5a',
    },
    secondary: {
      main: '#69707e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          background: 'white',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '@media screen and (max-width:991px)': {
            fontSize: '0.9rem',
          },
          '@media screen and (max-width:768px)': {
            fontSize: '0.8rem',
          },
          '@media screen and (max-width:525px)': {
            fontSize: '0.7rem',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '@media screen and (max-width:991px)': {
            fontSize: '0.9rem',
          },
          '@media screen and (max-width:768px)': {
            fontSize: '0.8rem',
          },
          '@media screen and (max-width:525px)': {
            fontSize: '0.7rem',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '@media screen and (max-width:991px)': {
            minHeight: '36px',
          },
          '@media screen and (max-width:768px)': {
            minHeight: '32px',
          },
        },
      },
    },
  },
})

const Theme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme

declare module '@mui/styles' {
  interface DefaultTheme extends ThemeType {}
}
