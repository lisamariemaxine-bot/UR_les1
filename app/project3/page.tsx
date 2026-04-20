"use client";
import React, { useState } from "react";

export default function AcousticLaptopPage() {
  const [modalImg, setModalImg] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '6vh' }}>
      <div style={{ width: '90vw', maxWidth: 1100, background: 'none', boxShadow: 'none', borderRadius: 0, display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Content */}
        <div style={{ display: 'flex', flex: 1, padding: '32px', gap: 0 }}>
          {/* Left: Text */}
          <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 0 }}>
            <h1 style={{ fontSize: 32, fontWeight: 400, marginBottom: 32, marginTop: 0, color: '#222', fontFamily: 'inherit' }}>Acoustic Laptop</h1>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
              <div style={{ minWidth: 90, color: '#888', fontSize: 15, fontWeight: 400, marginTop: 2 }}>Over dit project</div>
              <div style={{ color: '#222', fontSize: 15, fontWeight: 400, maxWidth: 340, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi nec erat. Mauris non erat vitae urna facilisis dictum. Etiam euismod, justo at dictum cursus, enim urna facilisis enim, nec facilisis enim urna eu enim.
              </div>
            </div>
          </div>
          {/* Right: Grijs vak */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', minWidth: 0 }}>
            <div
              style={{ width: '100%', maxWidth: 400, aspectRatio: '1/1', background: '#ccc', borderRadius: 8, marginLeft: 32, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setModalImg('/doosAl.png')}
            >
              <img src="/doosAl.png" alt="doosAl" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        {/* Grid van 1 rij op 4 kolommen met grijze vakken */}
        <div style={{ width: '100%', marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <div style={{ width: '100%', aspectRatio: '1/1', background: '#ccc', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setModalImg('/krabbels.jpg')}>
            <img src="/krabbels.jpg" alt="krabbels" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'rotate(90deg) scaleY(-1)' }} />
          </div>
          <div style={{ width: '100%', aspectRatio: '1/1', background: '#ccc', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setModalImg('/partii.png')}>
            <img src="/partii.png" alt="partii" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '100%', aspectRatio: '1/1', background: '#ccc', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setModalImg('/spelen.png')}>
            <img src="/spelen.png" alt="spelen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '100%', aspectRatio: '1/1', background: '#ccc', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setModalImg('/Bts.png')}>
            <img src="/Bts.png" alt="bts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        {/* Modal */}
        {modalImg && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalImg(null)}>
            <img
              src={modalImg}
              alt="Vergrote afbeelding"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 12,
                boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
                transform: modalImg === '/krabbels.jpg' ? 'rotate(90deg) scaleY(-1)' : undefined
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
