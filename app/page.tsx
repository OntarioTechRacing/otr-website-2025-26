"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSocialVisible, setIsSocialVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const accentColor = isDark ? 'orange' : '[#48B4FF]';

  const scrollToContent = () => {
    document.getElementById('content-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSocialVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (socialRef.current) {
      observer.observe(socialRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section with Video */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video 
          src="/otrHomePage.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 ${isDark ? 'to-[rgb(34,34,34)]' : 'to-white'}`}></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="mb-6 animate-[fadeIn_1s_ease-out]">
            <span className={`inline-block px-4 py-2 border rounded-full text-sm font-semibold tracking-wider uppercase ${isDark ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-[#48B4FF]/20 border-[#48B4FF]/50 text-[#48B4FF]'}`}>
              Formula SAE Electric
            </span>
          </div>
          <img src="/otrLogo.png" alt="Ontario Tech Racing Logo" className="w-lg h-auto mx-auto mb-10 animate-[fadeIn_1s_ease-out_200ms_both]" />
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-[fadeIn_1s_ease-out_400ms_both]">
            Engineering excellence at full charge. Designing, building, and racing electric vehicles.
          </p>
        </div>
        
        {/* Scroll Down Arrow */}
        <button 
          onClick={scrollToContent}
          className={`absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-10 text-white/70 transition-all duration-300 animate-bounce cursor-pointer bg-transparent border-none group ${isDark ? 'hover:text-orange-500' : 'hover:text-[#48B4FF]'}`}
          aria-label="Scroll down"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-8 h-8 md:w-10 md:h-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </button>
      </div>

      {/* About Section */}
      <div 
        id="content-section" 
        ref={aboutRef}
        className={`border-t py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden ${
          isDark 
            ? 'border-gray-800 bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)]' 
            : 'border-gray-200 bg-gradient-to-br from-gray-300 via-gray-200 to-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24">
            
            {/* Image Side */}
            <div className={`w-full lg:w-1/2 flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
              <div className="relative group">
                {/* Decorative elements */}
                <div className={`absolute -inset-4 rounded-2xl blur-xl transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-orange-500/20 to-transparent group-hover:from-orange-500/30' : 'bg-gradient-to-br from-[#48B4FF]/20 to-transparent group-hover:from-[#48B4FF]/30'}`}></div>
                <div className={`absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 rounded-tl-xl ${isDark ? 'border-orange-500' : 'border-[#48B4FF]'}`}></div>
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 rounded-br-xl ${isDark ? 'border-orange-500' : 'border-[#48B4FF]'}`}></div>
                
                <img 
                  src="/home-crew.png" 
                  alt="Ontario Tech Racing Team" 
                  className="relative w-full rounded-xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Text Side */}
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${isDark ? 'bg-orange-500/10 text-orange-500' : 'bg-[#48B4FF]/10 text-[#48B4FF]'}`}>
                About Us
              </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Who Are we?
              </h2>
              <div className={`w-16 h-1 rounded-full mb-6 ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8]'}`}></div>
              <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                We are a team of <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>80+ passionate engineering and business students</span> who design, manufacture, and market a Formula-style electric race car while staying within a strict budget.
              </p>
              <p className={`text-sm sm:text-base leading-relaxed mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Every year, the team competes in Formula SAE with other universities across America, showcasing innovation in vehicle design, build quality, and team operations. With ten technical and three business departments, our students gain incredible hands-on experiences as a fully functioning motorsports team.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                <div className={`text-center p-4 rounded-xl border transition-colors group ${
                  isDark 
                    ? 'bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] border-gray-700/50 hover:border-orange-500/50' 
                    : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-[#48B4FF]/50'
                }`}>
                  <p className={`text-3xl md:text-4xl font-black transition-colors ${isDark ? 'text-white group-hover:text-orange-500' : 'text-gray-900 group-hover:text-[#48B4FF]'}`}>6+</p>
                  <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Years Experience</p>
                </div>
                <div className={`text-center p-4 rounded-xl border transition-colors group ${
                  isDark 
                    ? 'bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] border-gray-700/50 hover:border-orange-500/50' 
                    : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-[#48B4FF]/50'
                }`}>
                  <p className={`text-3xl md:text-4xl font-black transition-colors ${isDark ? 'text-white group-hover:text-orange-500' : 'text-gray-900 group-hover:text-[#48B4FF]'}`}>4</p>
                  <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Electric Cars Built</p>
                </div>
                <div className={`text-center p-4 rounded-xl border transition-colors group ${
                  isDark 
                    ? 'bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] border-gray-700/50 hover:border-orange-500/50' 
                    : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-[#48B4FF]/50'
                }`}>
                  <p className={`text-3xl md:text-4xl font-black transition-colors ${isDark ? 'text-white group-hover:text-orange-500' : 'text-gray-900 group-hover:text-[#48B4FF]'}`}>13</p>
                  <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Departments</p>
                </div>
                <div className={`text-center p-4 rounded-xl border transition-colors group ${
                  isDark 
                    ? 'bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] border-gray-700/50 hover:border-orange-500/50' 
                    : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-[#48B4FF]/50'
                }`}>
                  <p className={`text-3xl md:text-4xl font-black transition-colors ${isDark ? 'text-white group-hover:text-orange-500' : 'text-gray-900 group-hover:text-[#48B4FF]'}`}>80+</p>
                  <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div ref={socialRef} className={`border-t py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 ${
        isDark 
          ? 'border-gray-800 bg-gradient-to-br from-[rgb(18,18,20)] via-[rgb(28,28,30)] to-[rgb(34,34,34)]' 
          : 'border-gray-200 bg-gradient-to-br from-gray-300 via-gray-200 to-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-6 md:mb-10 lg:mb-12 transition-all duration-1000 ${isSocialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className={`text-sm sm:text-base md:text-lg font-bold mb-2 md:mb-3 tracking-wide ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>Follow Us</p>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Social Media</h2>
            <div className={`w-12 md:w-16 h-1 mb-3 md:mb-4 mx-auto ${isDark ? 'bg-orange-500' : 'bg-[#48B4FF]'}`}></div>
            <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto px-2 sm:px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Stay up to date with Ontario Tech Racing! Follow us on Instagram and TikTok to see behind-the-scenes content, race day updates, and the latest from our team.
            </p>
          </div>

          {/* Videos Grid */}
          <div className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6 transition-all duration-1000 delay-200 ${isSocialVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className={`rounded-xl sm:rounded-2xl border-2 sm:border-4 overflow-hidden shadow-2xl w-full sm:w-[300px] md:w-[340px] h-[400px] sm:h-[500px] md:h-[600px] ${isDark ? 'border-orange-500' : 'border-[#48B4FF]'}`}>
              <iframe
                src="https://www.instagram.com/p/DRLg_3yjAcD/embed"
                width="100%"
                height="100%"
                className="w-full h-full"
                style={{ border: 'none' }}
                allowFullScreen
              />
            </div>



            <div className={`rounded-xl sm:rounded-2xl border-2 sm:border-4 overflow-hidden shadow-2xl w-full sm:w-[300px] md:w-[340px] h-[400px] sm:h-[500px] md:h-[600px] ${isDark ? 'border-orange-500' : 'border-[#48B4FF]'}`}>
              <video 
                src="/home/OTR_tiktok2.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                controls 
                className="w-full h-full object-cover"
                style={{ backgroundColor: 'black' }}
              />
            </div>
            <div className={`rounded-xl sm:rounded-2xl border-2 sm:border-4 overflow-hidden shadow-2xl w-full sm:w-[300px] md:w-[340px] h-[400px] sm:h-[500px] md:h-[600px] ${isDark ? 'border-orange-500' : 'border-[#48B4FF]'}`}>
              <iframe 
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7059545883209568256?collapsed=1" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen={true} 
                className="w-full h-full"
                style={{ border: 'none' }}
                title="Embedded post"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
