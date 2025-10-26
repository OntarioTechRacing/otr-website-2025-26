'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';

const sections = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Designed for strength and weight efficiency, the chassis provides the backbone of the vehicle while ensuring safety and performance.',
    specs: ['4130 chromoly', 'Torsional stiffness 1366 Nm/l', 'Weight 39x'],
    side: 'left'
  },
  {
    id: 'suspension',
    title: 'Suspension',
    description: 'Adjustability is key. Our suspension team focuses on refining geometry, optimizing anti-dive/anti-squat, and enhancing tunability for different track conditions.',
    specs: ['Coilover (Red) = 9.75 lb/sq of nominal travel', '225 front/front and rear spring stiffness', 'Adjustable Anti-dive/Anti-Squat'],
    side: 'right'
  },
  {
    id: 'drivetrain',
    title: 'Drive Train & Braking',
    description: 'We design the systems that get power to the wheels and bring the car to a stop. From fine-tuned brakes that deliver confident control, to a drivetrain built for smooth, responsive acceleration.',
    specs: ['Emrax 208 HV Motor', 'Max current 180 Amps', 'Total voltage 400V'],
    side: 'left'
  },
  {
    id: 'hardware',
    title: 'Hardware & Electronics',
    description: 'Responsible for designing, building, and integrating critical systems such as the battery management system (BMS), power distribution, control units, and sensor networks. From high-voltage safety to efficient energy delivery, the department ensures every electronic component works seamlessly to optimize performance, reliability, and safety on the track',
    specs: [],
    side: 'right'
  },
  {
    id: 'aerodynamics',
    title: 'Aerodynamics',
    description: 'The Aerodynamics department focuses on designing and optimizing the body of the electric car to minimize drag and maximize efficiency and stability. Using tools like CFD simulations and wind tunnel testing, the team develops wings, diffusers, and bodywork that enhance downforce and improve handling at high speeds.',
    specs: [],
    side: 'left'
  },
  {
    id: 'sponsors',
    title: 'Our Sponsors',
    description: 'Our business team secures vital sponsorships, providing the financial support and industry partnerships that make this project possible.',
    specs: [],
    side: 'right'
  }
];

function CarImage({ theme }: { theme: 'dark' | 'light' }) {
  const [scroll, setScroll] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScroll(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isDark = theme === 'dark';
  const arrowColor = isDark ? '#E75E2B' : '#48B4FF';
  const fillColor = isDark ? 'black' : 'white';
  
  return (
    <div className="relative w-full">
      <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-20 hover:opacity-70" aria-label="Previous">
        <svg width="30" height="30" fill={fillColor} stroke={arrowColor} strokeWidth="2">
          <path d="M20 8 L12 15 L20 22" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className={`relative overflow-hidden rounded-2xl border-2 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`} style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translateY(${scroll * 0.4}px)` }}>
          <span className="text-gray-500">Parallax of car</span>
        </div>
      </div>
      
      <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-20 hover:opacity-70" aria-label="Next">
        <svg width="30" height="30" fill={fillColor} stroke={arrowColor} strokeWidth="2">
          <path d="M10 8 L18 15 L10 22" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

function ScrollChevrons({ theme }: { theme: 'dark' | 'light' }) {
  const color = theme === 'dark' ? '#E75E2B' : '#48B4FF';
  return (
    <div className="flex flex-col items-center gap-2 animate-bounce">
      <svg width="60" height="80" fill="none" stroke={color} strokeWidth="4">
        <path d="M10 10 L30 30 L50 10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 30 L30 50 L50 30" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 50 L30 70 L50 50" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function SubsystemCard({ data, theme, visible }: { data: typeof sections[0], theme: 'dark' | 'light', visible: boolean }) {
  const isDark = theme === 'dark';
  const badgeColor = isDark ? '#E75E2B' : '#48B4FF';
  const badgeText = isDark ? 'text-white' : 'text-gray-900';
  
  return (
    <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className={`p-6 rounded-2xl border-2 text-center ${isDark ? 'bg-black/80 border-blue-500/30' : 'bg-white'}`} style={!isDark ? { borderColor: '#48B4FF' } : undefined}>
        <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.title}</h3>
        
        {data.specs.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {data.specs.map((spec, i) => (
              <span key={i} className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${badgeText}`} style={{ backgroundColor: badgeColor }}>
                {spec}
              </span>
            ))}
          </div>
        )}
        
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{data.description}</p>
      </div>
    </div>
  );
}

export default function CarPage() {
  const { theme, setTheme } = useTheme();
  const [visibleCards, setVisibleCards] = useState(new Set<number>());
  const [showThemeToggle, setShowThemeToggle] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      }, { threshold: 0.1 });
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setShowThemeToggle(window.scrollY < heroRef.current.offsetHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-black' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${bg} ${text} transition-colors pt-20`}>

      <div className={`fixed top-32 right-8 z-50 flex gap-2 backdrop-blur-md rounded-full p-1 transition-opacity ${showThemeToggle ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(72,180,255,0.15)' }}>
        <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Dark</button>
        <button onClick={() => setTheme('light')} className={`px-4 py-2 rounded-full ${theme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>Light</button>
      </div>

      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-white'}`} />
        <div className="relative z-10 text-center px-6">
          <div className={`inline-block px-8 py-6 rounded-3xl border-2 max-w-3xl ${isDark ? 'border-white/30' : ''}`} style={!isDark ? { borderColor: '#48B4FF' } : undefined}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome to F2025</h2>
            <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Introducing the F2025, our latest Formula SAE electric vehicle, built through collaboration, innovation, and cutting-edge engineering.</p>
          </div>
          <div className="mt-16"><ScrollChevrons theme={theme} /></div>
        </div>
        <div className="absolute left-12 top-24 bottom-24 w-px bg-linear-to-b from-transparent via-blue-500/50 to-transparent" />
      </section>

      <section className="py-24 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {sections.filter(s => s.side === 'left').map((section) => {
                const index = sections.findIndex(s => s.id === section.id);
                return <div key={section.id} ref={el => { cardRefs.current[index] = el; }}><SubsystemCard data={section} theme={theme} visible={visibleCards.has(index)} /></div>;
              })}
            </div>
            <div className="hidden lg:flex col-span-4 items-start justify-center">
              <div className="sticky top-32 w-full max-w-[500px]"><CarImage theme={theme} /></div>
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {sections.filter(s => s.side === 'right').map((section) => {
                const index = sections.findIndex(s => s.id === section.id);
                return <div key={section.id} ref={el => { cardRefs.current[index] = el; }}><SubsystemCard data={section} theme={theme} visible={visibleCards.has(index)} /></div>;
              })}
            </div>
          </div>
        </div>
        <div className="mt-16"><ScrollChevrons theme={theme} /></div>
      </section>
    </div>
  );
}