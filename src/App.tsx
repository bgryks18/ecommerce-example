import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Logout from './pages/Logout'
import Login from './pages/Login'
import Search from './pages/Search'
import Notfound from './pages/Notfound'
import { PATH } from './types/paths'
import { useGetCart } from './api/cart'
import { Snackbar } from '@mui/material'
import { useTheme } from '@mui/styles'
import { useAtom } from 'jotai'
import { errorState } from './store/ui'

function App() {
  const theme = useTheme()
  const [error, setError] = useAtom(errorState)
  useGetCart()

  return (
    <>
      <Routes>
        <Route path={PATH.HOME} element={<Home />}></Route>
        <Route path={PATH.LOGIN} element={<Login />}></Route>
        <Route path={PATH.LOGOUT} element={<Logout />}></Route>
        <Route path={PATH.SEARCH} element={<Search />}></Route>
        <Route path={'*'} element={<Notfound />}></Route>
      </Routes>

      <Snackbar
        open={Boolean(error)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        autoHideDuration={5000}
        ContentProps={{ style: { background: theme.palette.error.main } }}
        onClose={() => {
          setError('')
        }}
        message={typeof error === 'string' ? error : 'An error occured'}
      />
    </>
  )
}

export default App
