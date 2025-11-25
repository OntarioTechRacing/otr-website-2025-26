"use client";

import Image from "next/image";
import StatsCard from "@/components/StatsCard";
import { useEffect } from "react";

export default function Home() {
  const scrollToContent = () => {
    document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load TikTok and Instagram embed scripts
  useEffect(() => {
    const tiktokScript = document.createElement('script');
    tiktokScript.src = 'https://www.tiktok.com/embed.js';
    tiktokScript.async = true;
    document.body.appendChild(tiktokScript);

    const instagramScript = document.createElement('script');
    instagramScript.src = '//www.instagram.com/embed.js';
    instagramScript.async = true;
    document.body.appendChild(instagramScript);

    return () => {
      document.body.removeChild(tiktokScript);
      document.body.removeChild(instagramScript);
    };
  }, []);

  const prefix = process.env.NODE_ENV === 'production' ? '/otr-website-2025-26' : '';

  return (
    <>
      {/* Hero Video */}
      <div className="relative">
        <video src={`${prefix}/otrVideo.mp4`} autoPlay loop muted playsInline className="w-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[rgb(34,34,34)] via-[rgb(34,34,34)]/70 to-transparent pointer-events-none" />
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

      {/* Main Content */}
      <div
        id="content-section"
        className="bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)] min-h-screen flex items-center justify-center gap-24 -mt-1"
      >
        <div className="flex-1 max-w-2xl">
          <p className="text-orange-500 text-lg font-bold mb-3 tracking-wide">Ontario Tech Racing</p>
          <h1 className="text-white text-6xl font-bold mb-3 leading-tight">Who are we?</h1>
          <div className="w-16 h-1 bg-orange-500 mb-4" />
          <p className="text-gray-300 text-base leading-relaxed mb-12">
            We are a team of 71 passionate engineering and business students who design, manufacture, and market a Formula-style electric race car while staying within a strict budget. Every year at the Michigan International Speedway, the team competes in Formula SAE with other universities across America, showcasing innovation in vehicle design, build quality, and team operations. With ten technical and three business departments, the team of students gain incredible hands-on experiences as a fully functioning motorsports team.
          </p>
          <div className="flex flex-wrap gap-5">
            <StatsCard value="6" label="Years of<br/>Experience" />
            <StatsCard value="4" label="Electric Cars<br/>Built" />
            <StatsCard value="13" label="Departments" />
            <StatsCard value="71" label="Skilled<br/>Members" />
          </div>
        </div>
        <div>
          <img src={`${prefix}/home-crew.png`} alt="Ontario Tech Racing Team" className="w-full max-w-2xl rounded-2xl border-4 border-orange-500 shadow-2xl" />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gradient-to-br from-[rgb(18,18,20)] via-[rgb(28,28,30)] to-[rgb(34,34,34)] py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-center xl:text-left">
            <h2 className="text-white text-5xl font-bold mb-3">Social Media</h2>
            <div className="w-16 h-1 bg-orange-500 mb-4 mx-auto xl:mx-0" />
            <p className="text-gray-300 text-base leading-relaxed">Check out our Instagram and TikTok.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* TikTok Card */}
            <div className="rounded-2xl border-4 border-orange-500 overflow-hidden shadow-2xl bg-black" style={{ width: '340px' }}>
              <blockquote
                className="tiktok-embed"
                cite="https://www.tiktok.com/@ontariotechracing"
                data-unique-id="ontariotechracing"
                data-embed-type="creator"
                style={{ width: '100%', height: '100%' }}
              >
                <section>
                  <a target="_blank" href="https://www.tiktok.com/@ontariotechracing?refer=embed">
                    @ontariotechracing
                  </a>
                </section>
              </blockquote>
            </div>

            {/* Instagram Card */}
            <div className="rounded-2xl border-4 border-orange-500 overflow-hidden shadow-2xl bg-white" style={{ width: '340px' }}>
              <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/ontariotechracing/?hl=en"
                  data-instgrm-version="14"
                  style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: 'none', margin: '0px', maxWidth: '340px', minWidth: '326px', padding: '0', width: 'calc(100% - 2px)' }}
                >
                  <div style={{ padding: '16px' }}>
                    <a href="https://www.instagram.com/ontariotechracing/?hl=en" style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank">
                      View this post on Instagram
                    </a>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}