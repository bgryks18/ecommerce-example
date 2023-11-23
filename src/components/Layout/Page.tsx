import { ReactNode } from 'react'
import { Container, Grid } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'

const Page = ({
  children,
  showSidebar = true,
  showHeader = true,
}: {
  children: ReactNode
  showSidebar?: boolean
  showHeader?: boolean
}) => {
  return (
    <>
      {showHeader && <Header />}
      <Container maxWidth="xl">
        <Grid container columnSpacing="20px">
          {showSidebar && (
            <Grid item xs={12} md={3} paddingBlock="20px">
              <Sidebar />
            </Grid>
          )}
          <Grid item xs={12} md={showSidebar ? 9 : 12} paddingBlock="20px">
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Page
