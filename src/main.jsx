import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import Routes from './Routes/Routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes/>
  </StrictMode>,
)
