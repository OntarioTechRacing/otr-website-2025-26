"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Pencil, Plus, Trash2, X, Save } from "lucide-react";
import { updateHistoryItem, addHistoryItem, deleteHistoryItem } from "@/app/actions/history";
import type { HistoryItem } from "./page";

interface EditModalProps {
  item: HistoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<HistoryItem>) => Promise<void>;
  isNew?: boolean;
  nextOrder?: number;
}

function EditModal({ item, isOpen, onClose, onSave, isNew, nextOrder }: EditModalProps) {
  const [formData, setFormData] = useState({
    year: item?.year || new Date().getFullYear(),
    name: item?.name || "",
    nickname: item?.nickname || "",
    image: item?.image || "",
    highlight: item?.highlight || "",
    specs: item?.specs?.join("\n") || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        year: item.year,
        name: item.name,
        nickname: item.nickname || "",
        image: item.image,
        highlight: item.highlight || "",
        specs: item.specs?.join("\n") || "",
      });
    } else {
      setFormData({
        year: new Date().getFullYear(),
        name: "",
        nickname: "",
        image: "",
        highlight: "",
        specs: "",
      });
    }
  }, [item]);

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
      year: formData.year,
      name: formData.name,
      nickname: formData.nickname || null,
      image: formData.image,
      highlight: formData.highlight || null,
      specs: formData.specs.split("\n").filter(s => s.trim()),
      order: nextOrder || item?.order || 0,
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
            {isNew ? "Add New Car" : "Edit Car"}
          </h2>
          <button type="button" onClick={onClose} className="p-2 -m-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Year</label>
            <input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="OTR 24" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Nickname (optional)</label>
            <input type="text" value={formData.nickname} onChange={(e) => setFormData({ ...formData, nickname: e.target.value })} placeholder="Zippy" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Image Path</label>
            <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="/history/OTR-24.jpg" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Highlight (optional)</label>
            <input type="text" value={formData.highlight} onChange={(e) => setFormData({ ...formData, highlight: e.target.value })} placeholder="Latest Build" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Specs (one per line)</label>
            <textarea value={formData.specs} onChange={(e) => setFormData({ ...formData, specs: e.target.value })} placeholder="Motor - Emrax 208 HV&#10;Steel Tube Space Frame" rows={5} className={inputClass} />
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

function TimelineItemComponent({
  item,
  index,
  isDark,
  isAdmin,
  onEdit,
  onDelete,
}: {
  item: HistoryItem;
  index: number;
  isDark: boolean;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const displayTitle = item.nickname ? `${item.name} - "${item.nickname}"` : item.name;

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

  const AdminButtons = () => (
    <div className="flex gap-2 mt-3">
      <button
        onClick={onEdit}
        className="flex items-center gap-1 px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg text-sm transition-colors"
      >
        <Pencil className="w-3 h-3" /> Edit
      </button>
      <button
        onClick={onDelete}
        className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
      >
        <Trash2 className="w-3 h-3" /> Delete
      </button>
    </div>
  );

  return (
    <div
      ref={itemRef}
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Desktop Layout */}
      <div className={`hidden md:flex items-center ${isEven ? '' : 'flex-row-reverse'}`}>
        <div className={`w-[calc(50%-40px)] ${isEven ? 'pr-6 flex justify-end' : 'pl-6 flex justify-start'}`}>
          <div className="relative group">
            <img
              src={item.image}
              alt={displayTitle}
              className={`relative w-full max-w-sm lg:max-w-md rounded-xl border-2 shadow-2xl group-hover:scale-[1.02] transition-all duration-300 ${
                isDark ? 'border-orange-500/50 group-hover:border-orange-500' : 'border-[#48B4FF]/50 group-hover:border-[#48B4FF]'
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/history/history_pic.png";
              }}
            />
          </div>
        </div>

        <div className="w-20 flex-shrink-0 flex justify-center z-10">
          <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg border-4 ${
            isDark
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/30 border-[rgb(28,28,30)]'
              : 'bg-gradient-to-br from-[#48B4FF] to-[#3AA0E8] shadow-[#48B4FF]/30 border-white'
          }`}>
            <span className="text-white text-xs lg:text-sm font-bold">{item.year}</span>
          </div>
        </div>

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
            <h3 className={`text-xl lg:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{displayTitle}</h3>
            <ul className="space-y-2">
              {item.specs.map((spec, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className={`mt-1 ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
            {isAdmin && <AdminButtons />}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex justify-center mb-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
            isDark
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/30'
              : 'bg-gradient-to-br from-[#48B4FF] to-[#3AA0E8] shadow-[#48B4FF]/30'
          }`}>
            <span className="text-white text-sm font-bold">{item.year}</span>
          </div>
        </div>

        <div className="mb-4">
          <img
            src={item.image}
            alt={displayTitle}
            className={`w-full max-w-sm mx-auto rounded-xl border-2 shadow-xl ${
              isDark ? 'border-orange-500/50' : 'border-[#48B4FF]/50'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/history/history_pic.png";
            }}
          />
        </div>

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
          <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{displayTitle}</h3>
          <ul className="space-y-2">
            {item.specs.map((spec, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className={`mt-1 ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>•</span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
          {isAdmin && <AdminButtons />}
        </div>
      </div>
    </div>
  );
}

export default function HistoryClient({ historyData, isAdmin }: { historyData: HistoryItem[]; isAdmin: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<HistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (item: HistoryItem) => {
    setEditingItem(item);
    setIsNewItem(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsNewItem(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this car?")) {
      await deleteHistoryItem(id);
    }
  };

  const handleSave = async (data: Partial<HistoryItem>) => {
    if (isNewItem) {
      await addHistoryItem(data as Parameters<typeof addHistoryItem>[0]);
    } else if (editingItem) {
      await updateHistoryItem(editingItem.id, data as Parameters<typeof updateHistoryItem>[1]);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)]' : 'bg-gradient-to-br from-gray-300 via-gray-200 to-slate-100'}`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden transition-all duration-1000 ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent' : 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#48B4FF]/10 via-transparent to-transparent'}`}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
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

              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <p className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>17+</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Years of Racing</p>
                </div>
                <div>
                  <p className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>{historyData.length}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cars Built</p>
                </div>
                <div>
                  <p className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>4</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Electric Vehicles</p>
                </div>
              </div>
            </div>

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
        <div className="text-center mb-12 md:mb-20 px-4">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            The Timeline
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Follow our journey from combustion engines to electric powertrains
          </p>
          <div className={`w-24 h-1 mx-auto mt-6 rounded-full ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8]'}`}></div>

          {isAdmin && (
            <button
              onClick={handleAdd}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" /> Add New Car
            </button>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
            isDark
              ? 'bg-gradient-to-b from-orange-500 via-orange-500/50 to-orange-500/20'
              : 'bg-gradient-to-b from-[#48B4FF] via-[#48B4FF]/50 to-[#48B4FF]/20'
          }`}></div>

          <div className="space-y-12 md:space-y-0">
            {historyData.map((item, index) => (
              <div key={item.id} className="md:py-12">
                <TimelineItemComponent
                  item={item}
                  index={index}
                  isDark={isDark}
                  isAdmin={isAdmin}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                />
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

      {/* Edit Modal */}
      <EditModal
        item={editingItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        isNew={isNewItem}
        nextOrder={historyData.length + 1}
      />
    </div>
  );
}
