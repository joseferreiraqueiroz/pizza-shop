import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './index.css'
import { RouterApp } from './routerApp'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors/>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="pizza-shop">
      <QueryClientProvider client={queryClient}>
        <RouterApp />
      </QueryClientProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
