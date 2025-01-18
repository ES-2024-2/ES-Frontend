import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './styles/GlobalStyle.jsx'
import ResetStyle from './styles/ResetStyle.jsx'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResetStyle/>
    <GlobalStyle/>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
