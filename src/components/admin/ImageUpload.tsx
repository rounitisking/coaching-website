"use client";

import { useState } from "react";
import { Camera, Loader2, Link as LinkIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadToStorage } from "@/actions/uploads";
import { BucketName } from "@/lib/supabase";
import Image from "next/image";

interface ImageUploadProps {
  bucket: BucketName;
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ bucket, value, onChange, label = "Image Asset" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = (err) => reject(err);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setError("File exceeds 8MB size limit");
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const base64Data = await toBase64(file);
      const res = await uploadToStorage(bucket, file.name, base64Data, file.type);
      if ("error" in res) {
        setError(res.error);
      } else {
        onChange(res.url);
        setUrlInput(res.url);
        setSuccess("Uploaded successfully!");
      }
    } catch (err: any) {
      setError("Failed to upload image file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(urlInput);
    setSuccess("URL applied!");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="label mb-0">{label}</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
              mode === "upload"
                ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400"
                : "border-slate-200 dark:border-slate-800 text-slate-500"
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
              mode === "url"
                ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400"
                : "border-slate-200 dark:border-slate-800 text-slate-500"
            }`}
          >
            Pasted URL
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
      {success && (
        <p className="text-xs text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
          <CheckCircle2 size={12} /> {success}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20">
        {/* Preview image */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden border bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
          {value ? (
            <Image src={value} alt="Preview" fill className="object-cover" sizes="80px" />
          ) : (
            <Camera size={24} className="text-slate-400" />
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="animate-spin text-white" size={16} />
            </div>
          )}
        </div>

        <div className="flex-1 w-full">
          {mode === "upload" ? (
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">JPG, PNG or WebP. Max size 8MB.</p>
              <label className="btn-secondary btn-sm cursor-pointer inline-flex items-center gap-1.5 w-full justify-center">
                <Camera size={14} /> Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          ) : (
            <form onSubmit={handleUrlSubmit} className="flex gap-2 w-full">
              <input
                type="url"
                className="input py-1.5 px-3 flex-1 text-xs"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button type="submit" className="btn-primary btn-sm rounded-lg flex items-center gap-1">
                <LinkIcon size={12} /> Apply
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
