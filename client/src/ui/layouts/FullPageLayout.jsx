import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

export default function FullPageLayout() {
  return (
    <div className='main-container'>
        <Header/>                                    
        <Outlet/>            
    </div>
  )
}
