import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add timestamp
    const lead = {
      ...data,
      date: new Date().toISOString()
    };

    // Ensure directory exists
    const dir = path.join(process.cwd(), 'content', 'omni-leads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save to file
    const filename = `omni-lead-${Date.now()}.json`;
    fs.writeFileSync(path.join(dir, filename), JSON.stringify(lead, null, 2));

    return NextResponse.json({ success: true, message: 'Lead saved' });
  } catch (error) {
    console.error('Error saving omni lead:', error);
    return NextResponse.json({ success: false, message: 'Failed to save lead' }, { status: 500 });
  }
}
