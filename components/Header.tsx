'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthProvider';
import { Button } from './ui/button';
import { User } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, loading, signOut } = useAuth();
  const isDark = theme === 'dark';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`border-b border-gray-800 relative top-0 w-full z-50 px-4 md:px-24 py-4 flex items-center justify-between backdrop-blur-md ${isDark ? 'bg-black' : 'bg-gray-50'}`}>

      <div className="flex-1 flex items-center">
        <Link href="/">
          <img src="/otrLogo.png" alt="OTR Logo" className="h-14 hover:scale-105 transition-transform" />
        </Link>
      </div>

      <nav className={`hidden md:flex gap-8 text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <Link 
          href="/" 
          className={`relative pb-1 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'} 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
            after:origin-left after:transition-transform after:duration-300 
            ${isDark ? 'after:bg-orange-500' : 'after:bg-[#48B4FF]'}
            ${pathname === '/' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
        >
          Home
        </Link>
        <Link 
          href="/team" 
          className={`relative pb-1 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'} 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
            after:origin-left after:transition-transform after:duration-300 
            ${isDark ? 'after:bg-orange-500' : 'after:bg-[#48B4FF]'}
            ${pathname === '/team' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
        >
          Team
        </Link>
        <Link 
          href="/our-car" 
          className={`relative pb-1 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'} 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
            after:origin-left after:transition-transform after:duration-300 
            ${isDark ? 'after:bg-orange-500' : 'after:bg-[#48B4FF]'}
            ${pathname === '/our-car' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
        >
          Our Car
        </Link>
        <Link 
          href="/join-us" 
          className={`relative pb-1 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'} 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
            after:origin-left after:transition-transform after:duration-300 
            ${isDark ? 'after:bg-orange-500' : 'after:bg-[#48B4FF]'}
            ${pathname === '/join-us' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
        >
          Join Us
        </Link>
        <Link 
          href="/sponsors" 
          className={`relative pb-1 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'} 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
            after:origin-left after:transition-transform after:duration-300 
            ${isDark ? 'after:bg-orange-500' : 'after:bg-[#48B4FF]'}
            ${pathname === '/sponsors' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
        >
          Sponsors
        </Link>
        <Link 
          href="/history" 
          className={`relative pb-1 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'} 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
            after:origin-left after:transition-transform after:duration-300 
            ${isDark ? 'after:bg-orange-500' : 'after:bg-[#48B4FF]'}
            ${pathname === '/history' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
        >
          History
        </Link>
      </nav>

      <div className="flex-1 hidden md:flex items-center justify-end gap-4 leading-none">
        {/* Theme Toggle Button - same size as other icons */}
        <button
          onClick={toggleTheme}
          className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 shrink-0 ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Social Icons */}
        <div className={`flex items-center gap-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>
          <a href="https://www.instagram.com/ontariotechracing/" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center w-6 h-6 shrink-0 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>
            <svg className="w-6 h-6 block" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/ontariotechracing/" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center w-6 h-6 shrink-0 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>
            <svg className="w-6 h-6 block" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="mailto:motorsports@ontariotechu.net" className={`flex items-center justify-center w-6 h-6 shrink-0 transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>
            <svg className="w-6 h-6 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Admin login / logout - small, far right */}
        {!loading && (
          <span className={`flex items-center pl-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {user ? (
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] truncate max-w-[80px]" title={user.email ?? ''}>
                  {user.email}
                </span>
                <Button variant="ghost" size="icon-sm" onClick={() => signOut()} className="h-6 w-6 min-w-0 p-0 text-[10px]" aria-label="Sign out">
                  Out
                </Button>
              </span>
            ) : (
              <Link
                href="/auth/login"
                className={`flex items-center justify-center w-6 h-6 shrink-0 rounded transition-colors cursor-pointer ${isDark ? 'text-gray-500 hover:text-[#E75E2B]' : 'text-gray-400 hover:text-[#48B4FF]'}`}
                aria-label="Admin login"
              >
                <User className="size-6 block" />
              </Link>
            )}
          </span>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        {/* Mobile Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`cursor-pointer p-2 rounded-full transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800 text-yellow-400' 
              : 'bg-gray-200 text-gray-700'
          }`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <button 
          onClick={toggleMobileMenu}
          className={`p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={`absolute top-full left-0 w-full backdrop-blur-md border-t md:hidden ${isDark ? 'bg-black border-white/20' : 'bg-gray-50 border-gray-200'}`}>
          <nav className="flex flex-col py-4">
            <Link 
              href="/" 
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white hover:text-[#E75E2B]' : 'text-gray-900 hover:text-[#48B4FF]'} ${pathname === '/' ? (isDark ? 'text-orange-500 border-l-4 border-orange-500' : 'text-[#48B4FF] border-l-4 border-[#48B4FF]') : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/team" 
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white hover:text-[#E75E2B]' : 'text-gray-900 hover:text-[#48B4FF]'} ${pathname === '/team' ? (isDark ? 'text-orange-500 border-l-4 border-orange-500' : 'text-[#48B4FF] border-l-4 border-[#48B4FF]') : ''}`}
              onClick={closeMobileMenu}
            >
              Team
            </Link>
            <Link 
              href="/our-car" 
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white hover:text-[#E75E2B]' : 'text-gray-900 hover:text-[#48B4FF]'} ${pathname === '/our-car' ? (isDark ? 'text-orange-500 border-l-4 border-orange-500' : 'text-[#48B4FF] border-l-4 border-[#48B4FF]') : ''}`}
              onClick={closeMobileMenu}
            >
              Our Car
            </Link>
            <Link 
              href="/join-us" 
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white hover:text-[#E75E2B]' : 'text-gray-900 hover:text-[#48B4FF]'} ${pathname === '/join-us' ? (isDark ? 'text-orange-500 border-l-4 border-orange-500' : 'text-[#48B4FF] border-l-4 border-[#48B4FF]') : ''}`}
              onClick={closeMobileMenu}
            >
              Join Us
            </Link>
            <Link 
              href="/sponsors" 
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white hover:text-[#E75E2B]' : 'text-gray-900 hover:text-[#48B4FF]'} ${pathname === '/sponsors' ? (isDark ? 'text-orange-500 border-l-4 border-orange-500' : 'text-[#48B4FF] border-l-4 border-[#48B4FF]') : ''}`}
              onClick={closeMobileMenu}
            >
              Sponsors
            </Link>
            <Link 
              href="/history" 
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white hover:text-[#E75E2B]' : 'text-gray-900 hover:text-[#48B4FF]'} ${pathname === '/history' ? (isDark ? 'text-orange-500 border-l-4 border-orange-500' : 'text-[#48B4FF] border-l-4 border-[#48B4FF]') : ''}`}
              onClick={closeMobileMenu}
            >
              History
            </Link>
            {!loading && (
              user ? (
                <div className="px-6 py-3 flex flex-col gap-2">
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</span>
                  <Button variant="ghost" size="sm" onClick={() => { signOut(); closeMobileMenu(); }} className="justify-start text-xs">
                    Sign out
                  </Button>
                </div>
              ) : (
                <Link 
                  href="/auth/login" 
                  className={`px-6 py-3 flex items-center transition-colors cursor-pointer ${isDark ? 'text-white hover:text-[#E75E2B]' : 'text-gray-900 hover:text-[#48B4FF]'}`}
                  onClick={closeMobileMenu}
                  aria-label="Admin login"
                >
                  <User className="size-6" />
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
