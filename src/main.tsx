import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Theme from './components/Layout/Theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme>
    <App />
  </Theme>
)
