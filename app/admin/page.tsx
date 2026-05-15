"use client";

import { useState, useEffect } from "react";

type ProjectForm = {
  title: string;
  description: string;
  mainImage: string;
  gridImages: string[];
};

const SANS_FONT = { 
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
};

export default function AdminProjectPage() {
  const [form, setForm] = useState<ProjectForm>({
    title: "Project Titel",
    description: "Beschrijf hier je project...",
    mainImage: "",
    gridImages: ["", "", "", "", ""],
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const accentColor = '#FDC5C6';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGridImageChange = (index: number, url: string) => {
    const newGrid = [...form.gridImages];
    newGrid[index] = url;
    setForm({ ...form, gridImages: newGrid });
  };

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, target: 'main' | number) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const url = typeof reader.result === "string" ? reader.result : "";
      // show immediate preview
      if (target === 'main') {
        setForm(prev => ({ ...prev, mainImage: url }));
      } else {
        handleGridImageChange(target, url);
      }

      // upload to server which forwards to Cloudinary
      try {
        const resp = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: url, filename: file.name }),
        })
        const json = await resp.json()
        if (json.url) {
          if (target === 'main') {
            setForm(prev => ({ ...prev, mainImage: json.url }));
          } else {
            handleGridImageChange(target, json.url);
          }
        } else {
          console.error('Upload failed', json)
        }
      } catch (err) {
        console.error('Upload error', err)
      }
    };
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
      
      {/* ── LIVE PREVIEW AREA ── */}
      <div className={`transition-all duration-500 ${isEditorOpen ? 'md:pr-[520px] opacity-20 md:opacity-100' : 'pr-0'}`}>
        <div className="flex flex-col items-center pt-10 md:pt-[10vh] px-4 md:px-0" 
             style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'uppercase' }}>
          
          <div className="w-full max-w-[1100px] flex flex-col">
            
            {/* Header Sectie */}
            <div className="flex flex-col md:flex-row p-0 md:p-[0_32px] gap-8 md:gap-10 mb-12 md:mb-16">
              
              <div className="flex-[1.2] min-w-0">
                <div className="relative mb-8 md:mb-[60px]">
                  <h1 className="m-0 leading-[0.85] font-black tracking-tighter break-words"
                      style={{ fontSize: 'clamp(2.5rem, 12vw, 5.5rem)' }}>
                    {form.title || "Project Titel"}
                  </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-6 md:mt-10">
                  <div className="min-w-[100px] text-[10px] md:text-xs font-black opacity-50">
                    [ OVER DIT PROJECT ]
                  </div>
                  <div className="text-xs md:text-sm font-semibold max-w-[400px] leading-relaxed tracking-tight"
                       style={{ textTransform: 'none' }}>
                    {form.description}
                  </div>
                </div>
              </div>

              <div className="flex-[0.8] flex justify-center md:justify-end">
                <div className="w-full max-w-[400px] aspect-square bg-[#f0f0f0] overflow-hidden border border-[#eee]">
                  {form.mainImage && <img src={form.mainImage} alt="Main" className="w-full h-full object-cover" />}
                </div>
              </div>
            </div>

            {/* Media Grid */}
            <div className="w-full px-0 md:px-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {form.gridImages.map((src, idx) => (
                <div key={idx} className="w-full aspect-square bg-[#f0f0f0] overflow-hidden border border-[#eee]">
                  {src && <img src={src} alt={`Grid ${idx}`} className="w-full h-full object-cover" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── EDITOR PANEL ── */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" 
             onClick={() => setIsEditorOpen(false)} />
      )}
      
      {/* Border verwijderd */}
      <div className={`fixed bottom-0 right-0 top-0 z-50 w-full md:max-w-[520px] shadow-2xl transition-transform duration-500 ease-in-out ${isEditorOpen ? 'translate-x-0' : 'translate-x-full'}`}
           style={{ backgroundColor: accentColor, ...SANS_FONT }}>
        
        <div className="flex h-full flex-col overflow-y-auto p-6 md:p-10 pt-16 md:pt-20">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black">Project Editor</h2>
              <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-black/40 underline decoration-2">Mobile_Ready_Interface</p>
            </div>
            <button onClick={() => setIsEditorOpen(false)} className="p-2 bg-black text-white rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 6L18 18M18 6L6 18" /></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8 pb-32">
            <div className="relative">
              <input name="title" value={form.title} onChange={handleChange} className="peer h-12 w-full border-b-2 border-black/20 bg-transparent text-black focus:border-black focus:outline-none font-bold uppercase transition-all" placeholder=" " />
              <label className="absolute left-0 -top-3.5 text-black/40 text-[9px] uppercase font-black tracking-widest">Project Titel</label>
            </div>

            <div className="relative">
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="peer w-full border-b-2 border-black/20 bg-transparent text-sm font-bold focus:border-black focus:outline-none resize-none" placeholder=" " />
              <label className="absolute left-0 -top-3.5 text-black/40 text-[9px] uppercase font-black tracking-widest">Beschrijving</label>
            </div>

            <div className="p-4 bg-black/5 border border-black/10 rounded-sm">
              <label className="text-[9px] font-black uppercase text-black/40 block mb-2">Hoofdafbeelding</label>
              <input type="file" onChange={(e) => handleFileUpload(e, 'main')} className="w-full text-[10px] font-bold file:bg-black file:text-white file:px-3 file:py-1 file:border-0 file:mr-4" />
            </div>

            <div className="space-y-3 border-t-2 border-black/10 pt-6">
              <label className="text-[9px] font-black uppercase text-black/60 block mb-4 italic">Grid Media Management</label>
              <div className="grid grid-cols-1 gap-3">
                {form.gridImages.map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-1 p-2 border border-black/5">
                    <span className="text-[8px] font-black opacity-40">SLOT #{idx + 1}</span>
                    <input type="file" onChange={(e) => handleFileUpload(e, idx)} className="text-[9px] file:bg-white file:border file:border-black file:text-black" />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="bg-black py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white active:scale-95 transition-all shadow-lg">
              Project Opslaan
            </button>
            {submitted && <p className="text-[10px] font-black uppercase text-center text-green-600 animate-pulse">✓ Systeem Bijgewerkt</p>}
          </form>
        </div>
      </div>

      {/* ── FIXED ACTION BUTTONS ── */}
      {/* Borders verwijderd van beide knoppen */}
      <div className={`fixed bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 z-[60] flex items-center gap-2 transition-all duration-500 ${isEditorOpen ? 'md:right-[550px] opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'md:right-12 w-[90%] md:w-auto justify-center md:justify-start'}`}>
        <a href="https://ulqvsiebkdt.typeform.com/to/egcpqhQT" target="_blank" rel="noopener noreferrer"
           style={{ backgroundColor: accentColor }}
           className="flex-1 md:flex-none text-center px-4 md:px-6 py-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-xl whitespace-nowrap">
          Enquête
        </a>
        <button onClick={() => setIsEditorOpen(!isEditorOpen)}
          style={{ backgroundColor: accentColor }}
          className="flex-1 md:flex-none px-6 md:px-8 py-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-xl whitespace-nowrap">
          {isEditorOpen ? 'Sluit' : 'Bewerk'}
        </button>
      </div>

    </div>
  );
}