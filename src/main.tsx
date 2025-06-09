import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Creator } from './pages/Creator.tsx'
import { Todo } from './pages/Todo.tsx'
import { Shopping } from './pages/Shopping.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='creator' element={<Creator/>}/>
        <Route path='todo' element={<Todo/>}/>
        <Route path='shopping' element={<Shopping/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
