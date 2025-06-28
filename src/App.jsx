import { useState } from 'react'
import { Home } from './pages/Home'
import SideBar from './component/SideBar'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <div className='flex box-border bg-gray-800' >
      <SideBar />
      <div className='w-full mx-20 my-4'>
        {<Outlet />}
      </div>
    </div>
  )
}

export default App
