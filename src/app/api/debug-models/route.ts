import { NextResponse } from 'next/server';

export async function GET() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();
  
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "No API Key found in env." });
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
    const data = await res.json();
    
    return NextResponse.json({
      success: true,
      models: data.models?.map((m: any) => m.name) || data,
      raw: data
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
