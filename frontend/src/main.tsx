import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
