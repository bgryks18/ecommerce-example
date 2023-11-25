import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Theme from './components/Layout/Theme.tsx'
import './index.css'
import { StyledEngineProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'jotai'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

const router = createBrowserRouter([{ path: '*', Component: App }])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <StyledEngineProvider injectFirst>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </StyledEngineProvider>
    </Provider>
  </QueryClientProvider>
)
