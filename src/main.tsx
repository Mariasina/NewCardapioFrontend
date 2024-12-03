import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import routes from './routes'

import './index.css'
import { LanguageProvider } from './languageContext/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LanguageProvider>
        <RouterProvider router={routes}/>
      </LanguageProvider>
    </LocalizationProvider>
  </StrictMode>,
)
