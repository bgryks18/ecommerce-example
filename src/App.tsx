import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Logout from './pages/Logout'
import Login from './pages/Login'
import Notfound from './pages/Notfound'
import { PATH } from './types/paths'
import { useGetCart } from './api/cart'
import { Snackbar } from '@mui/material'
import { useTheme } from '@mui/styles'
import { useAtom } from 'jotai'
import { errorState } from './store/ui'
import { useCurrentUser } from './hooks/useCurrentUser'
import Category from './pages/Category'

function App() {
  const theme = useTheme()
  const [error, setError] = useAtom(errorState)
  useGetCart()
  const { isLoggedIn } = useCurrentUser()

  return (
    <>
      <Routes>
        <Route path={PATH.HOME} element={<Home />}></Route>
        {!isLoggedIn && <Route path={PATH.LOGIN} element={<Login />}></Route>}
        {isLoggedIn && <Route path={PATH.LOGOUT} element={<Logout />}></Route>}
        <Route path={PATH.CATEGORY_DETAIL} element={<Category />}></Route>
        <Route path={'*'} element={<Notfound />}></Route>
      </Routes>

      <Snackbar
        open={Boolean(error)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        autoHideDuration={5000}
        ContentProps={{
          style: {
            background: theme.palette.error.main,
            justifyContent: 'center',
          },
        }}
        onClose={() => {
          setError('')
        }}
        message={typeof error === 'string' ? error : 'An error occured'}
      />
    </>
  )
}

export default App
