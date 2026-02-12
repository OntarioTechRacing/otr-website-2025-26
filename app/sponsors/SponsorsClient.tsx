"use client";


type SponsorTier = 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'general';
import { useState, useEffect } from "react";
import SponsorCard from "@/components/SponsorCard";
import ContactForm from "@/components/ContactForm";
import { useTheme } from "@/components/ThemeProvider";
import { Pencil, Plus, Trash2, X, Save } from "lucide-react";
import { updateSponsor, addSponsor, deleteSponsor } from "@/app/actions/sponsors";
import SponsorLogoPicker from "@/components/SponsorLogoPicker";
import type { Sponsor } from "./page";

const tierConfig: Record<string, { color: string; textColor: string }> = {
  diamond: { color: "#0078ca", textColor: "text-[#0078ca]" },
  platinum: { color: "#E5E4E2", textColor: "text-[#E5E4E2]" },
  gold: { color: "#FFD700", textColor: "text-[#FFD700]" },
  silver: { color: "#C0C0C0", textColor: "text-[#C0C0C0]" },
  bronze: { color: "#CD7F32", textColor: "text-[#CD7F32]" },
  general: { color: "#6B7280", textColor: "text-gray-400" },
};

const tierOrder = ["diamond", "platinum", "gold", "silver", "bronze", "general"];

interface EditModalProps {
  sponsor: Sponsor | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Sponsor>) => Promise<void>;
  isNew?: boolean;
  nextOrder?: number;
}

const emptyForm = {
  name: "",
  logo: "",
  url: "",
  tier: "bronze" as SponsorTier,
};

