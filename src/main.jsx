// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import TopicsProvider from './context/provider/topicsProvider.jsx'
import SessionsProvider from './context/provider/sessionsProvider.jsx'
import AuthProvider from './context/provider/authProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TopicsProvider>
      <SessionsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SessionsProvider>
    </TopicsProvider>
  </BrowserRouter>,
)
