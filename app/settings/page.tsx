"use client";

import { useState, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type AboutForm = {
  name: string;
  bio: string;
  email: string;
  websiteText: string;
  profileImage: string;
  portfolioConcept: string;
  introLabel: string;
  tagOne: string;
  tagTwo: string;
  textSectionTitle: string;
  contactTitle: string;
  portfolioConceptTitle: string;
};

type FormErrors = {
  [key in keyof AboutForm]: string;
};

const SANS_FONT = { 
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
};

// ── Main Component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [form, setForm] = useState<AboutForm>({
    name: "", bio: "", email: "", websiteText: "", profileImage: "",
    portfolioConcept: "", introLabel: "", tagOne: "", tagTwo: "",
    textSectionTitle: "", contactTitle: "", portfolioConceptTitle: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "", bio: "", email: "", websiteText: "", profileImage: "",
    portfolioConcept: "", introLabel: "", tagOne: "", tagTwo: "",
    textSectionTitle: "", contactTitle: "", portfolioConceptTitle: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Kleuren aangepast: Geel verwijderd, Pink gebruikt voor accenten
  const bgColor = '#FFFFFF'; 
  const accentColor = '#FDC5C6'; // Het roze uit je palet

  const previewParagraphs = form.websiteText
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("/api/about");
        if (res.ok) {
          const data = await res.json();
          setForm(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  function validate() {
    return true;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({ ...current, profileImage: "Please upload an image file." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const preview = typeof reader.result === "string" ? reader.result : "";
      setForm((current) => ({ ...current, profileImage: preview }));
    };
    reader.readAsDataURL(file);

    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-image", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm((current) => ({ ...current, profileImage: data.url }));
        setErrors((current) => ({ ...current, profileImage: "" }));
      }
    } catch {
      setErrors((current) => ({ ...current, profileImage: "Upload failed." }));
    } finally {
      setImageUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      try {
        await fetch("/api/about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } catch {}
      setTimeout(() => setSubmitted(false), 2500);
    }
  }

  return (
    <div className="min-h-screen pt-20" style={{ ...SANS_FONT, backgroundColor: bgColor }}>
      <div className="mx-auto w-full max-w-[1280px] px-12">
        
        {/* ── LIVE PREVIEW AREA ── */}
        <div className="grid gap-8 lg:grid-cols-1">
          <div className="justify-self-start w-full max-w-[920px]">
            <div className="py-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
                {form.introLabel.trim() || 'Selected introduction'}
              </p>
              <h2 className="mt-4 text-7xl font-black uppercase tracking-tighter leading-[0.85] text-black">
                {form.name.trim() || 'Your Name'}
              </h2>
              <p className="mt-6 max-w-md text-sm font-bold uppercase leading-relaxed text-black/60">
                {form.bio.trim() || 'A short portfolio introduction will appear here.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[form.tagOne, form.tagTwo].map((tag, i) => tag.trim() && (
                  <div key={i} style={{ borderColor: accentColor }} className="border-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black">
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-12 border-t-2 border-black pt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
                  {form.textSectionTitle.trim() || 'Text section'}
                </p>
                <div className="mt-6 space-y-4 text-sm font-bold uppercase leading-relaxed text-black">
                  {(previewParagraphs.length > 0 ? previewParagraphs : ['Live preview text.']).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-2">
                <div>
                  {form.profileImage ? (
                    <img src={form.profileImage} alt="Preview" className="aspect-[4/5] w-full grayscale border-2 border-black object-cover" />
                  ) : (
                    <div className="aspect-[4/5] bg-black/5 border-2 border-black flex items-center justify-center text-[10px] font-black uppercase text-black/20">No_Img</div>
                  )}
                  <div className="mt-8 border-t-2 border-black pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">{form.contactTitle.trim() || 'Contact'}</p>
                    <p className="mt-2 text-sm font-black uppercase">{form.email.trim() || 'name@example.com'}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Achtergrond aangepast naar Pink */}
                  <div style={{ backgroundColor: accentColor }} className="text-black p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">
                      {form.portfolioConceptTitle.trim() || 'Concept'}
                    </p>
                    <p className="text-sm font-bold uppercase leading-relaxed">
                      {form.portfolioConcept.trim() || 'Describe your vision here.'}
                    </p>
                  </div>
                  <div className="border-2 border-black p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4">Details</p>
                    <ul className="space-y-2 text-xs font-black uppercase">
                      <li>• Print and editorial storytelling</li>
                      <li>• Concept-driven visual research</li>
                      <li>• Careful typography</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── EDITOR PANEL (PINK) ── */}
        {isEditorOpen && <div className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />}
        
        <div className={`fixed bottom-0 right-0 top-0 z-30 w-full max-w-[520px] shadow-2xl transition-transform duration-500 ease-in-out ${isEditorOpen ? 'translate-x-0' : 'translate-x-full'}`}
             style={{ backgroundColor: accentColor }}>
          
          <div className="flex h-full flex-col overflow-y-auto p-10 pt-20">
            <div className="flex items-start justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-black">Edit Content</h2>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-black/40">Interface_Update_Node</p>
              </div>
              <button onClick={() => setIsEditorOpen(false)} className="text-black hover:rotate-90 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 6L18 18M18 6L6 18" /></svg>
              </button>
            </div>

            {loading ? (
              <div className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Loading_System_Data...</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                
                {[
                  { label: "Intro Label", name: "introLabel" },
                  { label: "Name", name: "name" },
                  { label: "Text Section Title", name: "textSectionTitle" },
                  { label: "Contact Title", name: "contactTitle" },
                  { label: "Concept Title", name: "portfolioConceptTitle" },
                  { label: "Email", name: "email", type: "email" }
                ].map((f) => (
                  <div key={f.name} className="relative">
                    <input
                      type={f.type || "text"}
                      name={f.name}
                      value={form[f.name as keyof AboutForm]}
                      onChange={handleChange}
                      placeholder={f.label}
                      className="peer h-12 w-full border-b-2 border-black/10 bg-transparent text-black placeholder-transparent focus:border-black focus:outline-none transition-colors font-bold uppercase tracking-tight"
                    />
                    <label className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase tracking-[0.2em] font-black transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-black">
                      {f.label}
                    </label>
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Bio"
                    className="peer w-full border-b-2 border-black/10 bg-transparent text-sm font-bold uppercase focus:border-black focus:outline-none transition resize-none"
                  />
                  <label className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase font-black tracking-widest">Bio</label>
                </div>

                <div className="relative">
                  <textarea
                    name="websiteText"
                    value={form.websiteText}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Website Text"
                    className="peer w-full border-b-2 border-black/10 bg-transparent text-sm font-bold uppercase focus:border-black focus:outline-none transition resize-none"
                  />
                  <label className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase font-black tracking-widest">Website Text</label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {["tagOne", "tagTwo"].map((tag) => (
                    <div key={tag} className="relative">
                      <input
                        type="text"
                        name={tag}
                        value={form[tag as keyof AboutForm]}
                        onChange={handleChange}
                        className="peer h-10 w-full border-b-2 border-black/10 bg-transparent text-black placeholder-transparent focus:border-black focus:outline-none transition font-bold uppercase"
                        placeholder={tag}
                      />
                      <label className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase font-black">{tag}</label>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={imageUploading}
                    className="block text-[10px] font-black uppercase file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:opacity-80 disabled:opacity-50"
                  />
                  {form.profileImage && (
                    <div className="mt-2 relative group w-32 h-32">
                      <img src={form.profileImage} className="w-full h-full object-cover grayscale border border-black/20" />
                      <button type="button" onClick={() => setForm({ ...form, profileImage: "" })} 
                              className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase">Remove</button>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <button type="submit" className="bg-black py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black border-2 border-black transition-all">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setForm({ name: "", bio: "", email: "", websiteText: "", profileImage: "", portfolioConcept: "", introLabel: "", tagOne: "", tagTwo: "", textSectionTitle: "", contactTitle: "", portfolioConceptTitle: "" })}
                          className="border-2 border-black py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all">
                    Reset Form
                  </button>
                </div>
                {submitted && <p className="text-[10px] font-black uppercase text-center tracking-widest animate-bounce">System_Updated_Success</p>}
              </form>
            )}
          </div>
        </div>

        {/* ── FIXED ACTION BUTTONS ── */}
        <div className={`fixed bottom-10 z-40 flex items-center gap-3 transition-all duration-500 ease-out ${isEditorOpen ? 'right-[550px]' : 'right-12'}`}>
          <a href="https://ulqvsiebkdt.typeform.com/to/egcpqhQT" target="_blank" rel="noopener noreferrer"
             style={{ backgroundColor: accentColor }}
             className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white border-2 border-black transition-all shadow-xl">
            Enquête
          </a>
          <button onClick={() => setIsEditorOpen(!isEditorOpen)}
                  style={{ backgroundColor: accentColor }}
                  className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white border-2 border-black transition-all shadow-xl">
            {isEditorOpen ? 'Close' : 'Edit'}
          </button>
        </div>

      </div>
    </div>
  );
}