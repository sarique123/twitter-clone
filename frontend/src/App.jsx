import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Authentication from './components/Authentication/Authentication'
import HomePage from './components/Home/HomePage'
import { Route,Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './store/auth/Action'

function App() {

  const jwtToken = localStorage.getItem("jwtToken")
  const {auth} = useSelector(store => store)
  const dispatch=useDispatch()
  const navigate = useNavigate()

  console.log("Redux Auth State →", auth); 

  useEffect(()=>{
    if(jwtToken){
      dispatch(getUserProfile(jwtToken))
      navigate("/")
    }
  },[auth.jwtToken])

  return (
    
    <>
      <div className=''>
        <Routes>
          <Route path = '/*' element = {auth.user ? <HomePage/> : <Authentication/>}>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
