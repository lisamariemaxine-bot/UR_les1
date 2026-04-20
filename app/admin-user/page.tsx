
"use client";
import React from "react";

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

const FONT: React.CSSProperties = { fontFamily: "Georgia, Times, serif" };

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
        style={FONT}
        className="peer h-12 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-gray-900 focus:outline-none transition"
      />
      <label
        style={FONT}
        className="absolute left-0 -top-3.5 text-gray-500 text-xs uppercase tracking-[0.14em] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gray-700"
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
        style={FONT}
        className="peer w-full border-b-2 border-gray-300 bg-transparent text-sm text-gray-900 placeholder-transparent focus:border-gray-900 focus:outline-none transition resize-none"
      />
      <label
        style={FONT}
        className="absolute left-0 -top-3.5 text-gray-500 text-xs uppercase tracking-[0.14em] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gray-700"
      >
        {label}
      </label>
    </div>
  );
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <button
        type="button"
        onClick={onSave}
        style={FONT}
        className="border border-black bg-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black focus:outline-none"
      >
        Save changes
      </button>
      {saved && (
        <span style={FONT} className="text-xs text-gray-500 uppercase tracking-[0.14em]">
          Saved.
        </span>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminUserPage() {
  const [activeSection, setActiveSection] = React.useState<Section>("profile");
  const [savedSection, setSavedSection] = React.useState<Section | null>(null);

  // ── Profile state ──
  const [profile, setProfile] = React.useState<ProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
  });

  // ── Settings state ──
  const [settings, setSettings] = React.useState<SettingsData>({
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

  // ── Sidebar nav items ──
  const navItems: { key: Section; label: string; icon: React.ReactNode }[] = [
    {
      key: "profile",
      label: "Profile",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
          <path d="M4.5 20C5.6 16.9 8.5 15 12 15s6.4 1.9 7.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "settings",
      label: "Settings",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 3.6V6M12 18v2.4M20.4 12H18M6 12H3.6M17.9 6.1l-1.7 1.7M7.8 16.2l-1.7 1.7M17.9 17.9l-1.7-1.7M7.8 7.8L6.1 6.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20" style={FONT}>
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* ── Sidebar ── */}
        <aside className="w-56 shrink-0 border-r border-gray-200 bg-white px-0 py-10">
          <p className="px-6 mb-6 text-[10px] uppercase tracking-[0.28em] text-gray-400">
            Dashboard
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ key, label, icon }) => (
              <div
                key={key}
                role="button"
                tabIndex={0}
                onClick={() => setActiveSection(key)}
                onKeyDown={(e) => e.key === "Enter" && setActiveSection(key)}
                style={FONT}
                className={`flex items-center gap-3 px-6 py-3 text-left text-sm transition-colors w-full cursor-pointer select-none ${
                  activeSection === key
                    ? "bg-[#e8e8e8] text-gray-900 font-semibold border-r-2 border-gray-900"
                    : "bg-white text-gray-500 hover:text-gray-900 hover:bg-[#e8e8e8] active:bg-[#e8e8e8]"
                }`}
              >
                {icon}
                {label}
              </div>
            ))}
          </nav>


        </aside>

        {/* ── Main area ── */}
        <main className="flex-1 px-10 py-10 max-w-3xl">

          {/* ── PROFILE ── */}
          {activeSection === "profile" && (
            <section>
              <h1 className="text-2xl text-gray-900 mb-1">Profile</h1>
              <p className="text-sm text-gray-400 mb-8">Manage your personal information and account details.</p>

              {/* Avatar */}
              <div className="flex items-start gap-6 mb-10">
                <div className="shrink-0">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-24 h-24 object-cover border border-gray-200" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">No photo</div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Profile photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="block text-sm text-gray-700 file:mr-3 file:border-0 file:bg-black file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.14em] file:text-white file:cursor-pointer focus:outline-none"
                  />
                  {profile.avatar && (
                    <button
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, avatar: "" }))}
                      style={FONT}
                      className="text-[11px] uppercase tracking-[0.14em] text-gray-400 hover:text-black transition-colors text-left"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 mb-8">
                <Field label="First name" name="firstName" value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} />
                <Field label="Last name" name="lastName" value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} />
                <Field label="Username" name="username" value={profile.username} onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))} />
                <Field label="Email" name="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} type="email" />
                <Field label="Phone" name="phone" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
                <Field label="Location" name="location" value={profile.location} onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))} />
              </div>

              <SaveBar onSave={markSaved} saved={savedSection === "profile"} />
            </section>
          )}

          {/* ── SETTINGS ── */}
          {activeSection === "settings" && (
            <section>
              <h1 className="text-2xl text-gray-900 mb-1">Settings</h1>
              <p className="text-sm text-gray-400 mb-8">Configure your account and site preferences.</p>

              <div className="flex flex-col gap-8 mb-8">
                <div className="relative">
                  <label style={FONT} className="block text-[10px] uppercase tracking-[0.14em] text-gray-500 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings((s) => ({ ...s, language: e.target.value }))}
                    style={FONT}
                    className="w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
                  >
                    <option>English</option>
                    <option>Nederlands</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                  </select>
                </div>

                <div className="relative">
                  <label style={FONT} className="block text-[10px] uppercase tracking-[0.14em] text-gray-500 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings((s) => ({ ...s, timezone: e.target.value }))}
                    style={FONT}
                    className="w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
                  >
                    <option>Europe/Brussels</option>
                    <option>Europe/Amsterdam</option>
                    <option>Europe/London</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                  </select>
                </div>

                <div className="flex flex-col gap-4">
                  <p style={FONT} className="text-[10px] uppercase tracking-[0.14em] text-gray-500">Preferences</p>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings((s) => ({ ...s, emailNotifications: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span style={FONT} className="text-sm text-gray-700">Email notifications</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.publicProfile}
                      onChange={(e) => setSettings((s) => ({ ...s, publicProfile: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span style={FONT} className="text-sm text-gray-700">Public profile</span>
                  </label>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p style={FONT} className="text-[10px] uppercase tracking-[0.14em] text-gray-500 mb-4">Change password</p>
                  <div className="grid gap-6 sm:grid-cols-2">
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
