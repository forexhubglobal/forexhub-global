import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAllData } from '@/lib/markdown';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  try {
    const { brokerName } = await request.json();
    
    if (!brokerName || brokerName.trim() === '') {
      return NextResponse.json({ error: 'Sila masukkan nama broker' }, { status: 400 });
    }

    const query = brokerName.toLowerCase().trim();

    // 1. Check local scams.json
    try {
      const scamsPath = path.join(process.cwd(), 'content', 'scams.json');
      if (fs.existsSync(scamsPath)) {
        const scams = JSON.parse(fs.readFileSync(scamsPath, 'utf8'));
        const match = scams.find((s: any) => s.name.toLowerCase().includes(query) || query.includes(s.name.toLowerCase()));
        if (match) {
          return NextResponse.json({
            score: 99,
            status: 'Bahaya',
            reason: `Terdapat dalam pangkalan data SCAM kami: ${match.reason || 'Sering dikaitkan dengan penipuan.'}`,
            source: 'Local DB'
          });
        }
      }
    } catch(e) {
      console.error('Error reading scams.json', e);
    }

    // 2. Check local trusted brokers
    try {
      const brokers = await getAllData('brokers');
      const match = brokers.find(b => b.title.toLowerCase().includes(query) || query.includes(b.title.toLowerCase()));
      if (match) {
        return NextResponse.json({
          score: 5,
          status: 'Selamat',
          reason: 'Tersenarai sebagai broker yang disemak dan dipercayai di platform kami.',
          source: 'Local DB'
        });
      }
    } catch(e) {
      console.error('Error reading brokers', e);
    }

    // 3. Fallback to Gemini AI for deep scanning
    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        score: 50,
        status: 'Tidak Pasti',
        reason: 'Sistem AI sedang diselenggara. Sila berhati-hati.',
        source: 'Fallback'
      });
    }

    const prompt = `
      Anda adalah pakar forensik kewangan dan pangkalan data global untuk SEMUA broker Forex/Kripto di seluruh dunia.
      Siasat entiti bernama: "${brokerName}".
      
      Gunakan akses memori sedunia anda (web knowledge) untuk mencari maklumat tentang broker ini, tidak kira betapa kecil atau tidak dikenali broker tersebut.
      Adakah ia mempunyai lesen regulasi yang sah (seperti FCA, ASIC, CySEC, Labuan FSA)? Atau adakah ia broker luar pesisir (offshore) berisiko tinggi, tidak berdaftar, atau mempunyai amaran scam (red flags)?
      
      Jika broker ini langsung tidak wujud atau tiada jejak internet yang meyakinkan, anggap ia sebagai "Sangat Bahaya / Scam" (Skor tinggi).
      
      Berikan skor risiko dari 0 hingga 100 (100 = Sah Scam / Tiada Lesen / Bahaya, 0 = Sangat Selamat / Teregulasi penuh).
      Berikan ulasan dan alasan kukuh dalam bahasa Melayu (maksimum 2-3 ayat).
      
      Return EXACTLY ONLY a JSON object in this format:
      {
        "score": 85,
        "reason": "Broker ini beroperasi secara luar pesisir tanpa regulasi kukuh dan terdapat laporan masalah pengeluaran wang."
      }
    `;

    const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!apiRes.ok) {
      throw new Error('Gemini API Error');
    }

    const aiData = await apiRes.json();
    let aiText = aiData.candidates[0].content.parts[0].text;
    
    // Clean markdown formatting if any
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(aiText);
    
    let status = 'Tidak Pasti';
    if (parsed.score >= 70) status = 'Bahaya';
    else if (parsed.score <= 30) status = 'Selamat';
    else status = 'Awas';

    return NextResponse.json({
      score: parsed.score,
      status: status,
      reason: parsed.reason,
      source: 'AI Scanner'
    });

  } catch (err: any) {
    console.error("Scam Scanner Error:", err);
    return NextResponse.json({ error: 'Ralat sistem penganalisis.' }, { status: 500 });
  }
}
