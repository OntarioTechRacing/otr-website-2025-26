'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t ${isDark ? 'bg-black border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/otrLogo.png" alt="OTR Logo" className="h-12 w-auto" />
            </div>
            <p className={`text-sm leading-relaxed mb-6 max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              A team of passionate engineering and business students designing, manufacturing, and racing Formula-style electric vehicles at Michigan International Speedway.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/ontariotechracing/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-[#48B4FF] hover:text-white'}`}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/ontariotechracing/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-[#48B4FF] hover:text-white'}`}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@ontariotechracing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-[#48B4FF] hover:text-white'}`}
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="mailto:motorsports@ontariotechu.net" 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-[#48B4FF] hover:text-white'}`}
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-[#48B4FF]'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/team" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-[#48B4FF]'}`}>
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/our-car" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-[#48B4FF]'}`}>
                  Our Car
                </Link>
              </li>
              <li>
                <Link href="/history" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-[#48B4FF]'}`}>
                  History
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-[#48B4FF]'}`}>
                  Sponsors
                </Link>
              </li>
              <li>
                <Link href="/join-us" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-[#48B4FF]'}`}>
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:motorsports@ontariotechu.net" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-[#48B4FF]'}`}>
                  motorsports@ontariotechu.net
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  ACE Building, Ontario Tech University<br />
                  Oshawa, ON
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm text-center md:text-left ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © {currentYear} Ontario Tech Racing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
