'use client';

import "./card.css";
import ApplicationCardForTeams from "@/components/ApplicationCardForTeams";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from '../../components/ThemeProvider';
import { FaLinkedin } from 'react-icons/fa';
import { addMember, updateMember, deleteMember } from "../actions/team";
import { Pencil, Plus, Trash2, X, Save } from "lucide-react";
// import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";
import SponsorLogoPicker from "@/components/SponsorLogoPicker";

let defaultText = "";

type Member = {
  id: number;
  Name: string;
  Department: string;
  Headshot: string;
  LinkedIn: string | undefined;
  Role: string;
  // add other fields you use
};

interface EditModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Member>) => Promise<void>;
  isNew?: boolean;
  departmentOptions: string[];
  initialDepartment?: string;
};

const memberRank: Record<string, number> = {
  "Lead": 0,
  "Co-Lead": 1,
  "Advisor": 2,
  "Tech Lead": 3,
  "Member": 4,
};

function EditModal({ member, isOpen, onClose, onSave, isNew, departmentOptions, initialDepartment }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: member?.Name || "",
    department: member?.Department || initialDepartment || departmentOptions[0] || "",
    headshot: member?.Headshot || "",
    linkedin: member?.LinkedIn || "",
    role: member?.Role || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.Name,
        department: member.Department,
        headshot: member.Headshot || "",
        linkedin: member.LinkedIn || "",
        role: member.Role || "",
      });
    } else {
      setFormData({
        name: "",
        department: initialDepartment || departmentOptions[0] || "",
        headshot: "",
        linkedin: "",
        role: "",
      });
    }
  }, [member, initialDepartment, departmentOptions]);

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
      Name: formData.name,
      Department: formData.department,
      Headshot: formData.headshot,
      LinkedIn: formData.linkedin || undefined,
      Role: formData.role,
      // order: nextOrder || sponsor?.order || 0,
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
            {isNew ? "Add Member" : "Edit Member"}
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
          <div>
            <label className={labelClass}>Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className={inputClass + " cursor-pointer"}
              required
            >
              {departmentOptions.map((name) => (
                <option key={name} value={name} className="bg-gray-900 text-white">
                  {name}
                </option>
              ))}
            </select>
          </div>
          <SponsorLogoPicker
            value={formData.headshot}
            onChange={(url) => setFormData({ ...formData, headshot: url })}
            bucket="MemberPhotos"
            label="Headshot (optional)"
            required={false}
          />
          <div>
            <label className={labelClass}>LinkedIn (optional)</label>
            <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="https://example.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Role</label>
            <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="https://example.com" className={inputClass} />
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

