"use client";

import { useState, useEffect } from "react";
import { ImagePlus, Upload, ArrowLeft, Loader2, Search, Check } from "lucide-react";
import { listImagesInBucket, uploadToBucket } from "@/app/actions/storage";

const inputClass =
  "w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50 transition-colors";
const labelClass = "block text-sm font-medium text-white/70 mb-1.5";

interface SponsorLogoPickerProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  /** Storage bucket name (e.g. "Sponsors" or "History") */
  bucket?: string;
  /** Field label (e.g. "Logo" or "Image") */
  label?: string;
}

export default function SponsorLogoPicker({
  value,
  onChange,
  disabled,
  bucket = "Sponsors",
  label = "Logo",
}: SponsorLogoPickerProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState<{ path: string; publicUrl: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const safeDecode = (s: string) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  };
  const filteredImages = searchQuery.trim()
    ? images.filter(({ path }) =>
        safeDecode(path).toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : images;

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    const result = await listImagesInBucket(bucket);
    setLoading(false);
    if ("error" in result) {
      setError(result.error);
      setImages([]);
      return;
    }
    setImages(result);
  };

  useEffect(() => {
    if (pickerOpen) {
      loadImages();
      setSearchQuery("");
    }
  }, [pickerOpen, bucket]);

  const handleSelect = (publicUrl: string) => {
    onChange(publicUrl);
    setPickerOpen(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadToBucket(bucket, formData);
    setUploading(false);
    e.target.value = "";
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setImages((prev) => [...prev, { path: result.publicUrl.split("/").pop() || "", publicUrl: result.publicUrl }]);
    handleSelect(result.publicUrl);
  };

  const closePicker = () => setPickerOpen(false);

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL or choose from storage"
          className={inputClass}
          required
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          disabled={disabled}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-orange-500/80 hover:bg-orange-500 text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          title="Choose from storage or upload"
        >
          <ImagePlus className="w-5 h-5" />
          Choose
        </button>
      </div>

      {pickerOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-gray-900">
          {/* Header: Back + title - fixed */}
          <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gray-900">
            <button
              type="button"
              onClick={closePicker}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <h2 className="text-lg font-semibold text-white">Choose {label.toLowerCase()}</h2>
          </header>

          {/* Toolbar: Search + Upload - fixed */}
          <div className="shrink-0 px-4 py-3 border-b border-white/10 bg-gray-900 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by file name…"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50 transition-colors text-base"
              />
            </div>
            <label className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition-colors shrink-0 font-medium">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              {uploading ? "Uploading…" : `Upload ${label.toLowerCase()}`}
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Scrollable area - only logos scroll */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="p-4">
              {error && (
                <p className="text-red-400 text-sm mb-4 p-3 rounded-xl bg-red-500/10">
                  {error}
                  {error.includes("Bucket") || error.includes("not found")
                    ? ` Ensure the '${bucket}' bucket exists in Supabase Dashboard → Storage.`
                    : ""}
                </p>
              )}
              {loading ? (
                <div className="flex items-center justify-center py-20 text-white/60">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </div>
              ) : images.length === 0 && !error ? (
                <p className="text-white/60 text-center py-16 text-base">
                  No images in storage yet. Use &quot;Upload image&quot; above to add one.
                </p>
              ) : filteredImages.length === 0 ? (
                <p className="text-white/60 text-center py-16 text-base">
                  No files match &quot;{searchQuery.trim()}&quot;.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredImages.map(({ path, publicUrl }) => (
                    <button
                      type="button"
                      key={publicUrl}
                      onClick={() => handleSelect(publicUrl)}
                      className="rounded-2xl border-2 border-white/15 hover:border-orange-500 bg-white/5 hover:bg-white/10 overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="aspect-square flex items-center justify-center p-3 bg-white/5">
                        <img
                          src={publicUrl}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className="px-3 py-2 text-sm text-white/80 truncate text-center border-t border-white/10"
                        title={safeDecode(path)}
                      >
                        {safeDecode(path)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* Footer: Done - fixed */}
          <footer className="shrink-0 p-4 border-t border-white/10 bg-gray-900">
            <button
              type="button"
              onClick={closePicker}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Check className="w-5 h-5" />
              Done
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