function EditModal({ sponsor, isOpen, onClose, onSave, isNew, nextOrder }: EditModalProps) {
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Reset form whenever the modal opens: empty for Add, filled for Edit
  useEffect(() => {
    if (!isOpen) return;
    if (sponsor) {
      setFormData({
        name: sponsor.name,
        logo: sponsor.logo,
        url: sponsor.url || "",
        tier: sponsor.tier as SponsorTier,
      });
    } else {
      setFormData({ ...emptyForm });
    }
  }, [isOpen, sponsor]);

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
      name: formData.name,
      logo: formData.logo,
      url: formData.url || null,
      tier: formData.tier,
      order: nextOrder || sponsor?.order || 0,
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
            {isNew ? "Add Sponsor" : "Edit Sponsor"}
          </h2>
          <button type="button" onClick={onClose} className="p-2 -m-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} required />
          </div>
          <SponsorLogoPicker
            value={formData.logo}
            onChange={(url) => setFormData({ ...formData, logo: url })}
          />
          <div>
            <label className={labelClass}>Website URL (optional)</label>
            <input type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://example.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tier</label>
            <select value={formData.tier} onChange={(e) => setFormData({ ...formData, tier: e.target.value as SponsorTier})} className={inputClass + " cursor-pointer"}>
              {tierOrder.map((tier) => (
                <option key={tier} value={tier} className="bg-gray-900 text-white">
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </option>
              ))}
            </select>
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

export default function SponsorsClient({ sponsors, isAdmin }: { sponsors: Sponsor[]; isAdmin: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("bronze");

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sponsorsByTier = tierOrder.reduce((acc, tier) => {
    acc[tier] = sponsors.filter(s => s.tier.toLowerCase() === tier);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setIsNewItem(false);
    setIsModalOpen(true);
  };

  const handleAdd = (tier: string) => {
    setEditingSponsor(null);
    setSelectedTier(tier);
    setIsNewItem(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this sponsor?")) {
      await deleteSponsor(id);
    }
  };

  const handleSave = async (data: Partial<Sponsor>) => {
    if (isNewItem) {
      const tierSponsors = sponsorsByTier[selectedTier] || [];
      await addSponsor({
        ...data,
        tier: selectedTier,
        order: tierSponsors.length + 1,
      } as Parameters<typeof addSponsor>[0]);
    } else if (editingSponsor) {
      await updateSponsor(editingSponsor.id, data as Parameters<typeof updateSponsor>[1]);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-[rgb(34,34,34)] via-[rgb(28,28,30)] to-[rgb(18,18,20)]' : 'bg-gradient-to-br from-gray-300 via-gray-200 to-slate-100'}`}>
      {/* Hero Section */}
      <div className="relative md:py-24 px-4 md:px-8">
        <div className={`max-w-4xl mx-auto text-center pt-8 md:pt-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className={`text-sm md:text-base font-bold mb-3 tracking-widest uppercase ${isDark ? 'text-orange-500' : 'text-[#48B4FF]'}`}>Ontario Tech Racing</p>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Sponsors & Donors
          </h1>
          <div className={`w-24 md:w-32 h-1 mb-6 md:mb-8 mx-auto rounded-full ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8]'}`}></div>
          <p className={`text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Sponsoring Ontario Tech Racing means supporting the next generation of engineers and innovators. Your support directly contributes to real-world learning experiences and cutting-edge automotive technology for our 70 Engineering and Business students.
          </p>
          <p className={`text-sm md:text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Want to join us? Email us at{" "}
            <a className={`font-semibold transition-colors underline ${isDark ? 'text-orange-500 hover:text-orange-400' : 'text-[#48B4FF] hover:text-[#3AA0E8]'}`} href="mailto:motorsports@ontariotechu.net">
              motorsports@ontariotechu.net
            </a>
          </p>
          <button
            onClick={scrollToContact}
            className={`px-8 py-3 cursor-pointer rounded-full text-base md:text-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 shadow-lg hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25'
                : 'bg-gradient-to-r from-[#48B4FF] to-[#3AA0E8] text-white hover:from-[#3AA0E8] hover:to-[#2E90D8] hover:shadow-[#48B4FF]/25'
            }`}
          >
            <span>Become a Sponsor</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sponsor Tiers */}
      <div className={`px-4 md:px-8 pb-16 md:pb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">

          {tierOrder.map((tier) => {
            const tierSponsors = sponsorsByTier[tier];
            const config = tierConfig[tier];
            const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);

            const gapClass = tier === "diamond" || tier === "platinum"
              ? "gap-6 md:gap-8"
              : tier === "gold" || tier === "silver"
                ? "gap-5 md:gap-6"
                : "gap-4 md:gap-5";

            return (
              <section key={tier} className="relative">
                <div className="flex items-center justify-center gap-4 mb-8 md:mb-10 mt-6 md:mt-0">
                  <div
                    className="h-px flex-1 max-w-[100px]"
                    style={{ background: `linear-gradient(to right, transparent, ${config.color})` }}
                  ></div>
                  <div className="flex items-center gap-3">
                    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${config.textColor}`}>{tierName}</h2>
                    {isAdmin && (
                      <button
                        onClick={() => handleAdd(tier)}
                        className="p-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors cursor-pointer"
                        title={`Add ${tierName} Sponsor`}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div
                    className="h-px flex-1 max-w-[100px]"
                    style={{ background: `linear-gradient(to left, transparent, ${config.color})` }}
                  ></div>
                </div>
                <div className={`flex flex-wrap justify-center ${gapClass}`}>
                  {tierSponsors && tierSponsors.length > 0 ? (
                    tierSponsors.map((sponsor) => (
                      <div key={sponsor.id} className="relative group">
                        <SponsorCard
                          logo={sponsor.logo}
                          name={sponsor.name}
                          tier={sponsor.tier.toLowerCase() as SponsorTier}
                          url={sponsor.url || undefined}
                        />
                        {isAdmin && (
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(sponsor)}
                              className="p-1.5 bg-orange-500/80 hover:bg-orange-500 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(sponsor.id)}
                              className="p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      No sponsors in this tier yet
                    </p>
                  )}
                </div>
              </section>
            );
          })}

        </div>
      </div>

      {/* Contact Form Section */}
      <div className={`px-4 md:px-8 pb-16 md:pb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        sponsor={editingSponsor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        isNew={isNewItem}
      />
    </div>
  );
}
