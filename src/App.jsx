import { useState } from 'react'
import SideBar from './component/SideBar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div
      className="flex box-border min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #e6f4ea 0%, #fce7f3 50%, #e6f4ea 100%)',
      }}
    >
      <SideBar />
      <div className="w-full mx-20 my-4">
        <Outlet />
      </div>
    </div>
  )
}

export default App
