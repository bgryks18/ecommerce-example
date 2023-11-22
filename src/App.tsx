import { Box, Button } from '@mui/material'
import List from './components/Layout/List'

function App() {
  return (
    <Box sx={{ padding: '20px', minHeight: '100dvh' }}>
      <List>
        <Button variant="contained">Click</Button>
      </List>
    </Box>
  )
}

export default App
