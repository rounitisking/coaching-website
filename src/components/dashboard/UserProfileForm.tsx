"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Camera, AlertCircle, CheckCircle2 } from "lucide-react";
import { updateProfile } from "@/actions/auth";
import { uploadToStorage } from "@/actions/uploads";
import Image from "next/image";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number").optional().or(z.literal("")),
});

type ProfileInputs = z.infer<typeof profileSchema>;

interface UserProfileFormProps {
  initialUser: {
    name: string | null;
    email: string;
    phone: string | null;
    image: string | null;
  };
}

export function UserProfileForm({ initialUser }: UserProfileFormProps) {
  const [avatar, setAvatar] = useState<string | null>(initialUser.image);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialUser.name || "",
      phone: initialUser.phone || "",
    },
  });

  // Base64 helper
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (err) => reject(err);
    });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Avatar image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const base64Data = await toBase64(file);
      const res = await uploadToStorage("profile-images", file.name, base64Data, file.type);
      
      if ("error" in res) {
        setError(res.error);
      } else {
        setAvatar(res.url);
        // Save URL immediately in user record
        const updateRes = await updateProfile({ image: res.url });
        if (updateRes.error) {
          setError(updateRes.error);
        } else {
          setSuccess("Avatar updated successfully!");
        }
      }
    } catch (err: any) {
      setError("Failed to upload avatar image");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: ProfileInputs) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const res = await updateProfile({
        name: data.name,
        phone: data.phone || "",
      });
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess("Profile settings saved successfully!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg text-sm bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 rounded-lg text-sm bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={16} /> {success}
        </div>
      )}

      {/* Avatar upload */}
      <div className="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          {avatar ? (
            <Image
              src={avatar}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          ) : (
            <span className="text-3xl font-black text-slate-400">
              {initialUser.name?.charAt(0) || "U"}
            </span>
          )}
          
          {(isUploading || isPending) && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="animate-spin text-white" size={20} />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Avatar Image</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Supports JPG, PNG or WebP. Max size of 5MB.</p>
          <div className="pt-2">
            <label className="btn-secondary btn-sm cursor-pointer inline-flex items-center gap-1.5">
              <Camera size={14} />
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={isUploading || isPending}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Name</label>
          <input
            type="text"
            className="input"
            placeholder="John Doe"
            {...register("name")}
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="label">Email Address (Read-only)</label>
          <input
            type="email"
            className="input opacity-65 cursor-not-allowed bg-slate-50 dark:bg-slate-900"
            value={initialUser.email}
            disabled
          />
        </div>

        <div>
          <label className="label">Phone Number</label>
          <input
            type="tel"
            className="input"
            placeholder="+919876543210"
            {...register("phone")}
            disabled={isPending}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || isUploading}
        className="btn-primary h-11 text-sm rounded-xl px-6"
      >
        {isPending ? (
          <><Loader2 size={16} className="animate-spin" /> Saving Changes…</>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
}
