
"use client"
import { useState } from "react"
import Image from "next/image"

export default function ProjectPage() {
  const [modalImg, setModalImg] = useState<string | null>(null);
  return (
    <div style={{ minHeight: '100vh', background: 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '6vh' }}>
      <div style={{ width: '90vw', maxWidth: 1100, background: 'none', boxShadow: 'none', borderRadius: 0, display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Topbar verwijderd */}
        {/* Content */}
        <div style={{ display: 'flex', flex: 1, padding: '32px', gap: 0 }}>
          {/* Left: Text */}
          <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 0 }}>
            <h1 style={{ fontSize: 32, fontWeight: 400, marginBottom: 32, marginTop: 0, color: '#222', fontFamily: 'inherit' }}>Fotografie</h1>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
              <div style={{ minWidth: 90, color: '#888', fontSize: 15, fontWeight: 400, marginTop: 2 }}>Over dit project</div>
              <div style={{ color: '#222', fontSize: 15, fontWeight: 400, maxWidth: 340, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi nec erat. Mauris non erat vitae urna facilisis dictum. Etiam euismod, justo at dictum cursus, enim urna facilisis enim, nec facilisis enim urna eu enim.
              </div>
            </div>
          </div>
          {/* Right: Image */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', minWidth: 0 }}>
            <Image
              src="/IMG_5001.PNG"
              alt="Nolan Building"
              width={400}
              height={400}
              style={{ width: '100%', maxWidth: 400, aspectRatio: '1/1', objectFit: 'cover', background: '#eee', marginLeft: 32 }}
              priority
            />
          </div>
        </div>
        {/* Grid van 1 rij op 4 kolommen */}
        <div style={{ width: '100%', marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <Image src="/IMG_5006.PNG" alt="foto 6" width={400} height={400} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', background: '#eee', cursor: 'pointer' }} onClick={() => setModalImg('/IMG_5006.PNG')} />
          <Image src="/IMG_5003.PNG" alt="foto 3" width={400} height={400} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', background: '#eee', cursor: 'pointer' }} onClick={() => setModalImg('/IMG_5003.PNG')} />
          <Image src="/IMG_5004.PNG" alt="foto 4" width={400} height={400} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', background: '#eee', cursor: 'pointer' }} onClick={() => setModalImg('/IMG_5004.PNG')} />
          <Image src="/IMG_5005.PNG" alt="foto 5" width={400} height={400} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', background: '#eee', cursor: 'pointer' }} onClick={() => setModalImg('/IMG_5005.PNG')} />
        </div>
        {/* Modal */}
        {modalImg && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalImg(null)}>
            <Image src={modalImg} alt="Vergrote afbeelding" width={800} height={800} style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12, boxShadow: '0 4px 32px rgba(0,0,0,0.5)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
