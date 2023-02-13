import React, { useState } from 'react'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
 return <Routes>
  <Route exact path='/' element={<Login/>}/>
  <Route exact path='/signup' element={<SignUp/>}/>
  <Route exact path='/home' element={<Home/>}/>
 </Routes>
}

export default App;
