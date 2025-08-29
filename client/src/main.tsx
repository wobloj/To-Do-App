import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Creator } from './pages/Creator.tsx'
import { Todo } from './pages/Todo.tsx'
import { TodoCreatePage } from './pages/TodoCreatePage.tsx'
import { Shopping } from './pages/Shopping.tsx'
import { Login } from './pages/Login.tsx'

import { AuthProvider } from "./context/AuthProvider";
import { Register } from './pages/Register.tsx'
import { ShoppingCreatePage } from './pages/ShoppingCreatePage.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='creator' element={<Creator/>}/>
          <Route path='todo' element={<Todo/>}/>
          <Route path='todo/create' element={<TodoCreatePage/>}/>
          <Route path='shopping' element={<Shopping/>}/>
          <Route path='shopping/create' element={<ShoppingCreatePage/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
