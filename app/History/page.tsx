"use client";

import { useEffect, useRef, useState } from "react";

interface TimelineItem {
  year: string;
  title: string;
  image: string;
  specs: string[];
}

const prefix = process.env.NODE_ENV === 'production' ? '/otr-website-2025-26' : '';

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "OTR 24",
    image: `${prefix}/history/OTR-24.jpg`,
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
    image: `${prefix}/history/OTR-22.png`,
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
    image: `${prefix}/history/OTR-20.jpg`,
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
    image: `${prefix}/history/UOIT-19.jpg`,
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
    image: `${prefix}/history/UOIT-18.jpg`,
    specs: [
      "Transition from a traditional combustion engine to an electric powertrain.",
      "Jump toward sustainable energy solutions.",
      "Chassis is a steel tubular space frame"
    ]
  },
  {
    year: "2013",
    title: "F13",
    image: `${prefix}/history/F2013.png`,
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
    image: `${prefix}/history/F2011.png`,
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
    image: `${prefix}/history/F2010.jpg`,
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
    image: `${prefix}/history/F2008.jpg`,
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
    image: `${prefix}/history/F2007.jpg`,
    specs: [
      "Carbon Fiber/Aluminum",
      "Rookie of the Year Winner",
      "Weighed 546lbs"
    ]
  }
];

function TimelineItemComponent({ item, index }: { item: TimelineItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

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

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Left Side - Image */}
      <div className="w-1/2 flex justify-end pr-12">
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/20 rounded-lg"></div>
          <img
            src={item.image}
            alt={item.title}
            className="relative w-full max-w-md rounded-lg border-4 border-blue-500 shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${prefix}/history/history_pic.png`;
            }}
          />
        </div>
      </div>

      {/* Center - Timeline Line & Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-[rgb(34,34,34)] z-10"></div>
      </div>

      {/* Right Side - Info Card */}
      <div className="w-1/2 pl-12">
        <div className="bg-[rgb(34,34,34)] rounded-2xl p-6 shadow-2xl max-w-md border-4 border-orange-500">
          <h3 className="text-orange-500 text-3xl font-bold mb-3">{item.title}</h3>
          <ul className="space-y-1 text-gray-300 list-disc list-inside">
            {item.specs.map((spec, i) => (
              <li key={i} className="text-sm leading-relaxed">{spec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  return (
    <div className="bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)]">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-8 py-20">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <p className="text-orange-500 text-lg font-bold tracking-wide">Ontario Tech Racing</p>
            <h1 className="text-white text-5xl lg:text-6xl font-bold leading-tight">
              Our Journey: A Glimpse Into The Past
            </h1>
            <div className="w-32 h-1 bg-orange-500"></div>

            <div className="space-y-4 text-gray-300 text-base leading-relaxed">
              <p>
                Welcome to the history page of Ontario Tech Racing, where we take pride in showcasing our rich legacy of innovation, teamwork, and engineering excellence. Over the years, our team has pushed the boundaries of what's possible, designing and building high-performance cars that reflect our dedication to the craft and our passion for racing.
              </p>
              <p>
                This page is a tribute to the past teams and the incredible cars they've brought to life. From our humble beginnings to the sophisticated machines we engineer today, each era of Ontario Tech Racing tells a story of progress, perseverance, and the relentless pursuit of speed and efficiency.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={`${prefix}/history/history_pic.png`}
              alt="Ontario Tech Racing Team History"
              className="w-full max-w-2xl rounded-2xl border-4 border-orange-500 shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="flex justify-center py-8">
        <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>

      {/* Timeline Section */}
      <div className="px-8 pb-20">
        <h2 className="text-white text-6xl font-bold text-center mb-16">Timeline</h2>

        <div className="max-w-7xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500 -translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-32">
            {timelineData.map((item, index) => (
              <TimelineItemComponent key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
