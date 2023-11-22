import { getProducts } from '@/api/product'
import List from '@/components/Layout/List'
import { Box } from '@mui/material'

const Home = () => {
  const { data } = getProducts()

  return (
    <Box sx={{ minHeight: '100dvh' }}>
      <List />
    </Box>
  )
}

export default Home
