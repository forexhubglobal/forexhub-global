import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { saveToGitHub } from '@/lib/github';

const SCAMS_FILE = path.join(process.cwd(), 'content', 'scams.json');

// Ensure directory exists
const ensureFile = () => {
  if (process.env.GITHUB_TOKEN) return; // Skip in prod
  const dir = path.dirname(SCAMS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(SCAMS_FILE)) {
    fs.writeFileSync(SCAMS_FILE, JSON.stringify([]), 'utf-8');
  }
};

export async function POST(req: Request) {
  try {
    ensureFile();
    const data = await req.json();
    const { name, category, reason, status } = data;

    if (!name || !category || !reason || !status) {
      return NextResponse.json({ error: 'Sila lengkapkan semua ruang' }, { status: 400 });
    }

    let scams = [];
    if (fs.existsSync(SCAMS_FILE)) {
      const content = fs.readFileSync(SCAMS_FILE, 'utf-8');
      scams = JSON.parse(content);
    }

    const newScam = {
      id: Date.now().toString(),
      name,
      category,
      reason,
      status,
      dateAdded: new Date().toISOString()
    };

    scams.unshift(newScam);
    
    if (process.env.GITHUB_TOKEN) {
      await saveToGitHub('content/scams.json', JSON.stringify(scams, null, 2), 'CMS: Add scam record');
    } else {
      fs.writeFileSync(SCAMS_FILE, JSON.stringify(scams, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true, scam: newScam });
  } catch (error: any) {
    console.error('Error saving scam:', error);
    return NextResponse.json({ error: 'Gagal menyimpan rekod' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    ensureFile();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    let scams = [];
    if (fs.existsSync(SCAMS_FILE)) {
      const content = fs.readFileSync(SCAMS_FILE, 'utf-8');
      scams = JSON.parse(content);
    }

    scams = scams.filter((s: any) => s.id !== id);
    
    if (process.env.GITHUB_TOKEN) {
      await saveToGitHub('content/scams.json', JSON.stringify(scams, null, 2), `CMS: Delete scam record ${id}`);
    } else {
      fs.writeFileSync(SCAMS_FILE, JSON.stringify(scams, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting scam:', error);
    return NextResponse.json({ error: 'Gagal memadam rekod' }, { status: 500 });
  }
}
