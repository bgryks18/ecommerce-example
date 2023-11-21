import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Theme as ThemeType } from '@mui/material/styles'
import { ReactNode } from 'react'
import Header from './Header'

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
  },
  palette: {
    common: {
      black: '#333',
    },
    primary: {
      main: '#c24b5a',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'white',
        },
      },
    },
  },
})

const Theme = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
    </ThemeProvider>
  )
}

export default Theme

declare module '@mui/styles' {
  interface DefaultTheme extends ThemeType {}
}
