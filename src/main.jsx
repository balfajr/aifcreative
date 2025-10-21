import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import App from './App'
import Home from './pages/home'
import Team from './pages/team'
import Works from './pages/works'
import Contact from './pages/contact'

// Vercel: biarkan undefined (root)
// GitHub Pages: set BASENAME="/nama-repo"
const basename = process.env.BASENAME || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="works" element={<Works />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
