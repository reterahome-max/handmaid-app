import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { SettingsProvider } from './context/SettingsContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { WorkNotesProvider } from './context/WorkNotesContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <FavoritesProvider>
        <WorkNotesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WorkNotesProvider>
      </FavoritesProvider>
    </SettingsProvider>
  </StrictMode>,
)
