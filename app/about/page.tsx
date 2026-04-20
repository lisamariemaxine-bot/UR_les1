"use client";
import { useEffect, useState } from "react";

type AboutData = {
  name: string;
  bio: string;
  email: string;
  websiteText: string;
  profileImage: string;
  introLabel: string;
  tagOne: string;
  tagTwo: string;
  textSectionTitle: string;
  contactTitle: string;
  portfolioConceptTitle: string;
  portfolioConcept: string;
};

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData>({
    name: "",
    bio: "",
    email: "",
    websiteText: "",
    profileImage: "",
    introLabel: "",
    tagOne: "",
    tagTwo: "",
    textSectionTitle: "",
    contactTitle: "",
    portfolioConceptTitle: "",
    portfolioConcept: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("/api/about");
        if (res.ok) {
          const data = await res.json();
          setAbout(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '48px 0 0 0' }}>
      {/* Bovenste blok */}
      <div style={{ width: '90vw', maxWidth: 1100, display: 'flex', flexDirection: 'row', padding: 0, marginBottom: 48, boxSizing: 'border-box' }}>
        {/* Linkerzijde tekst */}
        <div style={{ flex: 1.2, padding: '48px 0 48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <div style={{ fontSize: 32, fontWeight: 400, marginBottom: 24, color: '#222', fontFamily: 'inherit', lineHeight: 1.15 }}>
            {loading ? "About me" : (about.name || "About me")}
          </div>
        </div>
        {/* Rechterzijde tekst en beeld */}
        <div style={{ flex: 1.5, padding: '48px 48px 48px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ fontSize: 13, color: '#222', fontWeight: 400, marginBottom: 8 }}>
            {loading
              ? "Loading..."
              : about.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur. Nisi nisl aliquam nunc, eget aliquam massa nisi nec erat. Mauris non erat vitae urna facilisis dictum. Etiam euismod, justo at dictum cursus."}
          </div>
          {!loading && about.websiteText ? (
            <div
              style={{
                fontSize: 14,
                color: '#222',
                fontWeight: 400,
                lineHeight: 1.7,
                padding: '18px 20px',
                border: '1px solid #e4e4e4',
                background: '#fafafa',
                maxWidth: 520,
                whiteSpace: 'pre-wrap'
              }}
            >
              {about.websiteText}
            </div>
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
            <img src={about.profileImage || "/Ik.png"} alt="about me" style={{ width: 240, height: 180, objectFit: 'cover', background: '#eee' }} />
          </div>
          <div style={{ fontSize: 13, color: '#222', fontWeight: 400, marginTop: 16 }}>
            {loading
              ? ""
              : about.email
                ? `Contact: ${about.email}`
                : ""}
          </div>
        </div>
      </div>
      {/* Onderste blok verwijderd */}
    </div>
  );
}
