import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { ReactNode } from 'react'

const theme = createTheme({
  components: {},
})

const Theme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
