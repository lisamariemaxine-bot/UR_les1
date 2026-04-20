
"use client"
import { useState } from "react"

export default function Project2Page() {
  const [modalImg, setModalImg] = useState<string | null>(null);
  return (
    <div style={{ minHeight: '100vh', background: 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '6vh' }}>
      <div style={{ width: '90vw', maxWidth: 1100, background: 'none', boxShadow: 'none', borderRadius: 0, display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Content */}
        <div style={{ display: 'flex', flex: 1, padding: '32px', gap: 0 }}>
          {/* Left: Text */}
          <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 0 }}>
            <h1 style={{ fontSize: 32, fontWeight: 400, marginBottom: 32, marginTop: 0, color: '#222', fontFamily: 'inherit' }}>Fibonacci</h1>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
              <div style={{ minWidth: 90, color: '#888', fontSize: 15, fontWeight: 400, marginTop: 2 }}>Over dit project</div>
              <div style={{ color: '#222', fontSize: 15, fontWeight: 400, maxWidth: 340, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi nec erat. Mauris non erat vitae urna facilisis dictum. Etiam euismod, justo at dictum cursus, enim urna facilisis enim, nec facilisis enim urna eu enim.
              </div>
            </div>
          </div>
          {/* Right: Image */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', minWidth: 0 }}>
            <img
              src="/fibo%20logo.png"
              alt="Fibonacci logo"
              style={{ width: '100%', maxWidth: 400, aspectRatio: '1/1', objectFit: 'cover', background: '#eee', marginLeft: 32 }}
            />
          </div>
        </div>
        {/* Grid en brede afbeelding in één container voor perfecte uitlijning */}
        <div style={{ width: '100%', marginTop: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <img src="/fibo%20poster%202.png" alt="fibo poster 2" style={{ width: '100%', height: 360, objectFit: 'contain', background: '#fff', cursor: 'pointer' }} onClick={() => setModalImg('/fibo%20poster%202.png')} />
            <img src="/fibo%20poster.png" alt="fibo poster" style={{ width: '100%', height: 360, objectFit: 'contain', background: '#fff', cursor: 'pointer' }} onClick={() => setModalImg('/fibo%20poster.png')} />
            <img src="/fibo%20socials.png" alt="fibo socials" style={{ gridColumn: 'span 2', width: '100%', height: 360, objectFit: 'contain', background: '#fff', cursor: 'pointer' }} onClick={() => setModalImg('/fibo%20socials.png')} />
          </div>
          <img src="/fibo%20straat.png" alt="fibo straat" style={{ display: 'block', width: '100%', maxWidth: '100%', height: 'auto', objectFit: 'contain', margin: '32px 0 0 0', background: '#fff', cursor: 'pointer' }} onClick={() => setModalImg('/fibo%20straat.png')} />
          {/* Modal */}
          {modalImg && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalImg(null)}>
              <img src={modalImg} alt="Vergrote afbeelding" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12, boxShadow: '0 4px 32px rgba(0,0,0,0.5)' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
