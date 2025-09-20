import './Topbar.css'
import React, { useState, useEffect } from 'react'

import { Menu } from 'lucide-react'
import { Bell } from 'lucide-react'
import { Settings } from 'lucide-react'
import { Moon } from 'lucide-react'
import { User } from 'lucide-react'
import { Search } from 'lucide-react'
import { SlidersHorizontal } from 'lucide-react';

import { useLocation } from 'react-router-dom'



const Topbar = () => {
  const [displayedPathname, setDisplayePathname] = useState('')

  const location = useLocation()

  useEffect(() => {
    const pathName = `${location.pathname.slice(1, 2).toUpperCase()}${location.pathname.slice(2)}`
    setDisplayePathname(pathName)
  }, [location.pathname])

  return (
    <div className='relative top-0 w-full rounded-tl-2xl rounded-tr-2xl h-[8%] '>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex gap-10'>
          <Menu className='text-gray-400' />
          <div className='flex gap-2'>
            <span className='text-gray-300'>Home</span>
            {location.pathname !== '/home' && (
              <>
                <span className='text-gray-300'>/</span>
                <span className='text-gray-600'>{displayedPathname}</span>
              </>
            )}
          </div>
        </div>
        <div className='flex gap-3 items-center'>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-[1.2em]" />
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-10 rounded-2xl bg-gray-200 h-[2.2em] w-64 text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
            />
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Bell />
          <Settings />
          <Moon />
          <User className='rounded-full h-[2em] w-[2em] bg-[var(--light-purple)] text-white' />
        </div>
      </div>
    </div>
  )
}

export default Topbar
