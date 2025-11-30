"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {/* Hero Section with Video */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video 
          src="/otrVideo.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[rgb(34,34,34)]"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="mb-6 animate-[fadeIn_1s_ease-out]">
            <span className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-sm font-semibold tracking-wider uppercase">
              Formula SAE Electric
            </span>
          </div>
          <img src="/otrLogo.png" alt="Ontario Tech Racing Logo" className="w-lg h-auto mx-auto mb-10 animate-[fadeIn_1s_ease-out_200ms_both]" />
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8  animate-[fadeIn_1s_ease-out_400ms_both]">
            Engineering excellence at full throttle. Designing, building, and racing electric vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeIn_1s_ease-out_600ms_both]">

          </div>
        </div>
        
        {/* Scroll Down Arrow */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-orange-500 transition-all duration-300 animate-bounce cursor-pointer bg-transparent border-none group"
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
        className="border-t border-gray-800 bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)] py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24">
            
            {/* Image Side */}
            <div className={`w-full lg:w-1/2 flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
              <div className="relative group">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 to-transparent rounded-2xl blur-xl group-hover:from-orange-500/30 transition-all duration-500"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-orange-500 rounded-tl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-orange-500 rounded-br-xl"></div>
                
                <img 
                  src="/home-crew.png" 
                  alt="Ontario Tech Racing Team" 
                  className="relative w-full rounded-xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Text Side */}
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-semibold rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Who Are we?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6"></div>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
                We are a team of <span className="text-white font-semibold">71 passionate engineering and business students</span> who design, manufacture, and market a Formula-style electric race car while staying within a strict budget.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10">
                Every year at the Michigan International Speedway, the team competes in Formula SAE with other universities across America, showcasing innovation in vehicle design, build quality, and team operations. With ten technical and three business departments, our students gain incredible hands-on experiences as a fully functioning motorsports team.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-colors group">
                  <p className="text-3xl md:text-4xl font-black text-white group-hover:text-orange-500 transition-colors">6+</p>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-colors group">
                  <p className="text-3xl md:text-4xl font-black text-white group-hover:text-orange-500 transition-colors">4</p>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">Electric Cars Built</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-colors group">
                  <p className="text-3xl md:text-4xl font-black text-white group-hover:text-orange-500 transition-colors">13</p>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">Departments</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[rgb(42,42,42)] to-[rgb(32,32,34)] rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-colors group">
                  <p className="text-3xl md:text-4xl font-black text-white group-hover:text-orange-500 transition-colors">71</p>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="border-t border-gray-800 bg-gradient-to-br from-[rgb(18,18,20)] via-[rgb(28,28,30)] to-[rgb(34,34,34)] py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-10 lg:mb-12">
            <p className="text-orange-500 text-sm sm:text-base md:text-lg font-bold mb-2 md:mb-3 tracking-wide">Follow Us</p>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 leading-tight">Social Media</h2>
            <div className="w-12 md:w-16 h-1 bg-orange-500 mb-3 md:mb-4 mx-auto"></div>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
              Stay up to date with Ontario Tech Racing! Follow us on Instagram and TikTok to see behind-the-scenes content, race day updates, and the latest from our team.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
            <div className="rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-500 overflow-hidden shadow-2xl w-full sm:w-[300px] md:w-[340px] h-[400px] sm:h-[500px] md:h-[600px]">
              <iframe
                src="https://www.instagram.com/p/DRLg_3yjAcD/embed"
                width="100%"
                height="100%"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            {/* Local TikTok Video */}
            <div className="rounded-xl sm:rounded-2xl border-2 sm:border-4 border-orange-500 overflow-hidden shadow-2xl w-full sm:w-[300px] md:w-[340px] h-[400px] sm:h-[500px] md:h-[600px]">
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

            <div className="rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-500 overflow-hidden shadow-2xl w-full sm:w-[300px] md:w-[340px] h-[400px] sm:h-[500px] md:h-[600px]">
              <iframe
                src="https://www.instagram.com/p/DDyVUTUxYeW/embed"
                width="100%"
                height="100%"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
