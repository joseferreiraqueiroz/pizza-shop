import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './index.css'
import { RouterApp } from './routerApp'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors/>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="pizza-shop">
        <RouterApp />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
