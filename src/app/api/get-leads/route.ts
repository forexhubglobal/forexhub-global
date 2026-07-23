import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'leads');
    
    if (!fs.existsSync(contentDir)) {
      return NextResponse.json({ success: true, leads: [] });
    }

    const files = fs.readdirSync(contentDir);
    const leads = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
          return JSON.parse(fileContent);
        } catch (e) {
          return null;
        }
      })
      .filter(lead => lead !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error('Error getting leads:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
