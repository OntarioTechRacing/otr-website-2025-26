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
        <video src="/otrVideo.mp4" autoPlay loop muted playsInline className="w-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[rgb(34,34,34)] via-[rgb(34,34,34)]/70 to-transparent pointer-events-none"></div>
        
        {/* Scroll Down Arrow */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-25 left-1/2 -translate-x-1/2 z-10 text-white hover:text-orange-500 transition-colors animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll down"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-16 h-16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>


      <div id="content-section" className="bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)] py-24 flex items-center justify-center gap-24">
        <div className="flex-1 max-w-2xl">
          <p className="text-orange-500 text-lg font-bold mb-3 tracking-wide">Ontario Tech Racing</p>
          <h1 className="text-white text-6xl font-bold mb-3 leading-tight">Who are we?</h1>
          <div className="w-16 h-1 bg-orange-500 mb-4"></div>
          <p className="text-gray-300 text-base leading-relaxed mb-12">
            We are a team of 71 passionate engineering and business students who design, manufacture, and market a Formula-style electric race car while staying within a strict budget. Every year at the Michigan International Speedway, the team competes in Formula SAE with other universities across America, showcasing innovation in vehicle design, build quality, and team operations. With ten technical and three business departments, the team of students gain incredible hands-on experiences as a fully functioning motorsports team.
          </p>

          <div className="flex flex-wrap gap-5">
            <StatsCard value="6" label="Years of<br />Experience" />
            <StatsCard value="4" label="Electric Cars<br />Built" />
            <StatsCard value="13" label="Departments" />
            <StatsCard value="71" label="Skilled<br />Members" />
          </div>
        </div>

        <div>
          <img src="/home-crew.png" alt="Ontario Tech Racing Team" className="w-full max-w-2xl rounded-2xl border-4 border-orange-500 shadow-2xl" />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gradient-to-br from-[rgb(18,18,20)] via-[rgb(28,28,30)] to-[rgb(34,34,34)] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-orange-500 text-lg font-bold mb-3 tracking-wide">Follow Us</p>
            <h2 className="text-white text-5xl font-bold mb-3 leading-tight">Social Media</h2>
            <div className="w-16 h-1 bg-orange-500 mb-4 mx-auto"></div>
            <p className="text-gray-300 text-base leading-relaxed max-w-3xl mx-auto">
              Stay up to date with Ontario Tech Racing! Follow us on Instagram and TikTok to see behind-the-scenes content, race day updates, and the latest from our team.
            </p>
          </div>

           {/* Videos Grid */}
           <div className="flex flex-wrap items-center justify-center gap-6">

           <div className="rounded-2xl border-4 border-blue-500 overflow-hidden shadow-2xl" style={{ width: '340px', height: '600px' }}>
               <iframe
                 src="https://www.instagram.com/p/DRLg_3yjAcD/embed"
                 width="340"
                 height="600"
                 className="w-full h-full"
               />
             </div>

             {/* Local TikTok Video */}
             <div className="rounded-2xl border-4 border-orange-500 overflow-hidden shadow-2xl" style={{ width: '340px', height: '600px' }}>
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
 
             <div className="rounded-2xl border-4 border-blue-500 overflow-hidden shadow-2xl" style={{ width: '340px', height: '600px' }}>
               <iframe
                 src="https://www.instagram.com/p/DDyVUTUxYeW/embed"
                 width="340"
                 height="600"
                 className="w-full h-full"
               />
             </div>
           </div>
        </div>
      </div>
    </>
  );
}