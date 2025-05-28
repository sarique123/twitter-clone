import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Authentication from './components/Authentication/Authentication'
import HomePage from './components/Home/HomePage'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <div className=''>
        <Routes>
          <Route path = '/' element = {true ? <HomePage/> : <Authentication/>}>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
