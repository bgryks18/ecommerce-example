import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Logout from './pages/Logout'
import Login from './pages/Login'
import Search from './pages/Search'
import Notfound from './pages/Notfound'
import { PATH } from './types/paths'
import { getCart } from './api/card'

function App() {
  getCart()

  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />}></Route>
      <Route path={PATH.LOGIN} element={<Login />}></Route>
      <Route path={PATH.LOGOUT} element={<Logout />}></Route>
      <Route path={PATH.SEARCH} element={<Search />}></Route>
      <Route path={'*'} element={<Notfound />}></Route>
    </Routes>
  )
}

export default App
