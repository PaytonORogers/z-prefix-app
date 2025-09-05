import './Login.css'
import { useContext, useEffect, useState } from 'react'
import bcrypt from "bcryptjs";
import { AppContext } from './App.jsx'
import { useNavigate } from 'react-router-dom';

function Login() {
  const { userid, setUserid, isLoggedIn, setIsLoggedIn, firstname, setFirstname } = useContext(AppContext)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [newUser, setNewUser] = useState(false)
  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/register")
    return
  }

  function handleSignIn() {
    if (!username || !password) {
      alert("Please enter username and password");
    }
    fetch(`http://localhost:8080/users`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Database Offline!");
        } else {
          return res.json();
        }
      })
      .then(users => {
        for (let user of users) {
          if (user.username == username) {
            return user
          }
        }
        alert("That is not a valid username! Please make an account first.")
        return users
      })
      .then(user => {
        setFirstname(user.first_name)
        bcrypt.compare(password, user.hashed_password, function (err, result) {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else {
            console.log("Password match:", result);
            if (!result) {
              alert("Incorrect Password!")
            } else {
              setIsLoggedIn(true)
              setUserid(user.uid)
              console.log(userid)
              navigate("/inventory")
            }
          }
        });
      });
    return
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center">
        <h1 className="text-white mt-25 mb-50 text-base font-medium tracking-tight text-center w-1/3" >Login</h1>
        <div className="flex flex-col rounded-lg px-6 py-8 ring ring-gray-900/5 items-center justify-center bg-indigo-500 p-2 shadow-lg w-1/3 mt-200px">
          <input className="text-white rounded-sm border-2 border-white mb-2" type="email" name="email" placeholder=" Enter Username " onChange={e => setUsername(e.target.value)}></input>
          <input className="text-white rounded-sm border-2 border-white" type="password" name="password" placeholder=" Enter Password " onChange={e => setPassword(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}></input>
          <div className="flex justify-center gap-6 mt-4 text-white">
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
              onClick={() => handleSignUp()}>Register as new user</button>
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
              onClick={() => handleSignIn()}>Submit</button>
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
              onClick={() => navigate("/inventory")}>Login as guest</button>
          </div>
        </div>
      </div>
    </>
  )

}
export default Login