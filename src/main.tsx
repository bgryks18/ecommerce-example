import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Theme from './components/Layout/Theme.tsx'
import './index.css'
import { StyledEngineProvider } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <Theme>
      <App />
    </Theme>
  </StyledEngineProvider>
)
