"use client";

import { useState, useTransition } from "react";
import { Loader2, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { upsertSiteSetting } from "@/actions/admin";

interface Setting {
  key: string;
  value: string;
  label?: string | null;
  group?: string | null;
}

export function AdminSettingsForm({ initialSettings }: { initialSettings: Setting[] }) {
  const getSettingVal = (key: string, def = "") => {
    return initialSettings.find((s) => s.key === key)?.value || def;
  };

  const [phone, setPhone] = useState(getSettingVal("contact_phone", "+91 98765 43210"));
  const [email, setEmail] = useState(getSettingVal("contact_email", "info@academicainstitute.in"));
  const [address, setAddress] = useState(getSettingVal("contact_address", "New Delhi, India"));
  const [whatsapp, setWhatsapp] = useState(getSettingVal("whatsapp_url", "https://wa.me/919876543210"));
  
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        await Promise.all([
          upsertSiteSetting("contact_phone", phone, "Phone Number", "Contact Info"),
          upsertSiteSetting("contact_email", email, "Email Address", "Contact Info"),
          upsertSiteSetting("contact_address", address, "Office Address", "Contact Info"),
          upsertSiteSetting("whatsapp_url", whatsapp, "WhatsApp Chat Link", "Integrations"),
        ]);
        setSuccess("All settings updated successfully!");
      } catch (err: any) {
        setError("Failed to update site settings.");
      }
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-5">
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

      <div>
        <label className="label">Contact Support Phone</label>
        <input
          type="text"
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label">Public Support Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label">Office Location Address</label>
        <textarea
          className="input h-16"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label">WhatsApp Direct Integration Link</label>
        <input
          type="url"
          className="input"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="https://wa.me/..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary h-11 text-sm rounded-xl px-6 flex items-center gap-1.5"
      >
        {isPending ? (
          <><Loader2 size={16} className="animate-spin" /> Saving…</>
        ) : (
          <><Save size={16} /> Save Settings</>
        )}
      </button>
    </form>
  );
}
