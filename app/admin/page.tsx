"use client";
import React, { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type Section = "profile" | "settings";

type ProfileData = {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
};

type SettingsData = {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  publicProfile: boolean;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const SANS_FONT = { 
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        autoComplete="off"
        style={SANS_FONT}
        className="peer h-12 w-full border-b-2 border-black/10 bg-transparent text-black placeholder-transparent focus:border-black focus:outline-none transition-colors font-bold uppercase tracking-tight"
      />
      <label
        style={SANS_FONT}
        className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase tracking-[0.2em] font-black transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-black/20 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-black"
      >
        {label}
      </label>
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        rows={rows}
        style={SANS_FONT}
        className="peer w-full border-b-2 border-black/10 bg-transparent text-sm text-black placeholder-transparent focus:border-black focus:outline-none transition resize-none font-bold uppercase tracking-tight"
      />
      <label
        style={SANS_FONT}
        className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase tracking-[0.2em] font-black transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-black/20 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-black"
      >
        {label}
      </label>
    </div>
  );
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center gap-4 pt-4 pb-10">
      <button
        type="button"
        onClick={onSave}
        style={SANS_FONT}
        className="bg-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#C3F380] transition-all hover:opacity-80 active:scale-95"
      >
        Save changes
      </button>
      {saved && (
        <span style={SANS_FONT} className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-bold italic">
          Saved.
        </span>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminUserPage() {
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [savedSection, setSavedSection] = useState<Section | null>(null);
  
  const bgColor = '#C3F380'; 

  const [profile, setProfile] = useState<ProfileData>({
    firstName: "LISA",
    lastName: "MARIE",
    username: "avermaet_admin",
    bio: "Visualizing complex systems.",
    email: "lisa@studio-avermaet.com",
    phone: "",
    location: "ANTWERP",
    avatar: "",
  });

  const [settings, setSettings] = useState<SettingsData>({
    language: "English",
    timezone: "Europe/Brussels",
    emailNotifications: true,
    publicProfile: true,
  });

  function markSaved() {
    setSavedSection(activeSection);
    setTimeout(() => setSavedSection(null), 2000);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string")
        setProfile((p) => ({ ...p, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  const navItems = [
    { key: "profile" as Section, label: "Profile" },
    { key: "settings" as Section, label: "Settings" },
  ];

  return (
    <div className="min-h-screen pt-10 md:pt-20" style={{ ...SANS_FONT, backgroundColor: bgColor }}>
      {/* Container: flex-col op mobiel, flex-row op desktop */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)]">
        
        {/* ── Sidebar / Top Nav ── */}
        <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-black/10 bg-transparent px-3 md:px-0 py-4 md:py-10">
          <p className="hidden md:block px-8 mb-8 text-[10px] uppercase tracking-[0.3em] font-black text-black/20">
            Navigation
          </p>
          <nav className="flex flex-row md:flex-col overflow-x-auto no-scrollbar">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-4 md:px-8 py-3 md:py-4 text-left text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeSection === key
                    ? "text-black border-b-2 md:border-b-0 md:border-r-4 border-black"
                    : "text-black/30 hover:text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Main area: px-3 op mobiel, px-12 op desktop ── */}
        <main className="flex-1 px-3 md:px-12 py-10 max-w-4xl overflow-x-hidden">

          {/* ── PROFILE ── */}
          {activeSection === "profile" && (
            <section className="animate-in fade-in duration-500">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2 text-black">Profile</h1>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-10 md:mb-12">User_Identity_Node</p>

              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-12">
                <div className="shrink-0">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-20 h-20 md:w-24 md:h-24 object-cover grayscale border border-black/10" />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-black/5 border border-black/10 flex items-center justify-center text-black/20 text-[10px] font-black uppercase">No_Img</div>
                  )}
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Profile photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="block text-[9px] md:text-[10px] font-black uppercase text-black file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-[#C3F380] file:cursor-pointer hover:file:opacity-80 w-full"
                  />
                  {profile.avatar && (
                    <button
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, avatar: "" }))}
                      className="text-[10px] uppercase tracking-[0.14em] text-black/40 hover:text-black transition-colors text-left font-black"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 mb-8">
                <Field label="First name" name="firstName" value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} />
                <Field label="Last name" name="lastName" value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} />
                <Field label="Username" name="username" value={profile.username} onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))} />
                <Field label="Email" name="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} type="email" />
                <Field label="Phone" name="phone" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
                <Field label="Location" name="location" value={profile.location} onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))} />
              </div>

              <div className="mb-12">
                <TextAreaField label="Biography" name="bio" value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} />
              </div>

              <SaveBar onSave={markSaved} saved={savedSection === "profile"} />
            </section>
          )}

          {/* ── SETTINGS ── */}
          {activeSection === "settings" && (
            <section className="animate-in fade-in duration-500">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2 text-black">Settings</h1>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-10 md:mb-12">System_Configuration</p>

              <div className="flex flex-col gap-10 mb-12">
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings((s) => ({ ...s, language: e.target.value }))}
                    className="w-full border-b-2 border-black/10 bg-transparent py-2 text-sm font-bold uppercase text-black focus:border-black focus:outline-none appearance-none cursor-pointer"
                  >
                    <option className="bg-[#C3F380]">English</option>
                    <option className="bg-[#C3F380]">Nederlands</option>
                    <option className="bg-[#C3F380]">Français</option>
                    <option className="bg-[#C3F380]">Deutsch</option>
                  </select>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Preferences</p>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings((s) => ({ ...s, emailNotifications: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-black text-black/60 transition-colors">Email notifications</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={settings.publicProfile}
                      onChange={(e) => setSettings((s) => ({ ...s, publicProfile: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-black text-black/60 transition-colors">Public profile</span>
                  </label>
                </div>

                <div className="border-t border-black/10 pt-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-8">Security</p>
                  <div className="grid gap-10 grid-cols-1 sm:grid-cols-2">
                    <Field label="New password" name="newPassword" value="" onChange={() => {}} type="password" />
                    <Field label="Confirm password" name="confirmPassword" value="" onChange={() => {}} type="password" />
                  </div>
                </div>
              </div>

              <SaveBar onSave={markSaved} saved={savedSection === "settings"} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}