"use client";
import React, { useState } from "react";

export default function Project1Page() {
  const [modalImg, setModalImg] = useState<string | null>(null);
  const textColor = "#000000";

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'transparent', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      paddingTop: '10vh',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      textTransform: 'uppercase'
    }}>
      
      <div style={{ width: '90vw', maxWidth: 1100, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Sectie (Zelfde stijl als Project 2 & 3) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '0 32px', gap: 40, marginBottom: 64 }}>
          
          {/* Links: Titel & Beschrijving */}
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
                leporello
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
                Hier komt de beschrijving van Project 1. Zorg dat deze tekst qua lengte overeenkomt met de andere pagina's voor een rustig en consistent beeld in je portfolio.
              </div>
            </div>
          </div>

          {/* Rechts: Hoofdafbeelding van Project 1 */}
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{ width: '100%', maxWidth: 400, aspectRatio: '1/1', background: '#f0f0f0', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setModalImg('/IMG_5001.PNG')}
            >
              <img src="/IMG_5001.PNG" alt="Project 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Media Grid met 5 afbeeldingen */}
        <div style={{ width: '100%', padding: '0 16px 64px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {['/IMG_5003.PNG','/IMG_5004.PNG','/IMG_5005.PNG','/IMG_5006.PNG','/IMG_5007.PNG'].map((src, idx) => (
            <div 
              key={src}
              className="project-img-container" 
              onClick={() => setModalImg(src)}
            >
              <img src={src} alt={`Project 1 afbeelding ${idx+2}`} className="project-img" />
            </div>
          ))}
        </div>

        {/* Modal voor vergroten */}
        {modalImg && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', 
            alignItems: 'center', justifyContent: 'center', cursor: 'not-allowed' 
          }} onClick={() => setModalImg(null)}>
            <img src={modalImg} alt="Vergrote afbeelding" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
          </div>
        )}
      </div>

      <style jsx>{`
        .project-img-container {
          width: 100%;
          aspect-ratio: 1/1;
          background: #f0f0f0;
          overflow: hidden;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .project-img-container:hover {
          opacity: 0.8;
        }
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}