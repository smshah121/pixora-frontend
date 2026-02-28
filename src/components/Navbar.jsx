import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='sticky top-0 z-50 bg-white  border-b border-gray-100 shadow-sm'>
      <div className='max-w-7xl mx-auto px-6 md:px-16 py-4'>
        <div className='flex items-center justify-between'>
          
          {/* Left - Logo & Navigation */}
          <div className='flex items-center gap-8'>
            {/* Logo */}
            <Link 
              to="/" 
              className='flex items-center gap-2 group'
            >
              <div className='w-10 h-10 bg-gradient-to-br from-[#e60023] to-[#ff4458] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all'>
                <span className='text-white font-bold text-xl'>P</span>
              </div>
              <h1 className='text-[#e60023] font-bold text-2xl group-hover:scale-105 transition-transform'>
                Pixora
              </h1>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className='hidden md:flex items-center gap-2'>
              <Link 
                to="/"
                className='px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full font-medium transition-colors'
              >
                Home
              </Link>
              <button 
                onClick={() => navigate("/explore")}
                className='px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full font-medium transition-colors'
              >
                Explore
              </button>
              <Link 
                to="/about"
                className='px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full font-medium transition-colors'
              >
                About
              </Link>
            </div>
          </div>

          {/* Right - Auth Buttons */}
          <div className='flex items-center gap-3'>
            
            {/* Desktop Buttons */}
            <div className='hidden md:flex items-center gap-3'>
              <Link 
                to="/login"
                className='px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-full font-semibold transition-colors'
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className='px-6 py-2.5 bg-[#e60023] text-white rounded-full font-semibold hover:bg-[#d01f1f] transition-colors shadow-md hover:shadow-lg'
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors'
            >
              <span className='text-2xl'>{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown'>
          <div className='px-6 py-4 space-y-2'>
            <Link 
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className='block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors'
            >
              🏠 Home
            </Link>
            <button 
              onClick={() => { navigate('/explore'); setIsMenuOpen(false); }}
              className='w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors'
            >
              🔍 Explore
            </button>
            <Link 
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className='block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors'
            >
              ℹ️ About
            </Link>
            
            <div className='border-t border-gray-200 my-2 pt-2'>
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className='block px-4 py-3 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors'
              >
                Login
              </Link>
              <Link 
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className='block px-4 py-3 text-center bg-[#e60023] text-white rounded-lg font-semibold hover:bg-[#d01f1f] transition-colors mt-2'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar