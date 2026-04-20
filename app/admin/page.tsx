"use client";

import { useState, useEffect } from "react";

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

export default function AdminPage() {
  const [form, setForm] = useState<AboutForm>({
    name: "",
    bio: "",
    email: "",
    websiteText: "",
    profileImage: "",
    portfolioConcept: "",
    introLabel: "",
    tagOne: "",
    tagTwo: "",
    textSectionTitle: "",
    contactTitle: "",
    portfolioConceptTitle: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    bio: "",
    email: "",
    websiteText: "",
    profileImage: "",
    portfolioConcept: "",
    introLabel: "",
    tagOne: "",
    tagTwo: "",
    textSectionTitle: "",
    contactTitle: "",
    portfolioConceptTitle: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
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
    let valid = true;
    let newErrors = {
      name: "",
      bio: "",
      email: "",
      websiteText: "",
      profileImage: "",
      portfolioConcept: "",
      introLabel: "",
      tagOne: "",
      tagTwo: "",
      textSectionTitle: "",
      contactTitle: "",
      portfolioConceptTitle: "",
    };
    setErrors(newErrors);
    return valid;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({ ...current, profileImage: "Please upload an image file." }));
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setErrors((current) => ({ ...current, profileImage: "Image must be smaller than 4 MB." }));
      return;
    }

    // Show local preview immediately while uploading
    const reader = new FileReader();
    reader.onload = () => {
      const preview = typeof reader.result === "string" ? reader.result : "";
      setForm((current) => ({ ...current, profileImage: preview }));
    };
    reader.readAsDataURL(file);

    // Upload the file to the server so it persists after save
    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setForm((current) => ({ ...current, profileImage: data.url }));
        setErrors((current) => ({ ...current, profileImage: "" }));
      } else {
        const err = await res.json();
        setErrors((current) => ({ ...current, profileImage: err.error ?? "Upload failed." }));
      }
    } catch {
      setErrors((current) => ({ ...current, profileImage: "Upload failed. Please try again." }));
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
    } else {
      setSubmitted(false);
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-900">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)] lg:items-start">
          <div className="overflow-hidden justify-self-start">
                <div className="grid max-w-[920px] gap-0">
                  <div className="bg-white px-8 py-10 md:px-10">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500">{form.introLabel.trim() || 'Selected introduction'}</p>
                    <h2 className="mt-4 text-5xl leading-[0.92] text-[#1f1b17]" style={{ fontFamily: 'Georgia, Times, serif' }}>
                      {form.name.trim() || 'Your Name'}
                    </h2>
                    <p className="mt-5 max-w-md text-sm leading-7 text-gray-700">
                      {form.bio.trim() || 'A short portfolio introduction will appear here. Add a bio to show your voice, your focus and your visual practice.'}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <div className="rounded-none border border-gray-300 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-600">
                        {form.tagOne.trim() || 'Visual identity'}
                      </div>
                      <div className="rounded-none border border-gray-300 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-600">
                        {form.tagTwo.trim() || 'Editorial design'}
                      </div>
                    </div>

                    <div className="mt-10 rounded-none border border-gray-200 bg-white px-6 py-6 shadow-[0_14px_34px_rgba(0,0,0,0.04)]">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-gray-500">{form.textSectionTitle.trim() || 'Text section'}</p>
                      <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
                        {(previewParagraphs.length > 0 ? previewParagraphs : ['Your saved website text will appear here as a live preview.']).map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white px-8 pb-10 pt-0 md:px-10">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(260px,1.05fr)]">
                      <div>
                        {form.profileImage ? (
                          <img
                            src={form.profileImage}
                            alt="Portfolio preview"
                            className="aspect-[4/4.6] w-full rounded-none border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="aspect-[4/4.6] rounded-none border border-gray-200 bg-gray-100" />
                        )}
                        <div className="mt-5 border-t border-gray-200 pt-5">
                          <p className="text-[11px] uppercase tracking-[0.26em] text-gray-500">{form.contactTitle.trim() || 'Contact'}</p>
                          <p className="mt-3 text-sm text-gray-800">{form.email.trim() || 'name@example.com'}</p>
                        </div>
                      </div>

                      <div className="grid content-start gap-6">
                        <div className="rounded-none border border-gray-200 bg-white px-6 py-5 shadow-[0_18px_32px_rgba(0,0,0,0.04)]">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-gray-500">{form.portfolioConceptTitle.trim() || 'Portfolio page concept'}</p>
                          <p className="mt-3 text-sm leading-6 text-gray-700">
                            {form.portfolioConcept.trim() || 'This example shows how your name, bio, free text and contact details come together in a short and clear portfolio intro.'}
                          </p>
                        </div>

                        <div className="rounded-none border border-gray-200 bg-white px-6 py-5 shadow-[0_18px_32px_rgba(0,0,0,0.04)]">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-gray-500">Availability</p>
                          <p className="mt-3 text-sm leading-6 text-gray-700">
                            Available for portfolio reviews, editorial concepts and visual identity explorations.
                          </p>
                        </div>

                        <div className="rounded-none border border-gray-200 bg-white px-6 py-5 shadow-[0_18px_32px_rgba(0,0,0,0.04)]">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-gray-500">Highlights</p>
                          <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
                            <li>Print and editorial storytelling</li>
                            <li>Concept-driven visual research</li>
                            <li>Careful typography and composition</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>

        {isEditorOpen && (
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsEditorOpen(false)}
          />
        )}

        <div
          className={`fixed bottom-6 right-6 top-24 z-30 w-[calc(100vw-3rem)] max-w-[520px] border border-gray-200 bg-white shadow-[-24px_0_48px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${isEditorOpen ? 'translate-x-0' : 'translate-x-[110%]'}`}
          style={{ fontFamily: 'Georgia, Times, serif' }}
        >
          <div className="flex h-full flex-col overflow-y-auto p-8 pt-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Content</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Update the public text below. After saving, the website text will appear automatically on the About page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                aria-label="Close panel"
                title="Close"
                className="bg-transparent p-1 text-gray-600 transition-colors hover:text-black focus:outline-none"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-8 flex-1">
              {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="introLabel"
                      value={form.introLabel}
                      onChange={handleChange}
                      className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                      placeholder="Intro Label"
                      autoComplete="off"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                      Intro Label
                    </label>

                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                      placeholder="Name"
                      autoComplete="off"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                      Name
                    </label>

                  </div>

                  <div className="relative">
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={4}
                      className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                      placeholder="Bio"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                      Bio
                    </label>

                  </div>

                  <div className="relative">
                    <textarea
                      name="websiteText"
                      value={form.websiteText}
                      onChange={handleChange}
                      rows={6}
                      className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                      placeholder="Website Text"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                      Website Text
                    </label>

                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="relative">
                      <input
                        type="text"
                        name="tagOne"
                        value={form.tagOne}
                        onChange={handleChange}
                        className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                        placeholder="First Tag"
                        autoComplete="off"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                        First Tag
                      </label>

                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="tagTwo"
                        value={form.tagTwo}
                        onChange={handleChange}
                        className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                        placeholder="Second Tag"
                        autoComplete="off"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                        Second Tag
                      </label>

                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="textSectionTitle"
                      value={form.textSectionTitle}
                      onChange={handleChange}
                      className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                      placeholder="Text Section Title"
                      autoComplete="off"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                      Text Section Title
                    </label>

                  </div>

                  <div className="relative">
                    <textarea
                      name="portfolioConcept"
                      value={form.portfolioConcept}
                      onChange={handleChange}
                      rows={4}
                      className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                      placeholder="Portfolio Concept"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                      Portfolio Concept
                    </label>
                    <p className="mt-2 text-xs text-gray-400">Describe the concept behind your portfolio: your approach, vision, and what makes your work distinctive.</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="relative">
                      <input
                        type="text"
                        name="contactTitle"
                        value={form.contactTitle}
                        onChange={handleChange}
                        className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                        placeholder="Contact Title"
                        autoComplete="off"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                        Contact Title
                      </label>

                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="portfolioConceptTitle"
                        value={form.portfolioConceptTitle}
                        onChange={handleChange}
                        className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition"
                        placeholder="Portfolio Concept Title"
                        autoComplete="off"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                        Portfolio Concept Title
                      </label>

                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Email"
                      autoComplete="off"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm">
                      Email
                    </label>
                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-sm text-gray-600">Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={imageUploading}
                      className="block w-full border border-gray-300 px-3 py-3 text-sm text-gray-700 file:mr-3 file:border-0 file:bg-black file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white disabled:opacity-50"
                    />
                    {imageUploading && (
                      <p className="text-xs text-gray-500">Uploading…</p>
                    )}
                    {errors.profileImage && <span className="text-red-500 text-xs">{errors.profileImage}</span>}
                    {form.profileImage && !imageUploading ? (
                      <div className="border border-gray-200 p-3">
                        <img
                          src={form.profileImage}
                          alt="Selected upload"
                          className="h-40 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setForm((current) => ({ ...current, profileImage: "" }))}
                          style={{ fontFamily: 'Georgia, Times, serif' }}
                          className="mt-3 border border-gray-300 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-700 transition-colors hover:border-black hover:text-black"
                        >
                          Remove photo
                        </button>
                      </div>
                    ) : null}

                  </div>

                  <div className="mt-2 flex gap-3">
                    <button
                      type="submit"
                      style={{ fontFamily: 'Georgia, Times, serif' }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-none hover:bg-blue-700 transition font-semibold shadow"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ name: "", bio: "", email: "", websiteText: "", profileImage: "", portfolioConcept: "", introLabel: "", tagOne: "", tagTwo: "", textSectionTitle: "", contactTitle: "", portfolioConceptTitle: "" })}
                      style={{ fontFamily: 'Georgia, Times, serif' }}
                      className="border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-black hover:text-black rounded-none"
                    >
                      Wis alles
                    </button>
                  </div>
                </form>
              )}

              {submitted && (
                <div className="mt-4 text-green-600 transition-opacity duration-700 opacity-100 animate-fade-in-out">About info updated!</div>
              )}
            </div>
          </div>
        </div>

        <div className={`fixed bottom-10 z-40 flex items-center gap-3 transition-all duration-300 ease-out ${isEditorOpen ? 'right-[calc(520px+3rem)]' : 'right-6'}`}>
          <a
            href="https://ulqvsiebkdt.typeform.com/to/egcpqhQT"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Georgia, Times, serif' }}
            className="inline-flex items-center border border-blue-600 bg-blue-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-blue-600"
          >
            Enquête
          </a>
          <button
            type="button"
            onClick={() => setIsEditorOpen((open) => !open)}
            style={{ fontFamily: 'Georgia, Times, serif' }}
            className="inline-flex items-center border border-black bg-black px-4 py-2 text-left text-white transition-colors hover:bg-white hover:text-black"
          >
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em]">Edit</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