type TeamDepartment = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export default function TeamPage({
  members,
  isAdmin,
  departments,
}: {
  members: Member[];
  isAdmin: Boolean;
  departments: TeamDepartment[];
}) {
  console.log("Members:", members);
  const [bottomText, setBottomText] = useState(defaultText);
  const [department, setDepartment] = useState(0);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const departmentOptions = Array.from(
    new Set((departments ?? []).map((d) => d.name))
  );

  const grouped = members.reduce<Record<string, Member[]>>((acc, m) => {
    const dept = m.Department ?? "Other";
    (acc[dept] ??= []).push(m);
    return acc;
  }, {});
  
  Object.keys(grouped).forEach((dept) => {
    grouped[dept].sort((a, b) => {
      const roleDiff =
      (memberRank[a.Role] ?? 999) -
      (memberRank[b.Role] ?? 999);

    if (roleDiff !== 0) {
      return roleDiff;
    }

    return a.Name.localeCompare(b.Name);
    });
  });

  const handleEdit = (member: Member) => {
      setEditingMember(member);
      setIsNewItem(false);
      setIsModalOpen(true);
    };
  
    const handleAdd = (department: string) => {
      setEditingMember(null);
      setSelectedDepartment(department);
      setIsNewItem(true);
      setIsModalOpen(true);
    };
  
    const handleDelete = async (id: number) => {
      if (confirm("Are you sure you want to delete this member?")) {
        await deleteMember(id);
      }
    };
  
    const handleSave = async (data: Partial<Member>) => {
      if (isNewItem) {
        await addMember({
          ...data,
          department: selectedDepartment,
        } as Parameters<typeof addMember>[0]);
      } else if (editingMember) {
        const result = await updateMember(editingMember.id, data as Parameters<typeof updateMember>[1]);
        console.log("Update result:", result);
      }
    };
  

  const list = departments.map((dept) => {
    const teamName = dept.name;
    return (
      <ApplicationCardForTeams
        name={dept.name}
        href={teamName}
        imageSrc={dept.image}
        key={dept.id}
        onHover={() => {
          setBottomText(dept.description)
        }}
        onLeave={() => {
          setBottomText(defaultText)
        }}
      />
    );
  });

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[rgb(34,34,34)]' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const accentColor = isDark ? 'orange' : '[#48B4FF]';
  const inputStyleDark =
    "w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500";
  const inputStyleLight =
    "w-full px-4 py-2 rounded-md bg-neutral-200 border border-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500";


  if (!departments.length) return <p>No departments found.</p>;

  return (
    <>
        <div
          className="min-h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/home-crew.png')" }}
        >
          <div className="pt-10 bg-black/50 min-h-screen">
            <div className="flex justify-center items-center min-h-screen">
              <div className="mt-[-150] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {list}
              </div>
            </div>
          </div>
        </div>
        
      <div className={`${bg} ${theme}`}>
      
        {departmentOptions.map((dept) => {
          const deptMembers = grouped[dept] ?? [];
          if (deptMembers.length === 0) return null;

          return (
            <section key={dept} id={dept} className="flex flex-col items-center">
              <div className="flex items-center gap-3">
                    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold my-4`}>{dept}</h2>
                    {isAdmin && (
                      <button
                        onClick={() => handleAdd(dept)}
                        className="p-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors cursor-pointer"
                        title={`Add ${dept} Member`}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
              <div className="flex flex-row flex-wrap gap-6 justify-center">
                {deptMembers.map((m, index) => (
                  <div key={index} className="flex flex-col items-center card-container relative">
                    <div className="card">
                      <div className={`group card-front flex flex-col items-center justify-center ${isDark ? "bg-linear-to-tl from-black to-neutral-800" : "bg-linear-to-tl from-neutral-300 to-white"}`}>
                        <div className={`w-30 h-30 rounded-full border-4 border-${isDark ? 'orange-500' : '[#48B4FF]'} overflow-hidden relative flex items-center justify-center bg-black`}>
                          
                          {m.Headshot ? 
                          (
                            <Image
                              src={`${m.Headshot}?width=200&height=200&resize=cover`}
                              alt={m.Name}
                              fill
                              sizes="200px"
                              className="w-full h-full object-cover"
                              priority={false}
                            />
                          ) : (
                            <div className="w-full h-full bg-black rounded-full" />
                          )}

                        </div>

                        <p className={`${isDark ? "text-white" : "text-black"} font-bold text-lg text-center mx-5 mt-2`}>
                          {m.Name}
                        </p>
                        <p className={`${isDark ? "text-white" : "text-black"} font-bold text-md text-center mx-5`}>{m.Role}</p>
                      </div>
                      <div className="relative card-back flex flex-col items-center justify-center">
                        <a href={m.LinkedIn} className="underline">
                          <FaLinkedin className="linkedin-icon" color="white" />
                        </a>
                        <p>{m.Name}</p>
                      </div>
                    </div>
                    {isAdmin && (
                          <div className="absolute top-full mt-2 z-30 flex gap-1 opacity-100">
                            <button
                              onClick={() => handleEdit(m)}
                              className="p-1.5 bg-orange-500/80 hover:bg-orange-500 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(m.id)}
                              className="p-1.5 z-20 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                  </div> 
                ))}
              </div>
            </section>
          );
        })}
        {/* Edit Modal */}
      <EditModal
        member={editingMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        isNew={isNewItem}
        departmentOptions={departmentOptions}
        initialDepartment={isNewItem ? selectedDepartment : editingMember?.Department}
      />
      </div>
    </>
  );
}
















{/* Original Rendering (Pre SupaBase) */}
        {/* {data.map((teamObj, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 id={teamObj.team} className={`${teamObj.team} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-2 md:my-3 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{`${teamObj.team} Team`}</h3>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {teamObj["team-members"].map((member, index) => (
                <div key={index} className="flex flex-col items-start card-container">
                  <div className="card">
                    <div className="card-front flex flex-col items-center justify-center bg-linear-to-tl from-black to-neutral-800">
                      <div className={`w-30 h-30 rounded-full border-4 border-${isDark ? 'orange-500' : '[#48B4FF]'} overflow-hidden relative flex items-center justify-center bg-black`}>
                        
                        {member["image-name"] ? (
                          <Image
                            src={member["image-name"]}
                            alt={member.name}
                            fill
                            sizes="200px"
                            className="w-full h-full object-cover"
                            priority={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-black rounded-full" />
                        )}

                      </div>

                      <p className="text-white font-bold text-lg text-center mx-5">
                        {member["name"]}
                      </p>
                      <p className="text-white">{member["role"]}</p>
                    </div>
                    <div className="card-back flex flex-col items-center justify-center">
                      <a href={member["linkedin-link"]} className="underline">
                        <FaLinkedin className="linkedin-icon" color="white" />
                      </a>
                      <p>{member["name"]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))} */}