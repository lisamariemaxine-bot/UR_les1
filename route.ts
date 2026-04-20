import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'lib', 'about-data.json');

export async function GET() {
  try {
    const data = fs.existsSync(DATA_PATH)
      ? JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
      : {
          name: '',
          bio: '',
          email: '',
          websiteText: '',
          profileImage: '',
          portfolioConcept: '',
          introLabel: '',
          tagOne: '',
          tagTwo: '',
          textSectionTitle: '',
          contactTitle: '',
          portfolioConceptTitle: '',
        };
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {  try {
    const body = await request.json();
    fs.writeFileSync(DATA_PATH, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
