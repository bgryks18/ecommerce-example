import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Theme from './components/Layout/Theme.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme>
    <App />
  </Theme>
)
