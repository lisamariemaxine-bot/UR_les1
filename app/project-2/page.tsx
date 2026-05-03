"use client"
import { useState } from "react"

// FontLink mag blijven staan voor eventuele andere pagina's, 
// maar wordt hier nu niet meer gebruikt voor de titel.
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
    rel="stylesheet"
  />
);

export default function Project2Page() {
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
      textTransform: 'uppercase'
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
                FIBONACCI
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi nec erat. Mauris non erat vitae urna facilisis dictum.
              </div>
            </div>
          </div>

          {/* Rechts: Logo */}
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'flex-end' }}>
            <img
              src="/fibo%20logo.png"
              alt="Fibonacci logo"
              style={{ width: '100%', maxWidth: 350, aspectRatio: '1/1', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Media Grid */}
        <div style={{ width: '100%', padding: '0 16px 64px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <img src="/fibo%20poster%202.png" alt="fibo poster 2" className="project-img" onClick={() => setModalImg('/fibo%20poster%202.png')} />
            <img src="/fibo%20poster.png" alt="fibo poster" className="project-img" onClick={() => setModalImg('/fibo%20poster.png')} />
            <img src="/fibo%20socials.png" alt="fibo socials" className="project-img" style={{ gridColumn: 'span 2' }} onClick={() => setModalImg('/fibo%20socials.png')} />
          </div>
          
          <img src="/fibo%20straat.png" alt="fibo straat" className="project-img" style={{ marginTop: 16, width: '100%', height: 'auto' }} onClick={() => setModalImg('/fibo%20straat.png')} />
        </div>

        {/* Modal */}
        {modalImg && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', 
            alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' 
          }} onClick={() => setModalImg(null)}>
            <img src={modalImg} alt="Vergrote afbeelding" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
          </div>
        )}
      </div>

      <style jsx>{`
        .project-img {
          width: 100%;
          height: 360px;
          object-fit: cover;
          background: #f0f0f0;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .project-img:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}