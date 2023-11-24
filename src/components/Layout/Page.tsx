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
      <Container maxWidth="xl" sx={{ marginBottom: 5 }}>
        <Grid container>
          {showSidebar && (
            <Grid item xs={12} md={4} lg={3} paddingTop="20px">
              <Sidebar />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={showSidebar ? 8 : 12}
            lg={showSidebar ? 9 : 12}
            paddingTop="20px"
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Page
