import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SCAMS_FILE = path.join(process.cwd(), 'content', 'scams.json');

export async function GET() {
  try {
    if (!fs.existsSync(SCAMS_FILE)) {
      return NextResponse.json({ success: true, scams: [] });
    }
    const content = fs.readFileSync(SCAMS_FILE, 'utf-8');
    const scams = JSON.parse(content);
    return NextResponse.json({ success: true, scams });
  } catch (error: any) {
    console.error('Error fetching scams:', error);
    return NextResponse.json({ error: 'Gagal mengambil senarai scam' }, { status: 500 });
  }
}
