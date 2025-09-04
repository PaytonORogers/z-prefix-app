import { createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Login from './Login.jsx'
import Register from './Register.jsx'
import Inventory from './Inventory.jsx'
import NewItem from './NewItem.jsx'

export const AppContext = createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userid, setUserid] = useState(null)

  return (
      <AppContext value={{ userid, setUserid, isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/newitem" element={<NewItem />}/>
        </Routes>
      </AppContext>
  )
}

export default App
