import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { dataUrl, filename } = await req.json()

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ error: 'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET.' }, { status: 500 })
    }

    const formData = new FormData()
    formData.append('file', dataUrl)
    formData.append('upload_preset', uploadPreset)
    if (filename) formData.append('public_id', filename)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: 'Upload failed', details: text }, { status: 502 })
    }

    const body = await res.json()
    return NextResponse.json({ url: body.secure_url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
