import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, modalAmt, instrument, requirements } = data;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const contentDir = path.join(process.cwd(), 'content', 'leads');
    
    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}.json`;
    const filePath = path.join(contentDir, fileName);

    const leadData = {
      id: timestamp.toString(),
      date: new Date().toISOString(),
      name,
      phone,
      modalAmt,
      instrument,
      requirements
    };

    fs.writeFileSync(filePath, JSON.stringify(leadData, null, 2), 'utf-8');

    return NextResponse.json({ success: true, leadId: leadData.id });
  } catch (error: any) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
