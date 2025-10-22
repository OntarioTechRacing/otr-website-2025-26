'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
    <div className={`min-h-screen ${bg} ${text} transition-colors`}>
      <header className="fixed top-0 w-full z-50 px-8 py-4 flex items-center justify-between backdrop-blur-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/otrLogo.PNG" alt="OTR Logo" className="h-12" />
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-wider text-white">
          <a href="#home" className={`transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>Home</a>
          <a href="#team" className={`transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>Team</a>
          <a href="#our-car" className="text-[#48B4FF]">Our Car</a>
          <a href="#sponsors" className={`transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>Sponsors</a>
          <a href="#history" className={`transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>History</a>
        </nav>
        <div className="flex gap-4 text-white">
          <a href="https://www.instagram.com/ontariotechracing/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/ontariotechracing/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="mailto:motorsports@ontariotechu.net" className={`transition-colors ${isDark ? 'hover:text-[#E75E2B]' : 'hover:text-[#48B4FF]'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </header>

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