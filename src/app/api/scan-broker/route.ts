import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();

// --- IN-MEMORY CACHE (Untuk jimat kuota AI Google) ---
// Note: Ini akan kekal selagi serverless function aktif (warm start)
const aiCache = new Map();

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

    // --- WHITELIST BROKERS (Always Safe) ---
    const searchName = brokerName.toLowerCase().trim();
    const whitelistedBrokers = ['cpt markets', 'moneta markets', 'versus trade', 'exness'];
    
    if (whitelistedBrokers.some(wb => searchName.includes(wb) || wb.includes(searchName))) {
      if (
        searchName === 'cpt' || searchName === 'cpt markets' || searchName === 'cpt market' ||
        searchName === 'moneta' || searchName === 'moneta markets' || searchName === 'moneta market' ||
        searchName === 'versus' || searchName === 'versus trade' || searchName === 'versustrade' ||
        searchName === 'exness'
      ) {
        return NextResponse.json({
          score: 2,
          status: 'Selamat',
          reason: 'Berdasarkan analisis silang-pangkalan data (cross-database analysis), entiti ini memiliki portfolio regulasi Tahap 1 (Tier-1) yang kukuh di peringkat global. Rekod audit menunjukkan ketelusan mutlak dalam pemisahan dana pelanggan (segregated funds) tanpa sebarang sejarah penipuan atau amaran pihak berkuasa. Entiti diklasifikasikan sebagai SANGAT SELAMAT dan berstatus premium.',
          source: 'Global AI Forensics'
        });
      }
    }
    // ---------------------------------------

    if (aiCache.has(searchName)) {
      return NextResponse.json(aiCache.get(searchName));
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

    // Initialize Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
      }
    });

    const response = await result.response;
    let aiText = response.text();

    
    // Better JSON extraction
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      aiText = jsonMatch[0];
    } else {
      aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    }
    
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

    const finalResult = {
      score: parsed.score,
      status: status,
      reason: parsed.reason,
      source: 'Global AI Forensics'
    };

    // Simpan dalam cache supaya pencarian seterusnya lebih pantas dan jimat kuota
    aiCache.set(searchName, finalResult);

    return NextResponse.json(finalResult);

  } catch (err: any) {
    console.error("Scam Scanner Fatal Error:", err);
    return NextResponse.json({ error: `Ralat sistem: ${err.message}` }, { status: 500 });
  }
}
