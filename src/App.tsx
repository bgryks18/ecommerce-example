import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Logout from './pages/Logout'
import Login from './pages/Login'
import { PATH } from './types/paths'

function App() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />}></Route>
      <Route path={PATH.LOGIN} element={<Login />}></Route>
      <Route path={PATH.LOGOUT} element={<Logout />}></Route>
    </Routes>
  )
}

export default App
