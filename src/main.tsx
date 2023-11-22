import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Theme from './components/Layout/Theme.tsx'
import './index.css'
import { StyledEngineProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <Theme>
          <App />
        </Theme>
      </StyledEngineProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
