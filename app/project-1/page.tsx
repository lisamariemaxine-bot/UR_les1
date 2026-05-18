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
      textTransform: 'uppercase',
      cursor: "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><polygon points='2,2 26,16 18,18 20,30 12,20' fill='%230b3d02'/></svg>') 16 16, crosshair"
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
                Voor dit project maakte ik een leporello gebaseerd op het werk van Henri Cartier-Bresson. Hij stond bekend om zijn straatfotografie en het vastleggen van het "beslissende moment". Ik probeerde die stijl te vertalen naar mijn eigen beelden: eerlijk, raak en zonder te poseren.
              </div>
            </div>
          </div>

          {/* Rechts: Hoofdafbeelding van Project 1 */}
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{ width: '100%', maxWidth: 400, aspectRatio: '1/1', background: '#f0f0f0', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setModalImg('/_backup_images_2026-05-17/cover.jpg')}
            >
              <img src="/_backup_images_2026-05-17/cover.jpg" alt="Project 1 cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Top brede afbeelding (neemt dezelfde breedte als de 3 kolommen hieronder) */}
        <div style={{ width: '100%', padding: '0 16px 16px 16px' }}>
          <div
            style={{ width: '100%', background: '#f0f0f0', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => setModalImg('/_backup_images_2026-05-17/leporello-1.png')}
          >
            <img src="/_backup_images_2026-05-17/leporello-1.png" alt="Leporello highlight" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Media Grid met 6 afbeeldingen */}
        <div style={{ width: '100%', padding: '0 16px 64px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {['/_backup_images_2026-05-17/img_5001.png','/_backup_images_2026-05-17/img_5003.png','/_backup_images_2026-05-17/img_5004.png','/_backup_images_2026-05-17/img_5005.png','/_backup_images_2026-05-17/img_5006.png','/_backup_images_2026-05-17/img_5007.png'].map((src, idx) => (
            <div 
              key={src}
              className="project-img-container" 
              onClick={() => setModalImg(src)}
            >
              <img src={src} alt={`Project 1 afbeelding ${idx+1}`} className="project-img" />
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