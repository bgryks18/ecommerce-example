import Page from '@/components/Layout/Page'
import { Box, Typography } from '@mui/material'

const Notfound = () => {
  return (
    <Page showSidebar={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{
            fontWeight: '700',
            paddingInline: '20px',
            paddingBottom: '4px',
          }}
        >
          Page not found
        </Typography>
      </Box>
    </Page>
  )
}

export default Notfound
