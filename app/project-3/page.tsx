"use client";
import React, { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
    rel="stylesheet"
  />
);

export default function AcousticLaptopPage() {
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
      fontFamily: 'sans-serif',
      textTransform: 'uppercase',
      cursor: "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><polygon points='2,2 26,16 18,18 20,30 12,20' fill='%23FAE170'/></svg>') 16 16, crosshair"
    }}>
      <FontLink />
      
      <div style={{ width: '90vw', maxWidth: 1100, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Sectie */}
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
                Acoustic Laptop
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
                Voor dit project bouwde ik een acoustic laptop: een zelfgemaakte houten doos gevuld met voorwerpen zoals een kam, buizen, belletjes en een vork. Door erop te tikken, te wrijven of erin te roeren ontstaan verschillende klanken.
                Daarnaast ontwierp ik een visuele score: een grafische partituur die aangeeft hoe iemand het instrument moet bespelen. Ik testte dit met verschillende personen en paste de score steeds aan op basis van hun feedback. Het eindresultaat is een duidelijk pad met symbolen voor luid, zacht en herhaling.
              </div>
            </div>
          </div>

          {/* Rechts: Hoofdafbeelding */}
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{ width: '100%', maxWidth: 400, aspectRatio: '1/1', background: '#f0f0f0', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setModalImg('/_backup_images_2026-05-17/doosal.png')}
            >
              <img src="/_backup_images_2026-05-17/doosal.png" alt="doosal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Grid van 4 kolommen */}
        <div style={{ width: '100%', padding: '0 16px 64px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <div className="project-img-container" onClick={() => setModalImg('/_backup_images_2026-05-17/krabbels.png')}>
            <img src="/_backup_images_2026-05-17/krabbels.png" alt="krabbels" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'rotate(90deg) scaleY(-1)' }} />
          </div>
          <div className="project-img-container" onClick={() => setModalImg('/_backup_images_2026-05-17/partii.png')}>
            <img src="/_backup_images_2026-05-17/partii.png" alt="partii" className="project-img" />
          </div>
          <div className="project-img-container" onClick={() => setModalImg('/_backup_images_2026-05-17/spelen.png')}>
            <img src="/_backup_images_2026-05-17/spelen.png" alt="spelen" className="project-img" />
          </div>
          <div className="project-img-container" onClick={() => setModalImg('/_backup_images_2026-05-17/bts.png')}>
            <img src="/_backup_images_2026-05-17/bts.png" alt="bts" className="project-img" />
          </div>
        </div>

        {/* Modal */}
        {modalImg && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', 
            alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' 
          }} onClick={() => setModalImg(null)}>
            <img
              src={modalImg}
              alt="Vergrote afbeelding"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                transform: modalImg === '/_backup_images_2026-05-17/krabbels.png' ? 'rotate(90deg) scaleY(-1)' : undefined
              }}
            />
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