import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getLatestNews } from '@/lib/forex-news';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY?.trim() || '');

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        happening: "Data pasaran tidak dapat diakses (API Key tiada).",
        why: "Sistem AI sedang berehat.",
        nextEvent: "Sila hubungi admin."
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Anda adalah penganalisis kewangan utama untuk ForexHubGlobal, platform kewangan nombor 1 di Malaysia.
      Berikan ringkasan pasaran terkini untuk hari ini dalam Bahasa Melayu yang sangat profesional, padat, dan bertaraf institusi kewangan. Fokus kepada XAU/USD (Gold), EUR/USD, USD/MYR, dan sentimen pasaran global (Fed/Inflation dll).

      Wajib pulangkan dalam format JSON sahaja seperti struktur ini:
      {
        "happening": "1-2 ayat tentang apa yang paling ketara sedang berlaku di pasaran (cth: Emas melonjak, USD melemah).",
        "why": "2-3 ayat menerangkan KENAPA ia berlaku berdasarkan konteks ekonomi makro terkini (cth: data inflasi turun, fed rate cut).",
        "nextEvent": "1 ayat menyatakan apakah acara kalendar ekonomi berimpak tinggi yang seterusnya perlu diperhatikan oleh trader hari ini atau minggu ini."
      }
      
      JANGAN masukkan markdown \`\`\`json. Return pure JSON string.
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean up potential markdown wrapper
    if (text.startsWith('```json')) {
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (text.startsWith('```')) {
      text = text.replace(/```/g, '').trim();
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);

  } catch (err: any) {
    console.error('Market Insight Error:', err);
    return NextResponse.json({ 
      happening: "Pasaran sedang mengalami turun naik biasa.",
      why: "Terdapat sedikit gangguan teknikal dalam mengambil data AI terkini. Kami sedang memperbaikinya.",
      nextEvent: "Sila rujuk Kalendar Ekonomi secara manual di bawah."
    });
  }
}
