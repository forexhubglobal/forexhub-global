import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  try {
    const { brokerName } = await request.json();
    
    if (!brokerName || brokerName.trim() === '') {
      return NextResponse.json({ error: 'Sila masukkan nama broker' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'Sistem AI perlukan GEMINI_API_KEY di Vercel Environment Variables untuk berfungsi.' 
      }, { status: 500 });
    }

    const prompt = `
      Anda adalah pakar forensik kewangan bebas dan pangkalan data global untuk SEMUA broker Forex/Kripto di seluruh dunia.
      Siasat entiti bernama: "${brokerName}".
      
      Gunakan akses memori sedunia anda (web knowledge / Google) untuk mencari maklumat tentang broker ini secara jujur dan tanpa bias.
      - Adakah ia mempunyai lesen regulasi yang sah (seperti FCA, ASIC, CySEC)? 
      - Adakah ia broker luar pesisir (offshore) berisiko tinggi?
      - Adakah ia pernah terbabit dengan kes scam, aduan tidak boleh withdraw, atau amaran pengawal selia?
      
      Berikan skor risiko Scam dari 0 hingga 100:
      - 100 = Sangat Bahaya / Scam Terbukti / Tiada Lesen.
      - 50 = Sederhana / Offshore / Hati-hati.
      - 0 = Sangat Selamat / Teregulasi penuh.
      
      Berikan ulasan forensik anda dalam bahasa Melayu (maksimum 3 ayat).
      
      Anda MESTI memberikan jawapan HANYA dalam format JSON tulen seperti di bawah, tanpa apa-apa teks tambahan sebelum atau selepasnya:
      {
        "score": 85,
        "reason": "Broker ini beroperasi secara luar pesisir tanpa regulasi kukuh dan terdapat laporan masalah pengeluaran wang."
      }
    `;

    const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1, // Low temperature for factual responses
          responseMimeType: "application/json" // Force JSON response if supported
        }
      })
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error('Gemini API Error:', errorText);
      return NextResponse.json({ error: `Ralat Google AI: ${apiRes.statusText}` }, { status: 500 });
    }

    const aiData = await apiRes.json();
    let aiText = aiData.candidates[0].content.parts[0].text;
    
    // Fallback JSON cleaning just in case
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsed;
    try {
      parsed = JSON.parse(aiText);
    } catch (parseErr) {
      console.error('JSON Parse Error:', aiText);
      return NextResponse.json({ error: 'Ralat membaca data dari AI. Sila cuba lagi.' }, { status: 500 });
    }
    
    let status = 'Tidak Pasti';
    if (parsed.score >= 70) status = 'Bahaya';
    else if (parsed.score <= 30) status = 'Selamat';
    else status = 'Awas';

    return NextResponse.json({
      score: parsed.score,
      status: status,
      reason: parsed.reason,
      source: 'Global AI Forensics'
    });

  } catch (err: any) {
    console.error("Scam Scanner Fatal Error:", err);
    return NextResponse.json({ error: `Ralat sistem: ${err.message}` }, { status: 500 });
  }
}
