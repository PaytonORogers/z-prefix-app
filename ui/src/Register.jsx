import './Register.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from './App.jsx'
import bcrypt from "bcryptjs";
import { useNavigate } from 'react-router-dom';

function Register() {
  const { userid, setUserid, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate();

  function handleSignUp() {
    if (!username || !password || !firstname || !lastname) {
      alert("Please fill out all fields!");
    }
    bcrypt.hash(password, 12, function (err, hash) {
      if (err) {
        console.log(err)
      } else {
        console.log(hash)
        const userToAdd = { 'first_name': firstname, 'last_name': lastname, 'username': username, 'hashed_password': hash };
        console.log(JSON.stringify(userToAdd))
        fetch("http://localhost:8080/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userToAdd)
        })
          .then(res => {
            if (!res.ok) {
              console.log(res)
              alert("Username is taken!")
            } else {
              console.log(res)
              return res.json();
            }
          })
          .then(data => {
            if (data) {
              console.log("User Added", data);
              alert("User Added, now log in!")
              navigate("/")
            }
          })
      }
    })
    return
  }
  function handleReturn() {
    navigate("/")
    return
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center">
        <h1 className="text-white mt-25 mb-50 text-base font-medium tracking-tight text-center w-1/3" >Register</h1>
        <div className="flex flex-col rounded-lg px-6 py-8 ring ring-gray-900/5 items-center justify-center bg-indigo-500 p-2 shadow-lg w-1/3 mt-200px">
          <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="first" placeholder=" Enter First Name " onChange={e => setFirstname(e.target.value)}></input>
          <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="last" placeholder=" Enter Last Name " onChange={e => setLastname(e.target.value)}></input>
          <input className="text-white rounded-sm border-2 border-white mb-2" type="email" name="email" placeholder=" Enter Username " onChange={e => setUsername(e.target.value)}></input>
          <input className="text-white rounded-sm border-2 border-white" type="password" name="password" placeholder=" Enter Password " onChange={e => setPassword(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}></input>
          <div className="flex justify-center gap-6 mt-4 text-white">
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
              onClick={() => handleReturn()}>Return to Sign in</button>
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
              onClick={() => handleSignUp()}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register