"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface TimelineItem {
  year: string;
  title: string;
  image: string;
  specs: string[];
  highlight?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "OTR 24",
    image: "/history/OTR-24.jpg",
    highlight: "Latest Build",
    specs: [
      "Motor - Emrax 208 HV",
      "Steel Tube Space Frame",
      "Material: 4130 Chromoly",
      "Torsional stiffness: 1366 Nm/deg",
      "Batteries - 384 x Samsung 40T Li-Ion 21700 cells",
      "Telemetry: ECU - Dana TM4 Neuro 200"
    ]
  },
  {
    year: "2022",
    title: "OTR 22' - \"Zippy\"",
    image: "/history/OTR-22.png",
    highlight: "31st Place",
    specs: [
      "Placed 31st out of 100+ teams",
      "Steel Tube Space Frame",
      "Material: 4130 Chromoly",
      "Torsional stiffness: 1366 Nm/deg",
      "4 modules - 396x Li-Ion 21700 cells",
      "Front & Rear Push Rod"
    ]
  },
  {
    year: "2020",
    title: "OTR 20' - \"Gappy\"",
    image: "/history/OTR-20.jpg",
    specs: [
      "Improved chassis, modified suspension system",
      "Battery has a single pack with 4 modules, containing 396 Li-Ion 21700 cells",
      "Emrax 208 Motor",
      "Power output peaks at 80kW",
      "Torque output peaks at 140Nm",
      "Suspension uses a push rod system for both front and rear"
    ]
  },
  {
    year: "2019",
    title: "UOIT 19' - \"Eileen\"",
    image: "/history/UOIT-19.jpg",
    highlight: "First EV",
    specs: [
      "First finished and running electric vehicle",
      "Battery has a single pack with 4 modules, containing 396 Li-Ion 21700 cells",
      "Emrax 208 Motor",
      "Power output peaks at 80kW"
    ]
  },
  {
    year: "2018",
    title: "UOIT 18' - Prototype",
    image: "/history/UOIT-18.jpg",
    highlight: "EV Transition",
    specs: [
      "Transition from a traditional combustion engine to an electric powertrain.",
      "Jump toward sustainable energy solutions.",
      "Chassis is a steel tubular space frame"
    ]
  },
  {
    year: "2013",
    title: "F13",
    image: "/history/F2013.png",
    specs: [
      "Competitive Lap Times",
      "Lost power due to a part falling out",
      "Single Cylinder Kawasaki KFX450R",
      "Inboard Rear Brakes"
    ]
  },
  {
    year: "2011",
    title: "F11",
    image: "/history/F2011.png",
    specs: [
      "Single Cylinder Kawasaki KFX450R",
      "10\" Wheels",
      "Pull Rod Suspension (bottom mount)",
      "Inboard Rear Brakes",
      "Light weight and cost-effective"
    ]
  },
  {
    year: "2010",
    title: "F2010",
    image: "/history/F2010.jpg",
    specs: [
      "Carbon Fiber/Aluminum",
      "Steel Tube Rear Frame Section",
      "Stock Suzuki GSXR 600",
      "Full Aerodynamic Package",
      "13\" wheels"
    ]
  },
  {
    year: "2008",
    title: "F2008",
    image: "/history/F2008.jpg",
    specs: [
      "Similar to 2007",
      "Much lighter",
      "Improved Geometry",
      "Weighed 448lbs"
    ]
  },
  {
    year: "2007",
    title: "F2007",
    image: "/history/F2007.jpg",
    highlight: "Rookie of Year",
    specs: [
      "Carbon Fiber/Aluminum",
      "Rookie of the Year Winner",
      "Weighed 546lbs"
    ]
  }
];

