import Page from '@/components/Layout/Page'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { PATH } from '@/types/paths'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const { setCurrentUser, setCart } = useCurrentUser()

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      localStorage.removeItem('authorization')
      setCurrentUser(null)
      setCart(null)
      navigate(PATH.HOME)
    })
  }, [])
  return (
    <Page showSidebar={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          padding: 3,
        }}
      >
        <CircularProgress />
        <Typography variant="body1" fontWeight="medium">
          Logging out...
        </Typography>
      </Box>
    </Page>
  )
}

export default Logout
