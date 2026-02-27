'use client';

import { useState, useEffect } from "react";
import ApplicationCard from "@/components/ApplicationCard";
import ContactForm from "@/components/ContactForm";
import { Pencil, Plus, Trash2, X, Save } from "lucide-react";
import { updateDepartment, addDepartment, deleteDepartment } from "@/app/actions/departments";
import type { Department } from "./page";
import SponsorLogoPicker from "@/components/SponsorLogoPicker";

interface EditModalProps {
  department: Department | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Department>) => Promise<void>;
  isNew?: boolean;
  nextOrder?: number;
}

function EditModal({ department, isOpen, onClose, onSave, isNew, nextOrder }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: department?.name || "",
    description: department?.description || "",
    image: department?.image || "",
    link: department?.link || "",
  });
  const [saving, setSaving] = useState(false);

  // Keep form in sync when switching between Add and Edit or changing department
  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        image: department.image,
        link: department.link || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        image: "",
        link: "",
      });
    }
  }, [department, isNew]);

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
      description: formData.description,
      image: formData.image,
      link: formData.link || null,
      order: nextOrder || department?.order || 0,
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
            {isNew ? "Add Department" : "Edit Department"}
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
            <label className={labelClass}>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className={inputClass} required />
          </div>
          <SponsorLogoPicker
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            bucket="Departments"
            label="Image"
            required={true}
          />
          <div>
            <label className={labelClass}>Application Link (optional)</label>
            <input type="url" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="https://linktr.ee/ontariotechracing" className={inputClass} />
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

export default function JoinUsClient({ departments, isAdmin }: { departments: Department[]; isAdmin: boolean }) {
  const defaultText = "At Ontario Tech Racing, students have the opportunity to gain valuable EV motorsport experiences with hands-on work in the mechanical, electrical, or business realms. Apply today!";

  const [text, setText] = useState(defaultText);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

  const handleEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setIsNewItem(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingDepartment(null);
    setIsNewItem(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this department?")) {
      await deleteDepartment(id);
    }
  };

  const handleSave = async (data: Partial<Department>) => {
    if (isNewItem) {
      await addDepartment({
        ...data,
        order: departments.length + 1,
      } as Parameters<typeof addDepartment>[0]);
    } else if (editingDepartment) {
      await updateDepartment(editingDepartment.id, data as Parameters<typeof updateDepartment>[1]);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/join-us/backgroundPic.png')" }}
    >
      <div className="pt-10 bg-black/50 min-h-screen">
        <div className="mt-5">
          <h2 className="text-2xl font-bold flex justify-center text-white">Apply to a Department</h2>
          <hr className="w-[50%] mx-auto border-t-2 mt-2 border-white/30"></hr>

          {isAdmin && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Department
              </button>
            </div>
          )}
        </div>

        <div
          className="flex flex-col items-center"
          onMouseLeave={() => {
            setText(defaultText);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5 justify-items-center">
            {departments.map((dept) => (
              <div key={dept.id} className="relative">
                <ApplicationCard
                  name={dept.name}
                  href={dept.link || "#"}
                  imageSrc={dept.image || "/join-us/placeholder.png"}
                  onHover={() => {
                    setText(dept.description);
                  }}
                  onLeave={() => {}}
                />
                {/* On mobile, show description under each card since hover isn't available */}
                <p className="mt-2 text-xs text-white text-center px-2 md:hidden">
                  {dept.description}
                </p>
                {isAdmin && (
                  <div className="absolute top-0 right-0 flex gap-1 opacity-100 z-20">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEdit(dept);
                      }}
                      className="p-1.5 bg-orange-500/90 hover:bg-orange-500 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(dept.id);
                      }}
                      className="p-1.5 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:block text-center mt-10 text-3xl mb-16 text-white max-w-4xl px-4">
            <div
              key={text}
              className="opacity-0 translate-y-2 animate-[fadeInUp_300ms_ease-out_forwards]"
            >
              {text}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>

      <EditModal
        department={editingDepartment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        isNew={isNewItem}
        nextOrder={departments.length + 1}
      />
    </div>
  );
}
