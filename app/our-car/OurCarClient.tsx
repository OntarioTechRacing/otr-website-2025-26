'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Pencil, Plus, Trash2, X, Save } from 'lucide-react';
import { updateCarSubsystem, addCarSubsystem, deleteCarSubsystem } from '@/app/actions/carSubsystems';
import type { CarSubsystem } from './page';

interface EditModalProps {
  subsystem: CarSubsystem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<CarSubsystem>) => Promise<void>;
  isNew?: boolean;
  nextOrder?: number;
}

function EditModal({ subsystem, isOpen, onClose, onSave, isNew, nextOrder }: EditModalProps) {
  const [formData, setFormData] = useState({
    title: subsystem?.title || "",
    description: subsystem?.description || "",
    specs: subsystem?.specs?.join("\n") || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (subsystem) {
      setFormData({
        title: subsystem.title,
        description: subsystem.description,
        specs: subsystem.specs?.join("\n") || "",
      });
    } else {
      setFormData({ title: "", description: "", specs: "" });
    }
  }, [subsystem]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      title: formData.title,
      description: formData.description,
      specs: formData.specs.split("\n").filter(s => s.trim()),
      order: nextOrder || subsystem?.order || 0,
    });
    setSaving(false);
    onClose();
  };

  const inputClass = "w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50 transition-colors";
  const labelClass = "block text-sm font-medium text-white/70 mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-white">
            {isNew ? "Add Subsystem" : "Edit Subsystem"}
          </h2>
          <button type="button" onClick={onClose} className="p-2 -m-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Specs (one per line)</label>
            <textarea value={formData.specs} onChange={(e) => setFormData({ ...formData, specs: e.target.value })} placeholder="4130 chromoly&#10;Torsional stiffness 1366 Nm/l" rows={4} className={inputClass} />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CarImage({ theme }: { theme: 'dark' | 'light' }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const frameRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalFrames = 151;
  const isDark = theme === 'dark';
  const arrowColor = isDark ? '#E75E2B' : '#48B4FF';
  const fillColor = isDark ? 'black' : 'white';

  useEffect(() => {
    const handleScroll = () => {
      if (!autoPlay && containerRef.current) {
        const scrollY = window.pageYOffset;
        const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const frame = Math.floor(scrollProgress * totalFrames * 0.15) % totalFrames;
        setCurrentFrame(frame);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoPlay, totalFrames]);

  useEffect(() => {
    if (autoPlay && !isHovering) {
      const animate = () => {
        frameRef.current += 0.08;
        const nextFrame = Math.floor(frameRef.current) % totalFrames;
        setCurrentFrame(nextFrame);
        setRotation({ x: 0, y: 0 });
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setRotation({ x: 0, y: 0 });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoPlay, isHovering, totalFrames]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoPlay) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const frame = Math.floor(mouseX * totalFrames);
    setCurrentFrame(frame);
    setRotation({ x: 0, y: 0 });
  };

  const getFramePath = (frameNum: number) => {
    const paddedNum = String(frameNum).padStart(5, '0');
    return `/parallax/frame${paddedNum}.png`;
  };

  return (
    <div className="relative w-full">
      <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-20 hover:opacity-70" aria-label="Previous">
        <svg width="30" height="30" fill={fillColor} stroke={arrowColor} strokeWidth="2">
          <path d="M20 8 L12 15 L20 22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl border-2 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}
        style={{ aspectRatio: '16/9', perspective: '1000px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setRotation({ x: 0, y: 0 }); }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transformStyle: 'preserve-3d' }}
        >
          <img
            src={getFramePath(currentFrame)}
            alt={`F2025 Racing Car - Frame ${currentFrame}`}
            className="w-full h-full"
            style={{ filter: isDark ? 'brightness(0.9)' : 'brightness(1)', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${isDark ? '0.03' : '0.05'}) 0%, transparent 60%)` }} />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-8 py-3 rounded-full text-sm font-medium border-2 flex items-center gap-2 transition-all duration-300`}
          style={autoPlay ? { backgroundColor: isDark ? '#E75E2B' : '#48B4FF', borderColor: isDark ? '#E75E2B' : '#48B4FF', color: 'white' } : { borderColor: isDark ? '#E75E2B' : '#48B4FF', color: isDark ? '#E75E2B' : '#48B4FF' }}
        >
          {autoPlay ? 'Stop Play' : <>Play <span className="text-base ml-1">▶</span></>}
        </button>
      </div>

      <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-20 hover:opacity-70" aria-label="Next">
        <svg width="30" height="30" fill={fillColor} stroke={arrowColor} strokeWidth="2">
          <path d="M10 8 L18 15 L10 22" strokeLinecap="round" strokeLinejoin="round" />
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
        <path d="M10 10 L30 30 L50 10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 30 L30 50 L50 30" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 50 L30 70 L50 50" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SubsystemCard({ data, theme, visible, isAdmin, onEdit, onDelete }: { data: CarSubsystem; theme: 'dark' | 'light'; visible: boolean; isAdmin: boolean; onEdit: () => void; onDelete: () => void }) {
  const isDark = theme === 'dark';
  const badgeColor = isDark ? '#E75E2B' : '#48B4FF';
  const badgeText = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className={`p-6 rounded-2xl border-2 text-center relative group ${isDark ? 'bg-black/80 border-blue-500/30' : 'bg-gray-50'}`} style={!isDark ? { borderColor: '#48B4FF' } : undefined}>
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onEdit} className="p-1.5 bg-orange-500/80 hover:bg-orange-500 text-white rounded-lg transition-colors cursor-pointer">
              <Pencil className="w-3 h-3" />
            </button>
            <button onClick={onDelete} className="p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
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

export default function OurCarClient({ subsystems, isAdmin }: { subsystems: CarSubsystem[]; isAdmin: boolean }) {
  const { theme } = useTheme();
  const [visibleCards, setVisibleCards] = useState(new Set<number>());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const [editingSubsystem, setEditingSubsystem] = useState<CarSubsystem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

  const subsystemsWithSides = subsystems.map((s, i) => ({ ...s, side: i % 2 === 0 ? 'left' : 'right' }));

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisibleCards((prev) => new Set([...prev, index]));
        });
      }, { threshold: 0.1 });
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [subsystems]);

  const handleEdit = (subsystem: CarSubsystem) => {
    setEditingSubsystem(subsystem);
    setIsNewItem(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSubsystem(null);
    setIsNewItem(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this subsystem?")) {
      await deleteCarSubsystem(id);
    }
  };

  const handleSave = async (data: Partial<CarSubsystem>) => {
    if (isNewItem) {
      await addCarSubsystem({ ...data, order: subsystems.length + 1 } as Parameters<typeof addCarSubsystem>[0]);
    } else if (editingSubsystem) {
      await updateCarSubsystem(editingSubsystem.id, data as Parameters<typeof updateCarSubsystem>[1]);
    }
  };

  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-black' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const leftSubsystems = subsystemsWithSides.filter(s => s.side === 'left');
  const rightSubsystems = subsystemsWithSides.filter(s => s.side === 'right');

  return (
    <div className={`min-h-screen ${bg} ${text} transition-colors pt-20`}>
      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-gray-200'}`} />
        <div className="relative z-10 text-center px-6">
          <div className={`inline-block px-8 py-6 rounded-3xl border-2 max-w-3xl ${isDark ? 'border-white/30' : ''}`} style={!isDark ? { borderColor: '#48B4FF' } : undefined}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome to F2025</h2>
            <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Introducing the F2025, our latest Formula SAE electric vehicle, built through collaboration, innovation, and cutting-edge engineering.</p>
          </div>
          <div className="mt-16"><ScrollChevrons theme={theme} /></div>
        </div>
      </section>

      <section className="py-24 px-4">
        {isAdmin && (
          <div className="flex justify-center mb-8">
            <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors cursor-pointer">
              <Plus className="w-5 h-5" /> Add Subsystem
            </button>
          </div>
        )}
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {leftSubsystems.map((subsystem) => {
                const index = subsystemsWithSides.findIndex(s => s.id === subsystem.id);
                return (
                  <div key={subsystem.id} ref={el => { cardRefs.current[index] = el; }}>
                    <SubsystemCard data={subsystem} theme={theme} visible={visibleCards.has(index)} isAdmin={isAdmin} onEdit={() => handleEdit(subsystem)} onDelete={() => handleDelete(subsystem.id)} />
                  </div>
                );
              })}
            </div>
            <div className="hidden lg:flex col-span-4 items-start justify-center">
              <div className="sticky top-32 w-full max-w-[500px]"><CarImage theme={theme} /></div>
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {rightSubsystems.map((subsystem) => {
                const index = subsystemsWithSides.findIndex(s => s.id === subsystem.id);
                return (
                  <div key={subsystem.id} ref={el => { cardRefs.current[index] = el; }}>
                    <SubsystemCard data={subsystem} theme={theme} visible={visibleCards.has(index)} isAdmin={isAdmin} onEdit={() => handleEdit(subsystem)} onDelete={() => handleDelete(subsystem.id)} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-16"><ScrollChevrons theme={theme} /></div>
      </section>

      <EditModal
        subsystem={editingSubsystem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        isNew={isNewItem}
        nextOrder={subsystems.length + 1}
      />
    </div>
  );
}
