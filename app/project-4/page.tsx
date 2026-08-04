"use client";
import React from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
    rel="stylesheet"
  />
);

export default function Project4Page() {
  const textColor = "#000000";

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'transparent', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      paddingTop: '10vh',
      fontFamily: 'sans-serif',
      textTransform: 'uppercase',
      cursor: "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><polygon points='2,2 26,16 18,18 20,30 12,20' fill='%238B5CF6'/></svg>') 16 16, crosshair"
    }}>
      <FontLink />

      <div style={{ width: '90vw', maxWidth: 1100, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '0 32px', gap: 40, marginBottom: 64 }}>
          <div style={{ flex: 1.2, minWidth: 300 }}>
            <div style={{ position: 'relative', marginBottom: 60 }}>
              <h1 style={{
                margin: 0,
                lineHeight: 0.85,
                color: textColor,
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.05em',
                display: 'block'
              }}>
                Belgische Poolexpedities
              </h1>
            </div>

            <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
              <div style={{ minWidth: 100, fontSize: 12, fontWeight: 900, opacity: 0.5 }}>
                [ OVER DIT PROJECT ]
              </div>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                maxWidth: 400,
                lineHeight: 1.4,
                letterSpacing: '-0.02em',
                textTransform: 'none'
              }}>
                Met dit interactieve touchscreen kunnen bezoekers Antarctische expedities verkennen door een 3D-globe te draaien. Elke locatie toont historische foto’s die geopend kunnen worden voor extra informatie. Bezoekers kunnen de inhoud ook per expeditie bekijken en inzoomen op de kaart om meer details te ontdekken over elke bestemming en haar rol binnen de Antarctische reizen.
              </div>
            </div>
          </div>

        </div>

        <div style={{ width: '100%', padding: '0 16px 16px 16px' }}>
          <div style={{ position: 'relative', width: '100%', border: '1px solid #ddd', background: '#fff', overflow: 'hidden' }}>
              <a
                href="https://agent-6a13aeaff6e33d45dffa93c3--opd2dlint.netlify.app/home"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open originele website"
                style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'block', cursor: 'pointer' }}
              />
              <iframe
                src="https://agent-6a13aeaff6e33d45dffa93c3--opd2dlint.netlify.app/home"
                title="Project 4 websitevoorbeeld"
                style={{ width: '100%', height: '700px', border: 'none', display: 'block', pointerEvents: 'none' }}
                loading="lazy"
              />
            </div>
        </div>
      </div>
    </div>
  );
}
