import './NewItem.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from './App.jsx'
import { useNavigate } from 'react-router-dom';

function NewItem() {
  const { userid, setUserid, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/")
    }
  }, [])

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center">
        <h1 className="text-white mt-25 mb-50 text-base font-medium tracking-tight text-center w-1/3" >New Item</h1>
        <div className="flex flex-col rounded-lg px-6 py-8 ring ring-gray-900/5 items-center justify-center bg-indigo-500 p-2 shadow-lg w-1/3 mt-200px">
          <input className="text-white rounded-sm border-2 border-white mb-2" type="email" name="email" placeholder=" Enter Username " onChange={e => setUsername(e.target.value)}></input>
          <input className="text-white rounded-sm border-2 border-white" type="password" name="password" placeholder=" Enter Password " onChange={e => setPassword(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}></input>
          <div className="flex justify-center gap-6 mt-4 text-white">
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
              onClick={() => handleSignUp()}>Sign Up</button>
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
              onClick={() => handleSignIn()}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewItem