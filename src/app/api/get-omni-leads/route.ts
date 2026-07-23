import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'content', 'omni-leads');
    
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ success: true, leads: [] });
    }

    const files = fs.readdirSync(dir);
    
    const leads = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        return JSON.parse(content);
      });
      
    // Sort by date descending
    leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error getting omni leads:', error);
    return NextResponse.json({ success: false, message: 'Failed to get leads' }, { status: 500 });
  }
}
