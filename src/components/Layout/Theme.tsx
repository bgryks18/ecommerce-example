import { Container, Grid, createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Theme as ThemeType } from '@mui/material/styles'
import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

let theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
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
            padding: '4px 12px',
          },
          '@media screen and (max-width:768px)': {
            minHeight: '32px',
            padding: '3px 9px',
          },
        },
      },
    },
  },
})

const Theme = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Theme

declare module '@mui/styles' {
  interface DefaultTheme extends ThemeType {}
}
