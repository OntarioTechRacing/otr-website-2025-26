"use client";

import Image from "next/image";
import StatsCard from "@/components/StatsCard";
import { useEffect } from "react";

export default function Home() {
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

  return (
    <>
      <div className="relative">
        <video src="/otrVideo.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-t from-[rgb(34,34,34)] via-[rgb(34,34,34)]/70 to-transparent pointer-events-none"></div>
        
        {/* Scroll Down Arrow */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 text-white hover:text-orange-500 transition-colors animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll down"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>


      <div id="content-section" className="bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)] py-8 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-24">
          <div className="flex-1 max-w-2xl w-full order-2 lg:order-1">
            <p className="text-orange-500 text-sm sm:text-base md:text-lg font-bold mb-2 md:mb-3 tracking-wide">Ontario Tech Racing</p>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight">Who are we?</h1>
            <div className="w-12 md:w-16 h-1 bg-orange-500 mb-3 md:mb-4"></div>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 md:mb-8 lg:mb-12">
              We are a team of 71 passionate engineering and business students who design, manufacture, and market a Formula-style electric race car while staying within a strict budget. Every year at the Michigan International Speedway, the team competes in Formula SAE with other universities across America, showcasing innovation in vehicle design, build quality, and team operations. With ten technical and three business departments, the team of students gain incredible hands-on experiences as a fully functioning motorsports team.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5">
              <StatsCard value="6" label="Years of<br />Experience" />
              <StatsCard value="4" label="Electric Cars<br />Built" />
              <StatsCard value="13" label="Departments" />
              <StatsCard value="71" label="Skilled<br />Members" />
            </div>
          </div>

          <div className="w-full lg:w-auto flex-shrink-0 order-1 lg:order-2 mb-4 lg:mb-0">
            <img src="/home-crew.png" alt="Ontario Tech Racing Team" className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-2xl border-4 border-orange-500 shadow-2xl mx-auto" />
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gradient-to-br from-[rgb(18,18,20)] via-[rgb(28,28,30)] to-[rgb(34,34,34)] py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
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