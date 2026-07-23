import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SCAMS_FILE = path.join(process.cwd(), 'content', 'scams.json');

const ensureFile = () => {
  const dir = path.dirname(SCAMS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(SCAMS_FILE)) {
    fs.writeFileSync(SCAMS_FILE, JSON.stringify([]), 'utf-8');
  }
};

export async function GET() {
  try {
    ensureFile();
    const content = fs.readFileSync(SCAMS_FILE, 'utf-8');
    const scams = JSON.parse(content);
    return NextResponse.json({ success: true, scams });
  } catch (error: any) {
    console.error('Error fetching scams:', error);
    return NextResponse.json({ error: 'Gagal mengambil senarai scam' }, { status: 500 });
  }
}