function TimelineItemComponent({ item, index, isDark }: { item: TimelineItem; index: number; isDark: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Desktop Layout */}
      <div className={`hidden md:flex items-center ${isEven ? '' : 'flex-row-reverse'}`}>
        {/* Image Side */}
        <div className={`w-[calc(50%-40px)] ${isEven ? 'pr-6 flex justify-end' : 'pl-6 flex justify-start'}`}>
          <div className="relative group">
            <img
              src={item.image}
              alt={item.title}
              className={`relative w-full max-w-sm lg:max-w-md rounded-xl border-2 shadow-2xl group-hover:scale-[1.02] transition-all duration-300 ${
                isDark ? 'border-orange-500/50 group-hover:border-orange-500' : 'border-[#48B4FF]/50 group-hover:border-[#48B4FF]'
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/history/history_pic.png";
              }}
            />
          </div>
        </div>

        {/* Center Timeline */}
        <div className="w-20 flex-shrink-0 flex justify-center z-10">
          <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg border-4 ${
            isDark 
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/30 border-[rgb(28,28,30)]' 
              : 'bg-gradient-to-br from-[#48B4FF] to-[#3AA0E8] shadow-[#48B4FF]/30 border-white'
          }`}>
            <span className="text-white text-xs lg:text-sm font-bold">{item.year}</span>
          </div>
        </div>

        {/* Info Card Side */}
        <div className={`w-[calc(50%-40px)] ${isEven ? 'pl-6' : 'pr-6'}`}>
          <div className={`rounded-xl p-5 lg:p-6 shadow-xl border transition-all duration-300 ${isEven ? '' : 'ml-auto'} max-w-sm lg:max-w-md ${
            isDark 
              ? 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)] border-gray-700/50 hover:border-orange-500/50' 
              : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-[#48B4FF]/50'
          }`}>
            {item.highlight && (
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-[#48B4FF]/20 text-[#48B4FF]'
              }`}>
                {item.highlight}
              </span>
            )}
            <h3 className={`text-xl lg:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
            <ul className="space-y-2">
              {item.specs.map((spec, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className={`mt-1 ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Year Badge */}
        <div className="flex justify-center mb-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
            isDark 
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/30' 
              : 'bg-gradient-to-br from-[#48B4FF] to-[#3AA0E8] shadow-[#48B4FF]/30'
          }`}>
            <span className="text-white text-sm font-bold">{item.year}</span>
          </div>
        </div>
        
        {/* Image */}
        <div className="mb-4">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full max-w-sm mx-auto rounded-xl border-2 shadow-xl ${
              isDark ? 'border-orange-500/50' : 'border-[#48B4FF]/50'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/history/history_pic.png";
            }}
          />
        </div>
        
        {/* Info Card */}
        <div className={`rounded-xl p-5 shadow-xl border ${
          isDark 
            ? 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)] border-gray-700/50' 
            : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'
        }`}>
          {item.highlight && (
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
              isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-[#48B4FF]/20 text-[#48B4FF]'
            }`}>
              {item.highlight}
            </span>
          )}
          <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
          <ul className="space-y-2">
            {item.specs.map((spec, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className={`mt-1 ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>•</span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)]' : 'bg-gradient-to-br from-gray-300 via-gray-200 to-slate-100'}`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden transition-all duration-1000 ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent' : 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#48B4FF]/10 via-transparent to-transparent'}`}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className={`text-sm md:text-base font-semibold tracking-widest uppercase ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>
                  Ontario Tech Racing
                </span>
              </div>
              
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Our Journey Through Racing History
              </h1>
              
              <div className={`w-20 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8]'}`}></div>
              
              <p className={`text-base md:text-lg leading-relaxed max-w-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                From our first car in 2007 to today&apos;s cutting-edge electric vehicles, explore the evolution of Ontario Tech Racing. Each build represents countless hours of innovation, teamwork, and the relentless pursuit of speed.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <p className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>17+</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Years of Racing</p>
                </div>
                <div>
                  <p className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>10</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cars Built</p>
                </div>
                <div>
                  <p className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>4</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Electric Vehicles</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img 
                src="/history/history_pic.png" 
                alt="Ontario Tech Racing Team History" 
                className={`relative w-full scale-110 rounded-2xl border-2 shadow-2xl ${isDark ? 'border-orange-500/50' : 'border-[#48B4FF]/50'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className={`relative py-16 md:py-24 transition-all duration-1000 ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20 px-4">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            The Timeline
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Follow our journey from combustion engines to electric powertrains
          </p>
          <div className={`w-24 h-1 mx-auto mt-6 rounded-full ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8]'}`}></div>
        </div>
        
        {/* Timeline Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          {/* Vertical Timeline Line - Desktop Only */}
          <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
            isDark 
              ? 'bg-gradient-to-b from-orange-500 via-orange-500/50 to-orange-500/20' 
              : 'bg-gradient-to-b from-[#48B4FF] via-[#48B4FF]/50 to-[#48B4FF]/20'
          }`}></div>
          
          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-0">
            {timelineData.map((item, index) => (
              <div key={item.year} className="md:py-12">
                <TimelineItemComponent item={item} index={index} isDark={isDark} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={`relative py-16 md:py-24 px-4 transition-all duration-1000 ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Want to be part of our next chapter?
          </h3>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Join Ontario Tech Racing and help us write the next page in our history.
          </p>
          <a 
            href="/join-us" 
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 ${
              isDark 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25' 
                : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8] text-white hover:from-[#3AA0E8] hover:to-[#2E90D8] hover:shadow-[#48B4FF]/25'
            }`}
          >
            <span>Join the Team</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
