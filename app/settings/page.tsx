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

  const bgColor = '#FFFFFF'; 
  const accentColor = '#FDC5C6'; 

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
    <div className="min-h-screen pt-10 md:pt-20" style={{ ...SANS_FONT, backgroundColor: bgColor }}>
      <div className="mx-auto w-full max-w-[1280px] px-3 md:px-12">
        
        {/* ── LIVE PREVIEW AREA ── */}
        <div className="grid gap-8 lg:grid-cols-1">
          <div className="justify-self-start w-full max-w-[920px]">
            <div className="py-6 md:py-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
                {form.introLabel.trim() || 'Selected introduction'}
              </p>
              <h2 className="mt-4 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-black">
                {form.name.trim() || 'Your Name'}
              </h2>
              <p className="mt-6 max-w-md text-sm font-bold uppercase leading-relaxed text-black/60">
                {form.bio.trim() || 'A short portfolio introduction will appear here.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-2 md:gap-3">
                {[form.tagOne, form.tagTwo].map((tag, i) => tag.trim() && (
                  <div key={i} style={{ borderColor: accentColor }} className="border px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-black">
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-12 border-t border-black pt-8">
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
                    <img src={form.profileImage} alt="Preview" className="aspect-[4/5] w-full grayscale border border-black object-cover" />
                  ) : (
                    <div className="aspect-[4/5] bg-black/5 border border-black flex items-center justify-center text-[10px] font-black uppercase text-black/20">No_Img</div>
                  )}
                  <div className="mt-8 border-t border-black pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">{form.contactTitle.trim() || 'Contact'}</p>
                    <p className="mt-2 text-sm font-black uppercase break-all">{form.email.trim() || 'name@example.com'}</p>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div style={{ backgroundColor: accentColor }} className="text-black p-6 md:p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">
                      {form.portfolioConceptTitle.trim() || 'Concept'}
                    </p>
                    <p className="text-sm font-bold uppercase leading-relaxed">
                      {form.portfolioConcept.trim() || 'Describe your vision here.'}
                    </p>
                  </div>
                  <div className="border border-black p-6 md:p-8">
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

        {/* ── EDITOR PANEL ── */}
        {isEditorOpen && <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />}
        
        <div className={`fixed bottom-0 right-0 top-0 z-50 w-full md:max-w-[520px] shadow-2xl transition-transform duration-500 ease-in-out ${isEditorOpen ? 'translate-x-0' : 'translate-x-full'}`}
             style={{ backgroundColor: accentColor }}>
          
          <div className="flex h-full flex-col overflow-y-auto p-6 md:p-10 pt-16 md:pt-20">
            <div className="flex items-start justify-between mb-8 md:mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black">Edit Content</h2>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-black/40">Interface_Update_Node</p>
              </div>
              <button onClick={() => setIsEditorOpen(false)} className="text-black p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6L18 18M18 6L6 18" /></svg>
              </button>
            </div>

            {loading ? (
              <div className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Loading_System_Data...</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10 pb-10">
                
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
                      className="peer h-12 w-full border-b border-black/10 bg-transparent text-black placeholder-transparent focus:border-black focus:outline-none transition-colors font-bold uppercase tracking-tight"
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
                    className="peer w-full border-b border-black/10 bg-transparent text-sm font-bold uppercase focus:border-black focus:outline-none transition resize-none"
                    placeholder="Bio"
                  />
                  <label className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase font-black tracking-widest">Bio</label>
                </div>

                <div className="relative">
                  <textarea
                    name="websiteText"
                    value={form.websiteText}
                    onChange={handleChange}
                    rows={5}
                    className="peer w-full border-b border-black/10 bg-transparent text-sm font-bold uppercase focus:border-black focus:outline-none transition resize-none"
                    placeholder="Website Text"
                  />
                  <label className="absolute left-0 -top-3.5 text-black/40 text-[10px] uppercase font-black tracking-widest">Website Text</label>
                </div>

                <div className="grid gap-6 grid-cols-2">
                  {["tagOne", "tagTwo"].map((tag) => (
                    <div key={tag} className="relative">
                      <input
                        type="text"
                        name={tag}
                        value={form[tag as keyof AboutForm]}
                        onChange={handleChange}
                        className="peer h-10 w-full border-b border-black/10 bg-transparent text-black placeholder-transparent focus:border-black focus:outline-none transition font-bold uppercase"
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
                    className="block text-[9px] font-black uppercase file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:opacity-80 disabled:opacity-50"
                  />
                  {form.profileImage && (
                    <div className="mt-2 relative group w-24 h-24">
                      <img src={form.profileImage} className="w-full h-full object-cover grayscale border border-black/20" />
                      <button type="button" onClick={() => setForm({ ...form, profileImage: "" })} 
                              className="absolute inset-0 bg-black/60 text-white opacity-0 md:group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase">Remove</button>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button type="submit" className="bg-black py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black border border-black transition-all">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setForm({ name: "", bio: "", email: "", websiteText: "", profileImage: "", portfolioConcept: "", introLabel: "", tagOne: "", tagTwo: "", textSectionTitle: "", contactTitle: "", portfolioConceptTitle: "" })}
                          className="border border-black py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all">
                    Reset Form
                  </button>
                </div>
                {submitted && <p className="text-[10px] font-black uppercase text-center tracking-widest animate-bounce">System_Updated_Success</p>}
              </form>
            )}
          </div>
        </div>

        {/* ── FIXED ACTION BUTTONS ── */}
        <div className={`fixed bottom-6 md:bottom-10 z-[60] flex items-center gap-2 md:gap-3 transition-all duration-500 ease-out ${isEditorOpen ? 'right-6 md:right-[550px]' : 'right-4 md:right-12'}`}>
          <a href="https://ulqvsiebkdt.typeform.com/to/egcpqhQT" target="_blank" rel="noopener noreferrer"
             style={{ backgroundColor: accentColor }}
             className="px-4 md:px-6 py-2.5 md:py-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-black border border-black transition-all shadow-xl">
            Enquête
          </a>
          <button onClick={() => setIsEditorOpen(!isEditorOpen)}
                  style={{ backgroundColor: accentColor }}
                  className="px-6 md:px-8 py-2.5 md:py-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-black border border-black transition-all shadow-xl">
            {isEditorOpen ? 'Close' : 'Edit'}
          </button>
        </div>

      </div>
    </div>
  );
}